// function requireUser(req, res, next) {
//   try {
//     console.log('requireUser middleware triggered');
//     // console.log('Value of req in requireUser:', req);

//     console.log('Authorization header:', req.headers.authorization);

//     // Assuming your middleware decodes the token and adds it to req.user
//     console.log('Decoded token:', req.user);
//     console.log('Decoded user in requireUser:', req.user);
//     console.log('decoded userId in requireUser:', req.user.id);

//     if (!req.user) {
//       console.log('User is missing');
//       const error = new Error('You must be logged in first');
//       error.status = 401;
//       return next(error);
//     }

//     console.log('User is present');
//     next();
//   } catch (error) {
//     console.error('Error in requireUser middleware:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
//}
// function requireUser(req, res, next) {
//   console.log('requireUser middleware triggered');

//   console.log('requireUser middleware triggered');
//   console.log('Authorization header:', req.headers.authorization);
//   console.log('Decoded token:', req.user); // Assuming your middleware decodes the token and adds it to req.user
//   console.log('Decoded user in requireUser:', req.user);
//   console.log('decoded userId in requireUser:', req.user.id)

//   if (!req.user) {
//     console.log('User is missing');
//     const error = new Error('You must be logged in first');
//     error.status = 401;
//     return next(error);
//   }
function requireUser(req, res, next) {
  console.log('requireUser middleware triggered');
  console.log('Authorization header:', req.headers.authorization);
  console.log('Decoded token:', req.user); 
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

