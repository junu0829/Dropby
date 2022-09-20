const bcrypt = require("bcrypt");
const { User } = require("../models");
require("dotenv").config();
const nodemailer = require("nodemailer");
const {
    signAccess,
    signRefresh,
    verifyAccess,
    verifyRefresh,
    getUserWithRefresh,
    getTransporter,
    generateNumber,
    getMailOptions,
} = require("../utils/auth");
const { logger } = require("../utils/winston");

exports.signUp = async ({ nickname, email, password }) => {
    let context = { user: null, msg: "" };
    try {
        const userExists = await User.findOne({ where: { email } }); //없으면 null 반환

        if (userExists) {
            context["msg"] = "이미 사용 중인 이메일입니다!";
            return context;
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashed_pw = await bcrypt.hash(password, salt);
            const user = await User.create({
                nickname,
                email,
                password: hashed_pw,
            });
            context["user"] = user;
            context["msg"] = "회원가입이 완료되었습니다.";
            logger.info(`SignUp Success : username ${email}, nickname ${nickname}`);
            return context;
        }
    } catch (error) {
        context["msg"] = "회원가입에 실패하였습니다.";
        logger.warn(`signUp Failed : ${error.message}`);
        return context;
    }
};

exports.logIn = async ({ email, password }) => {
    try {
        const user = await User.findOne({ where: { email } });
        const userData = user.dataValues;

        const accessToken = signAccess(userData);
        const refreshToken = signRefresh(userData.pk);

        const tokens = {
            access: accessToken,
            refresh: refreshToken,
        };
        user.Refresh = refreshToken;
        user.save();
        logger.info(`Username ${email} logged in, tokens granted`);
        return { userData, tokens };
    } catch (error) {
        logger.error(`Login Failed : ${error.message}`);
        throw new Error(`로그인에 실패하였습니다.`);
    }
};

exports.tokenRefresh = async (accessToken, refreshToken) => {
    try {
        const accessResult = verifyAccess(accessToken); //만료되지 않아야만 userData 반환함.

        if (accessResult.userData) {
            //accessToken이 만료되지 않음.
            logger.warn(`Access Token not expired`);
            return {
                success: false,
                status: "Access Token not expired",
                tokens: {
                    access: accessToken,
                    refresh: refreshToken,
                },
            };
        }
        //accessToken이 만료됨
        if (accessResult.success === false && accessResult.message === "jwt expired") {
            //accessToken은 만료되었고
            const refreshResult = await verifyRefresh(refreshToken);
            logger.warn(`No tokens valid. Re-login required`);
            if (refreshResult.success === false) {
                //refreshToken도 유효하지 않음.
                return {
                    success: false,
                    status: "No token valid. Re-login required.",
                    tokens: null,
                };
            }

            if (refreshResult.success === true) {
                //refreshToken은 유효함 == 새 accessToken 발급
                const userData = await getUserWithRefresh(refreshToken);
                const newAccess = signAccess({
                    pk: userData.pk,
                    email: userData.email,
                });
                logger.info(`Refresh Token valid. New Access Token granted`);
                return {
                    success: true,
                    status: "New Access Token granted",
                    tokens: {
                        access: newAccess,
                        refresh: refreshToken,
                    },
                };
            }
        }
    } catch (error) {
        logger.error(`Failed to refresh accessToken : ${error.message}`);
        throw new Error(`토큰 갱신에 실패하였습니다.`);
    }
};

exports.logOut = async ({ authorization, refresh }) => {
    const refreshToken = refresh;
    const refreshResult = await verifyRefresh(refreshToken);
    try {
        const user = await User.findOne({ where: { pk: refreshResult.userPk } });
        if (user) {
            user.Refresh = null;
            user.save();
            logger.info(`Username ${user.email} successfully logged out`);
            return {
                success: true,
                userData: user,
                message: "LogOut Success(Refresh Token removed)",
            };
        }
        if (!user) {
            logger.warn(`User of username ${user.email} not found`);
            return {
                success: false,
                userData: null,
                message: "User not found",
            };
        }
    } catch (error) {
        logger.error(`Logout failed : ${error.message}`);
        return {
            success: false,
            userData: null,
            message: error.message,
        };
    }
};

exports.sendEmail = (mailType, email) => {
    try {
        const transporter = getTransporter();

        const mailOptions = getMailOptions(mailType, email);

        transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
                logger.error(`Failed to send an email to ${email} : ${error.message}`);
                throw new Error(error.message);
            }
            return randomNumber;
        });
    } catch (error) {
        throw new Error(`이메일 전송에 실패하였습니다.`);
    }
};
