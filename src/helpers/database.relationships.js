import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const createRelationships = () => {
    User.hasMany(Chat, { foreignKey: 'inviter_id', as: 'InviterChats' });
    User.hasMany(Chat, { foreignKey: 'invitee_id', as: 'InviteeChats' });

    Chat.belongsTo(User, { foreignKey: 'inviter_id', as: 'Inviter' });
    Chat.belongsTo(User, { foreignKey: 'invitee_id', as: 'Invitee' });
    Chat.hasMany(Message);
    Message.belongsTo(Chat);
} 
