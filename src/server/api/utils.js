
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

module.exports = {
  requireUser
};

