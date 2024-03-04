import { sendMessage, createChat, getChats } from "../services/chat.service.js";

export const createChatBetweenUsers = async(req, res) => {
    const user = req.user; // current user
    const { user_id } = req.params;

    const result = await createChat(user.userId, user_id);
    return res.status().json({});
};

export const sendMessageToUser = async(req, res) => {
    const user = req.user; // current user
    const { user_id } = req.params;

    const result = await sendMessageToUser(user.userId, user_id);
    return res.json({});
};

export const getChatsOfaUser = async(req, res) => {
    const { userId } = req.user;
    const result = await getChats(userId);
    return res.json(result);
};
