module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    authorId: DataTypes.BOOLEAN,
    timestamp: DataTypes.BIGINT,
  });

  return Message;
};
