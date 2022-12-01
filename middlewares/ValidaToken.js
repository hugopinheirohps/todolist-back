require('dotenv').config();
const jwt = require('jsonwebtoken');

const ValidaToken = (req, res, next) => {

    // Verificar se token é válido
    try {
        // Guardar as informações do usuário req.usuario    
        req.usuario = jwt.verify(req.token, process.env.JWT_KEY);

    } catch (error) {
        return res.status(403).json({erro:"Perdeu!"});
    }
    
    next();
}

module.exports = ValidaToken;