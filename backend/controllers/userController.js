const userServices = require("../services/userServices");

exports.signUp = async (req, res, next) => {
    const newUser = await userServices.signUp(req.body);
    if (newUser) {
        next();
    } else {
        res.status(200).json({
            msg: "이미 존재하는 이메일입니다.",
        });
    }
};

exports.logIn = async (req, res, next) => {
    try {
        const authUser = await userServices.logIn(req.body);
        res.status(200).json({
            msg: "로그인 성공",
            data: authUser,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.tokenRefresh = async (req, res, next) => {
    try {
        const accessToken = req.body.access;
        const refreshToken = req.body.refresh;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const refreshResult = await userServices.tokenRefresh(accessToken, refreshToken);
        if (refreshResult.success) {
            res.status(200).json({
                msg: "Access Token 신규 발급 성공",
                status: refreshResult.status,
                token: refreshResult.token,
            });
        } else {
            res.status(200).json({
                msg: "Access Token 신규 발급 실패",
                status: refreshResult.status,
                token: refreshResult.token,
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//TokenBlacklist 삭제. 필요한 경우 Dropby1 레거시 코드 참고
