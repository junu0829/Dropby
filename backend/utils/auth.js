const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.signAccess = (userData) => { //AccessToken 발급
    try {    const payload = {
        pk:userData.pk,
        email:userData.email
    }

    return jwt.sign(
        payload,
        process.env.JWT_SECRET_ACCESS_KEY,
        {
            algorithm:process.env.JWT_ALGORITHM,
            expiresIn:process.env.JWT_ACCESS_EXPIRE
        }
    );
} catch (error) {
    this.error(`Signing accessToken failed with ${userData.email} : ${error.message}`);
    throw new Error(error.message);
}

};

exports.signRefresh = (userPk) => { //RefreshToken 발급
    
    return jwt.sign(
        {pk:userPk},
        process.env.JWT_SECRET_REFRESH_KEY,
        {
            algorithm:process.env.JWT_ALGORITHM,
            expiresIn:process.env.JWT_REFRESH_EXPIRE,
        }
    );
}
exports.verifyAccess = (accessToken) => { //AccessToken 검증
    try {
        const verified = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY)
        return {
            success:true,
            message:'Token Verified',
            userData: {
                pk:verified.pk,
                email:verified.email
            }
        }
    } catch(error) {
        return {
            success:false,
            message:error.message,
            userData:null
        }
    }
}

exports.verifyRefresh = async (refreshToken) => { //RefreshToken 검증
    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
        const user = await User.findOne({where:{pk:verified.pk}});
        const userToken = user.dataValues.Refresh;

        if (userToken === refreshToken) {
            return {
                success:true,
                message:'Token exists and verified',
                userPk:verified.pk
                };
        };
        if (userToken !== refreshToken) {
            return {
                success:false,
                message:'Token valid, but not found in DB',
                userPk:verified.pk
            };
        };  
    } catch (error) {
        return {
            success:false,
            message:'Token not verified',
            userPk:null
        };
    };
};

exports.getAccess = ({authorization}) => {
    try {
        const accessToken = authorization.split('Bearer ')[1];
        
        return accessToken
    } catch(error) {
        return error.message;
    }
}

exports.getUserWithAccess = async (accessToken) => {
    try {
        const verified = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY)
        const user = await User.findOne({where:{pk:verified.pk}})

        return user.dataValues
    } catch(error) {
        this.logger('User not found with accessToken');
        throw new Error(error.message);
    }
}

exports.getUserWithRefresh = async (refreshToken) => {
    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
        const user = await User.findOne({where:{pk:verified.pk}})

        return user.dataValues;
    } catch(error) {
        return error.message;
    }
}

exports.getTransporter = () => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        secure:false,
        requireTLS:true,
        auth: {
            user:process.env.EMAIL_ACCOUNT,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    return transporter;
}

const generateNumber = () => {
    const randomNumber = Math.floor(Math.random() * (999999-100000)) + 100000;
    return randomNumber.toString().split().join(' ')
}

exports.getMailOptions = async (mailType, email) => {

    const randomNumber = generateNumber();
    if (mailType === 'findPass') {
        const mailOptions = {
            from : process.env.EMAIL_ACCOUNT,
            to:email,
            subject:```[Dropby code] ${randomNumber}`,
            text:`안녕하세요!
            ${email}으로 Dropby의 가입 요청을 받았습니다. 회원 가입을 진행하려면 아래 6자리 이메일 인증 코드를 입력하세요. (인증코드는 1시간 동안 유효합니다.)
            ${randomNumber}
            위 코드를 요청하지 않으셨다면 위 이메일을 무시하셔도 됩니다.
            감사합니다.
            -Dropby 운영팀```
        };
        return mailOptions;
    }
    const user = User.findOne({where:{email:email}});

    const mailOptions = {
        from : process.env.EMAIL_ACCOUNT,
        to:email,
        subject:`[Dropby Recovery Code] ${randomNumber}`,
        text:```안녕하세요!
        ${email}으로 Dropby의 가입 요청을 받았습니다. 회원 가입을 진행하려면 아래 6자리 이메일 인증 코드를 입력하세요. (인증코드는 1시간 동안 유효합니다.)
        ${randomNumber}
        위 코드를 요청하지 않으셨다면 위 이메일을 무시하셔도 됩니다.
        감사합니다.
        -Dropby 운영팀```
    };
    return mailOptions;
}

