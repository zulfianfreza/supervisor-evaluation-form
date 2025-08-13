const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate() {
      // define association here
    }
  }
  questions.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4(),
        autoIncrement: true,
      },
      question_text: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'questions',
      tableName: 'questions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return questions;
};
