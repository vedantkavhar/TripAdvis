// models/User.js
const sql = require('../config/database');

const createUser = async (name, email, hashedPassword, createdBy, createdOn, isActive) => {
  const result = await sql.query`
    INSERT INTO Users (Name, Email, Password, CreatedBy, CreatedOn, IsActive)
    OUTPUT INSERTED.*
    VALUES (${name}, ${email}, ${hashedPassword}, ${createdBy}, ${createdOn}, ${isActive})
  `;
  return result.recordset[0];
};

const getUserByEmail = async (email) => {
  const result = await sql.query`
    SELECT * FROM Users WHERE Email = ${email}
  `;
  return result.recordset[0];
};

const activateUser = async (email) => {
  await sql.query`
    UPDATE Users SET IsActive = 1 WHERE Email = ${email}
  `;
};

module.exports = {
  createUser,
  getUserByEmail,
  activateUser,
};
