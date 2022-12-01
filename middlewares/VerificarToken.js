const VerificarToken = (req, res, next) => {
    if(req.headers.authorization == undefined){
        return res.status(401).json({error: "Você não possui o token"});
    }

    if(req.headers.authorization.indexOf('bearer') == -1){
        return res.status(400).json({error: "Requisição mal formada"});
    }

    let token = req.headers.authorization.replace('bearer ','');

    req.token = token;

    next();
}

module.exports = VerificarToken;
