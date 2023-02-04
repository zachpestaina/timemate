//timesheet
module.exports = (sequelize, DataTypes, employees) => {
  const Timesheet = sequelize.define(
    'timesheet',
    {
      entry_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      clock_in: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
      },
      clock_out: {
        type: DataTypes.DATETIME,
      },
      emp_role: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: types,
          // This is the column name of the referenced model
          key: 'role_id',
        },
      },
    },
    { timestamps: true }
  );
  return Employees;
};
