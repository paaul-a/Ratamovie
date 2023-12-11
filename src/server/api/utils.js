
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
  try {
  if (!req.user){
    console.log('no user info found')
    return res.status(401).json({ error: 'Unauthorized - Admin privileges required'})
  }
  console.log('User role:', req.user.role);
  if (req.user.role !== 'admin'){
    console.log('user does not have admin priveleges')
    return res.status(403).json({ error: 'Forbidden - Admin privileges required'})
  }
  console.log('admin privs granted')
  next();
  } catch (error){
    console.error('error in middleware:', error);
    res.status(500).json({ error: 'internal server error' })
  }
};
module.exports = {
  requireUser,
  requireAdmin
};

