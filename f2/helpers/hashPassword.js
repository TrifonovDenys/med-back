import { genSalt, hash } from 'bcrypt';

export const func = async (next) => {
    const salt = await genSalt(10);
    const hashedPasword = await hash(password, salt);
    next();
};
