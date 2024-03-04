import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { User } from './user.model.js';
import { Message } from './message.model.js';

export const Chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    inviter_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    invitee_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    time_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    last_message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    channel: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    muted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },

});