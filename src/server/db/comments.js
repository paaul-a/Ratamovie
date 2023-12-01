const db = require('./client')
// const bcrypt = require('bcrypt');
// const SALT_COUNT = 10;

const createCommentsTable = async({ name='first last', date="2001", rating="5 star" }) => {
    // const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [comments ] } = await db.query(`
        INSERT INTO users(name, date, rating)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, date, rating]);

        return comments;
    } catch (err) {
        throw err;
    }
}

const getComment = async({name, date, rating}) => {
    if(!name || !date || !rating) {
        return;
    }
    try {
        // const getComments = await getUserByEmail(email);
        // if(!user) return;
        // const hashedPassword = user.password;
        // const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        // if(!passwordsMatch) return;
        // delete user.password;
        return comments;
    } catch (err) {
        throw err;
    }
}

// const getUserByEmail = async(email) => {
//     try {
//         const { rows: [ user ] } = await db.query(`
//         SELECT * 
//         FROM users
//         WHERE email=$1;`, [ email ]);

//         if(!user) {
//             return;
//         }
//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

module.exports = {
    createCommentsTable,
    getComment,
    // getUserByEmail
};