import jwt from 'jsonwebtoken';

export function getBase() {
    //return "https://wt-naveen-malhotra28-gmail-com-0.run.webtask.io/myTask";
    return "http://localhost:5000";
}

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

export default { generateToken, decodeToken, getBase }
