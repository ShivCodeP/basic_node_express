const validator = (req,res,next) => {
    const valid = typeof req.body.id == Number && typeof req.body.title == String && typeof req.body.content == String && typeof req.body.author == String;
    if(valid) {
        next();
    }
    return res.status(400).send({message: "Type of data is not correct"})
}

export default validator;