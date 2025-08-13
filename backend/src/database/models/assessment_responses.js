const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class assessment_responses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      assessment_responses.hasMany(models.response_answers, {
        sourceKey: 'id',
        foreignKey: 'assessment_response_id',
        as: 'response_answers',
      });
    }
  }
  assessment_responses.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4(),
        autoIncrement: true,
      },
      respondent_id: {
        type: DataTypes.UUID(),
        allowNull: false,
      },
      submitted_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'assessment_responses',
      tableName: 'assessment_responses',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return assessment_responses;
};
