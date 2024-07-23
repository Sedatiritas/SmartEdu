const authMiddleware = (req, res, next) => {
    userIN ? next() : res.status(401).redirect("/login");
  };
  
  module.exports = authMiddleware;