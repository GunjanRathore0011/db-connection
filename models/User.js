import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    defaultValue: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
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
  bookmark:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
  
});

export default User;
