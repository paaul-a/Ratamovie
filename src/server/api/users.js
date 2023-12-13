const express = require('express')
const { requireAdmin, requireUser } = require('./utils');
const usersRouter = express.Router();


const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getUserById
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', requireAdmin, async( req, res, next) => {
    try {
        //console.log('user info from token:', req.user);
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.get('/me/:userId', requireUser, async(req, res, next) => {
    try {
        
        //console.log('me endpoint:', req.user)
        res.send(req.user);
    } catch(err) {
        next(err)
    }
})
usersRouter.get('/:userId', requireUser, async ( req, res, next) => 
{
try{ const userId = req.params.userId;
     const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json ({ error: 'User not found' });
        }
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
    
        res.json(userData);     
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
});

// usersRouter.get('/me', requireUser, async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         const user = await getUserById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(user);
//     } catch (err) {
//         next(err);
//     }
// });

// usersRouter.get('/me', requireUser, async (req, res, next) => {
//     console.log('Entering /users/me route handler');  // Add this line
//     //console.log('Value of req before calling getUserById:', req);
//     console.log('req.user before getUserById:', req.user);


//     try {
//         console.log('Decoded user in /users/me:', req.user);

//         const userId = req.params.userId === 'me' ? req.user.id : req.params.userId;
//         // console.log('userId in api:', userId)

//         const user = await getUserById(req.user, req);

//         // const user = await getUserById(req.user.id);

//         if(!user) {
//             return res.status(404).json({error: 'user not found'})
//         }

//         const userData = {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//         };
//         res.json(userData)

//     } catch(err) {
//         console.error(err);

//         if (err.name === 'UserNotFoundError') {
//           // Respond with a 404 status and an error message
//           res.status(404).json({ error: 'User not found' });
//         } else {
//           // For other types of errors, respond with a 500 status and a generic error message
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       }
    
// })

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token,
                id: user.id
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;