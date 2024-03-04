import { signUp, login, findAll } from "../services/user.service.js";

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await login(email, password);
    return res.status(result.statusCode).json(result);
};

export const signUpUser = async(req, res) => {
    const { email, password, first_name, last_name, username } = req.body;

    if (!email || !password || !first_name || !last_name || !username) {
        return res.status(400).json({ message: 'Email, first name, last name, username, and password are required' });
    }

    const result = await signUp(email, first_name, last_name, username, password);
    return res.status(result.statusCode).json(result);
    
};

export const getAllUsers = async(req, res) => {
    const user = req.user;
    const result = await findAll(user.userId);
    return res.json(result);
};