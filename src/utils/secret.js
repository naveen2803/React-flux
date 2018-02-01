import jwt from 'jsonwebtoken';

// secret key
function generateKey() {
    return "NDY0YzQ0ZTUtZDY0ZS00MmE5LTg4OTctNDQ2OWJlYzI2ZGRm";
}

export function generateToken(username, role) {
    var token = jwt.sign({ username: username, role:role }, generateKey());
    return token;
}

export function decodeToken(token) {
    var decoded = jwt.verify(token, generateKey());
    return decoded;
}

export default { generateToken, decodeToken }
