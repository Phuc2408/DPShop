const { pgPool } = require('../config/db.js');

//PostgreSQL
async function findByEmail(email) {
    const query = 'SELECT * FROM public.customer WHERE email = $1';
    const values = [email];
    try {
        const result = await pgPool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
}
async function createUser(fullName, email, hashPassword, phoneNumber, dayOfBirth) {
    try {
        const query = 'INSERT INTO public.customer (full_name, email, hash_password, phone_number, day_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, phone_number, created_at';
        const values = [fullName, email, hashPassword, phoneNumber, dayOfBirth];
        const result = await pgPool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

async function findByGoogleId(providerId) {
    const query = 'SELECT * FROM public.customer WHERE google_id = $1';
    const values = [providerId];
    try {
        const result = await pgPool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by Google ID:", error);
        throw error;
    }
}

async function findByFacebookId(providerId) {
    const query = 'SELECT * FROM public.customer WHERE facebook_id = $1';
    const values = [providerId];
    try {
        const result = await pgPool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by Facebook ID:", error);
        throw error;
    }
}

async function updateSocialId(userId, provider, providerId) {
    try {
        let column = '';
        if (provider === 'google') {
            column = 'google_id';
        } else if (provider === 'facebook') {
            column = 'facebook_id';
        } else {
            throw new Error('Unsupported provider');
        }
        const query = `UPDATE public.customer SET ${column} = $1 WHERE id = $2 RETURNING *`;
        const values = [providerId, userId];
        const result = await pgPool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
    }
    catch (error) {
        console.error(`Error updating social ID for ${provider}:`, error);
        throw error;
    }
}

async function createUserWithProvider(fullName, email, provider, providerId) {
    try {
        const column = provider === 'google' ? 'google_id' : 'facebook_id';
        const query = `INSERT INTO public.customer (full_name, email, ${column}) VALUES ($1, $2, $3) RETURNING id, full_name, email`;
        const values = [fullName, email, providerId];
    }
    catch (error) {
        console.error("Error creating user with social provider:", error);
        throw error;
    }
}

module.exports = {
    findByEmail,
    createUser,
    findByGoogleId,
    findByFacebookId,
    updateSocialId,
    createUserWithProvider
};