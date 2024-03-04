import { getUserIdFromToken } from "./auth.helper.js";
import { getChatBetweenUsers } from "../services/chat.service.js";
import { findUser } from "../services/user.service.js";
import { connectedSockets } from '../websocket.js';
import { createChat } from "../services/chat.service.js";

export const handleMessage = async (message, connectedSockets) => {
    const receiver = await findUser(message.send_to);
    const sender_id = await getUserIdFromToken(message.token);
    const message_text = message.message;
    
    if (receiver) {
        let chat = await getChatBetweenUsers(sender_id, receiver.id);

        if (!chat) {
            chat = await createChat(sender_id, receiver.id);
        }

        const msg = {};
        const sender = await findUser(sender_id);
        msg.from = sender.username;
        msg.message = message_text;
        msg.to = receiver.username;

        connectedSockets[receiver.id].emit('message', msg);
        connectedSockets[sender_id].emit('message', msg);
        await chat.update({
            last_message: message_text,

        })
    }

}