require('dotenv').config();
const jwt = require('jsonwebtoken');

const ValidaToken = (req,res,next) => {

    //verificar se token é valido
    try{
        //guardar as info do usuario req.usuario
        req.usuario = jwt.verify(req.token, process.env.JWT_KEY);
    }
    catch (error){
        return res.status(403).json({erro:"Perdeu!"});
    }
    
    console.log(req.usuario);
    next();

}

module.exports = ValidaToken;