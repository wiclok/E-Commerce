import sequelize from './relations.js';

export const startDB = async () => {
  try {
    await sequelize.sync( {alter: true } );
  } catch (err) {
    console.error('Error starting database')
    console.error(err)
  }
}