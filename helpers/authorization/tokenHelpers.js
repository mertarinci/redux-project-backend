


const sendJwtToClient = async (user,res) => {


    const token = user.generateJwtFromUser();

    user.isOnline = true

    await user.save()


    return res.status(200)
    .cookie("access_token",token, {
        httpOnly:false,
        expires: new Date(Date.now() + 60000 * 15),
        secure:false,
        path:"/"
    })
    .json({
        success:true,
        access_token:token,
        data:{
            username: user.username,
            email:user.email,
            userId:user.userId,
            role:user.role,
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

