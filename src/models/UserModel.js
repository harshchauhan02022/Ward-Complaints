const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserProblem = sequelize.define(
 "UserProblem",
 {
  id: {
   type: DataTypes.INTEGER,
   autoIncrement: true,
   primaryKey: true,
  },
  mobile: {
   type: DataTypes.STRING(10),
   allowNull: false,
   comment: "Mobile number",
  },
  otp: {
   type: DataTypes.STRING(6),
   allowNull: true,
   comment: "OTP",
  },
  description: {
   type: DataTypes.TEXT,
   allowNull: true,
   comment: "Problem description",
  },
  photo_path: {
   type: DataTypes.STRING,
   allowNull: true,
   comment: "Path to the photo related to the problem",
  },
  location: {
   type: DataTypes.TEXT,
   allowNull: true,
   comment: "Location",
  },
  name: {
   type: DataTypes.STRING(100),
   allowNull: true,
   comment: "Name",
  },
  father_or_husband_name: {
   type: DataTypes.STRING(100),
   allowNull: true,
   comment: "Father or husband's name",
  },
  house_number: {
   type: DataTypes.STRING(50),
   allowNull: true,
   comment: "House number",
  },
  street: {
   type: DataTypes.STRING(255),
   allowNull: true,
   comment: "Street",
  },
  landmark: {
   type: DataTypes.STRING(255),
   allowNull: true,
   comment: "Landmark",
  },
  created_at: {
   type: DataTypes.DATE,
   allowNull: false,
   defaultValue: DataTypes.NOW,
   comment: "Creation date",
  },
  updated_at: {
   type: DataTypes.DATE,
   allowNull: false,
   defaultValue: DataTypes.NOW,
   comment: "Update date",
  },
 },
 {
  tableName: "users",
  timestamps: false,
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  comment: "Users table for problems",
 }
);

module.exports = UserProblem;
