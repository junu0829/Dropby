const bcrypt = require('bcrypt');
const {User} = require('../models');
require('dotenv').config();
const nodemailer = require('nodemailer');
const {signAccess, signRefresh, verifyAccess, verifyRefresh, getUserWithRefresh} = require('../utils/auth');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

exports.signUp = async ({nickname, email, password}) => {
    let context = {'user':null, 'msg':''};
    try {
        const userExists = await User.findOne({where:{email}}) //없으면 null 반환

        if (userExists) {
            context['msg'] = '이미 사용 중인 이메일입니다!'
            console.log('이미 사용 중인 이메일입니다!');
            return context;
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashed_pw = await bcrypt.hash(password, salt);
            const user = await User.create({
                nickname,
                email,
                password:hashed_pw
            });
            context['user'] = user;
            return context;
        }

    } catch(error) {
        console.log(error);
        context['msg'] = 'catch' + error.message;
        return context;  
    }
};

exports.logIn = async({email, password}) => {
    const user = await User.findOne({where:{email}})
    const userData = user.dataValues;

    const accessToken = signAccess(userData);
    const refreshToken = signRefresh(userData.pk);

    const tokens = {
        access:accessToken,
        refresh:refreshToken,
    };
    user.Refresh = refreshToken;
    user.save();
    return {userData, tokens};
}
    

exports.tokenRefresh = async (accessToken, refreshToken) => {
    const accessResult = verifyAccess(accessToken); //만료되지 않아야만 userData 반환함.

    if (accessResult.userData) { //accessToken이 만료되지 않음. 
        return {
            success:false,
            status:'Access Token not expired',
            tokens:{
                'access':accessToken,
                'refresh':refreshToken
            }
        }
    }
    //accessToken이 만료됨
    if (accessResult.success === false && accessResult.message === 'jwt expired') { //accessToken은 만료되었고
        const refreshResult = await verifyRefresh(refreshToken); 
        if (refreshResult.success === false) { //refreshToken도 유효하지 않음.
            return {
                success:false,
                status:'No token valid. Re-login required.',
                tokens:null
            }
        }

        if (refreshResult.success === true) { //refreshToken은 유효함 == 새 accessToken 발급
            const userData = await getUserWithRefresh(refreshToken);
            const newAccess = signAccess({
                pk:userData.pk,
                email:userData.email
            });
            return {
                success:true,
                status:'New Access Token granted',
                tokens:{
                    access:newAccess,
                    refresh:refreshToken
                }
            }
        }
    }
}

exports.logOut = async({authorization, refresh}) => {
    const refreshToken = refresh;
    const refreshResult = await verifyRefresh(refreshToken);
    try {
        const user = await User.findOne({where:{pk:refreshResult.userPk}});
        if (user) {
            user.Refresh = null;
            user.save()
    
            return {
                success:true,
                userData:user,
                message:'LogOut Success(Refresh Token removed)'
            }

        } 
        if (!user) {
            return {
                success:false,
                userData:null,
                message:'User not found'
            }
        }

    } catch(error) {
        console.log(error);
        return {
            success:false,
            userData:null,
            message:error.message
        }
    }
}

exports.sendEmail = (mailType, email) => {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        secure:false,
        requireTLS:true,
        auth: {
            user:process.env.EMAIL_ACCOUNT,
            pass:process.env.EMAIL_PASSWORD
        }
    });
    const randomNumber = Math.floor(Math.random() * (999999-100000)) + 100000;
    
    let mailOptions = {
            from : process.env.EMAIL_ACCOUNT,
            to:'toto9602@naver.com',
            subject:"[Dropby] : 인증번호를 보내드립니다.",
            text:`인증번호 ${randomNumber}를 정확히 입력해 주세요!`
        };
    
    transporter.sendMail(mailOptions, (error, res) => {
        if (error) {
            console.log(error);
            throw error;
        };

        return randomNumber;
    })
    };

