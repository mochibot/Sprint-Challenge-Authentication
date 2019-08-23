const db = require('../database/dbConfig');

module.exports = {
  findAllUsers,
  findUserBy,
  addUser,
}

function findAllUsers() {
  return db('users').select('id', 'username');
}

function findUserBy(filter) {
  return db('users').where(filter).first();
}

async function addUser(user) {
  const [id] =  await db('users').insert(user, 'id');

  return findUserBy({ id });
}