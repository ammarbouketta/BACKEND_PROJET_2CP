const jwt = require('jsonwebtoken')

//middleware


exports.admin_routes = (req, res ,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];//recuperer le payload dans la chaine token "le profil"
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const profil = decodedToken.profil;
    
    if (req.body.type_profil && 'admin' !== profil) {
      console.group('dddss');
      throw 'acces denied';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }

}
