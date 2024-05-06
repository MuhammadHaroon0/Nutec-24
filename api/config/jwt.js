const jwt = require("jsonwebtoken");
exports.signToken = function signToken(id, res) {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    // const cookieOptions = {
    //     expires: new Date(
    //         Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    //     ),
    //     // httpOnly:true
    // };
    // // if(process.env.NODE_ENV==='production')
    // // {
    // //   cookieOptions.secure=true
    // // }
    // res.cookie("jwt", token, cookieOptions);
    return token;
}