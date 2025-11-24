import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber:{
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  label:{
    type: DataTypes.ENUM(["Work", "School", "Friends", "Family"]),
  },

  
});

export default User;
