
function requireUser(req, res, next) {
  console.log('requireUser middleware triggered');
  console.log('Authorization header:', req.headers.authorization);
  console.log('Decoded token:', req.user); // Assuming your middleware decodes the token and adds it to req.user
  if (!req.user) {
    console.log('User is missing');
    res.status(401);
    return next({
      name: "MissingUserError",
      message: "You must be logged in first"
    });
  }
  console.log('User is present');
  next();
}

const requireAdmin = (req, res, next) => {
  if (!req.user){
    return res.status(401).json({ error: 'Unauthorized - Admin privileges required'})
  }
  if (req.user.role !== 'admin'){
    return res.status(403).json({ error: 'Forbidden - Admin privileges required'})
  }
  next();
};
module.exports = {
  requireUser,
  requireAdmin
};

