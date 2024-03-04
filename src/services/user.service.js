
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import passwordValidator from 'password-validator';
const schema = new passwordValidator();

schema
    .is().min(8)       // Minimum length 8
    .has().uppercase() // Must have uppercase letters
    .has().digits()    // Must have digits
    .has().symbols();  // Must have symbols

export const login = async (email, password) => {
    try {
        // Find the user in the database by email
        const user = await User.findOne({ where: { email } });
    
        // If user not found or password is incorrect, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return { message: 'Invalid credentials', statusCode: 401};
        }
    
        // If credentials are valid, generate a token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '7d' });
    
        return { message: 'Login successful', token, statusCode: 200};
      } catch (error) {
        console.error('Error creating user:', error);
        return { message: 'Internal server error', statusCode: 500 };
    }
}

export const signUp = async (email, first_name, last_name, username, password) => {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { username: username }
          ]
        }
      });
          
          if (existingUser) {
            return { message: 'User already exists', statusCode: 409 };
          }
          
          if (schema.validate(password) === false) {
            return { message: 'Password should be of atleast 8 length and it should have atleast one uppercase letter, one special character and one digit', statusCode: 400 };
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);
          
          const newUser = await User.create({
            email: email,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            username: username
          });

          
          
          return { message: 'Signup successful', statusCode: 200 };
    } catch (error) {
        console.error('Error creating user:', error);
        return { message: 'Internal server error', statusCode: 500 };
    }
}

export const findUser = async(user_id) => {
  const user = await User.findOne({
    where: {
      id: user_id
    }
  })
  
  return user;
}

export const findAll = async(current_user_id=null) => {

  const users = await User.findAll({
    where: {
        id: {
            [Op.not]: current_user_id
        }
    },
    attributes: ['id', 'username']
  });
  return users;
}