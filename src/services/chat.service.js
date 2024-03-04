
import { Chat } from '../models/chat.model.js';
import { User } from '../models/user.model.js';
import { Sequelize } from 'sequelize';
export const sendMessage = async (from, to) => {
    try {
       
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createChat = async (user1_id, user2_id) => {
  try {
    // Check if a chat room already exists
    const existingChat = await Chat.findOne({
      where: {
        [Sequelize.Op.or]: [
          {
            inviter_id: user1_id,
            invitee_id: user2_id,
          },
          {
            inviter_id: user2_id,
            invitee_id: user1_id,
          },
        ],
      },
    });

    if (existingChat) {
      return existingChat;
    }

    // Create a new chat room
    const newChat = await Chat.create({
      inviter_id: user1_id,
      invitee_id: user2_id,
    });

    return newChat;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getChats = async (user_id) => {
    try {
        const userChats = await Chat.findAll({
          where: {
            [Sequelize.Op.or]: [
              { inviter_id: user_id },
              { invitee_id: user_id },
            ],
          },
          include: [
            {
              model: User,
              as: 'Inviter',
              attributes: ['id', 'username'],
            },
            {
              model: User,
              as: 'Invitee',
              attributes: ['id', 'username'],
            },
          ],
        });
        return {chats: userChats, statusCode: 200};
      } catch (error) {
        console.error(error);
        return {chats: [], statusCode: 500, message: 'Internal Server Error'};
      }
}

export const getChatBetweenUsers = async (user_id1, user_id2) => {
  const chat = await Chat.findOne({
    where: {
      [Sequelize.Op.or]: [
        { inviter_id: user_id1, invitee_id: user_id2 },
        { inviter_id: user_id2, invitee_id: user_id1 },
      ],
    }
  });

  return chat;
}