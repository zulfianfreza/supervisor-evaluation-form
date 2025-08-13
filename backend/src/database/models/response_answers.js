const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class response_answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      response_answers.belongsTo(models.assessment_responses, {
        foreignKey: 'assessment_response_id',
        as: 'assessment_response',
      });
      response_answers.belongsTo(models.questions, {
        foreignKey: 'question_id',
        as: 'question',
      });
    }
  }
  response_answers.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4(),
        autoIncrement: true,
      },
      assessment_response_id: {
        type: DataTypes.UUID(),
        allowNull: false,
      },
      question_id: {
        type: DataTypes.UUID(),
        allowNull: false,
      },
      answer: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'response_answers',
      tableName: 'response_answers',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return response_answers;
};
