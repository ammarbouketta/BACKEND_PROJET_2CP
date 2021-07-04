//const { setRandomFallback } = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = (req, res ,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const profil = decodedToken.profil;
    
    if ('administrateur' !== profil) {
      //throw 'acces denied';
      //res.status(201).json({ message: 'OO' });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }

}
