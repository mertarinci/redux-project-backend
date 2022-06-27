


const sendJwtToClient = (user,res) => {


    const token = user.generateJwtFromUser();


    return res.status(200)
    .cookie("access_token",token, {
        httpOnly:true,
        expires: new Date(Date.now() + 10000 * 6 * 10),
        secure:false
    })
    .json({
        success:true,
        access_token:token,
        data:{
            username: user.username,
            email:user.email,
            userId:user.userId
        }
    })

}

const isTokenIncluded = (req) => {

    return (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))
}

const getAcccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;

}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAcccessTokenFromHeader
}

