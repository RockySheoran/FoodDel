import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {

    const { token } = req.headers;
    // const token = req.cookies.jwt;
    // console.log(token)

    if (!token) {
        return res.json({ success: false, message: "Not Authorized login" });
    }
    // console.log(token)

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(token_decode)

        req.body.userId = token_decode.id;
        // console.log(req.body.userId)

        next();
        // res.json({success:true ,message:"hello"});
        // console.log(next())
    }
    catch (e) {
        console.log(e)
        res.json({ success: false, message: "error av" });
    }

}

export default authMiddleWare;