const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class respondents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      respondents.hasOne(models.assessment_responses, {
        sourceKey: 'id',
        foreignKey: 'respondent_id',
        as: 'assessment_response',
      });
    }
  }
  respondents.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4(),
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      years_of_service: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'respondents',
      tableName: 'respondents',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return respondents;
};
