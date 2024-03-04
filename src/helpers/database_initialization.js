import { createRelationships } from "./database.relationships.js";

export const initializeModels = async (sequelize) => {
    await sequelize.sync({alter: true});
    createRelationships();
    console.log('Models synchronized with the database');
}