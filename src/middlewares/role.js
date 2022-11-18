const buyer = (req, res, next) => {
    try {
        if(req.type === "buyer")
            next();
        else
            res.sendStatus(401);
    } catch(err) {
        console.log(err);
    }
}

const seller = (req, res, next) => {
    try {
        if(req.type === "seller")
            next();
        else
            res.sendStatus(401);
    } catch(err) {
        console.log(err);
    }
}

module.exports = { buyer, seller };
