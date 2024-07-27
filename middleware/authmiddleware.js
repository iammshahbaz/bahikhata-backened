// const jwt = require("jsonwebtoken")

// const auth = async(req,res,next)=>{
//     const token = req.headers.authorization.split(" ")[1];

//     if(token) {
//         const decoded = jwt.verify(token , "masai");

//         if(decoded){
//             req.body.userId = decoded.userId;
//             req.body.authors = decoded.authors;
//             return next(); 
//         }
//         else{
//             res.send({msg: "You are not authorized"})
//         }
//     }
//     else{
//         res.send({msg: "You are not authorized"})
//     }
// }

// module.exports = {auth}
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error("No authorization header provided");
        return res.status(401).send({ msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        console.error("No token provided");
        return res.status(401).send({ msg: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, "masai");
        req.body.userId = decoded.userId;
        req.body.authors = decoded.authors;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(401).send({ msg: "Unauthorized" });
    }
};

module.exports = { auth };
