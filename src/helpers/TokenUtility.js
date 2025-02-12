import moment from 'moment';

// Key for localStorage
const TOKEN_KEY = 'auth_token';
const EXPIRATION_KEY = 'auth_token_expiration';

// Save token with expiration time (24 hours from now)
export const storeToken = (token) => {
    const expiration = moment().add(24, 'hours').toISOString(); // Set expiration 24 hours from now
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRATION_KEY, expiration);
};

// Get token if it's still valid
export const readToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiration = localStorage.getItem(EXPIRATION_KEY);

    if (!token || !expiration) {
        return null; // No token or expiration found
    }

    // Check if the token is still valid
    if (moment().isBefore(moment(expiration))) {
        return token; // Token is valid
    } else {
        // Token has expired, clear it from localStorage
        clearToken();
        return null;
    }
};

// Clear token and expiration from localStorage
export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
};