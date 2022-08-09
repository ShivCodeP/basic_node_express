const gaurd = (req,res,next) => {
    if(req.query.password == "54123") {
        return next();
    }
    return res.status(400).send({message: "Not autherized user"})
}

export default gaurd;