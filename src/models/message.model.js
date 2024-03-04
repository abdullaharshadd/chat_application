import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { Chat } from './chat.model.js';

export const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    
});