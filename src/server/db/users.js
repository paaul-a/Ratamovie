const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [ user ] } = await db.query(`
        INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, 'user']);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

async function getUserById(userId) {
    try {
        const { rows: [ user ]} = await db.query(`
        SELECT *
        FROM users
        WHERE id = $1;
        `, [userId])

        if(!user) return null;

        return user
    } catch(err) {
        throw err
    }
}
// const getUserById = async(userId, req) => {
//     console.log('Entering getUserById function');  // Add this line

//     try {
//         console.log('Entering getUserById function. userId:', userId, 'req:', req);

        // console.log('req.user:', req.user);

        // if (typeof userId === 'string' && userId.toLowerCase() === 'me') {
        //     userId = req.user.id;
        // }

        //console.log('userId before query:', userId);
        // if (userId === 'me') {
        //     userId = req.user.id;
        //   }

        // const { rows: [ user ] } = await db.query(`
        //     SELECT *
        //     FROM users
        //     WHERE id = $1
        //     `, [userId]
        // );
        //console.log('Database query result:', { rows: [user] });
        
        // console.log('After querying the database. user:', user);

        // if (!user) {
        //     console.error('User not found:', user);
        //     throw {
        //         name: "UserNotFoundError",
        //         message: "A user with that id does not exist"
        //     }
//}

        // if(!user) {
        //     throw{
        //         name: "UserNotFoundError",
        //         message: "A user with that id does not exist"
        //     }
        // }
//         console.log('User object:', user);

//         return user
//     } catch(error) {
//         throw error;
//     }

// }
const getAllUsers = async () => {
    try {
        const { rows: users } = await db.query(`
        SELECT id, name, email, role
        FROM users;
        `);
        return users;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserById,
    getAllUsers
};