import jsonwebToken from "jsonwebtoken";


const SECRET_KEY ="dfjkhsdkjfhsdkjfhsjkdfsjkhfkjshfkjsdhf";


export const genrateToken = (payload) => {
    return jsonwebToken.sign(payload,SECRET_KEY);
}

export const verifyToken = (token) => {
        const decoded = jsonwebToken.verify(token,SECRET_KEY);
        return decoded;
}