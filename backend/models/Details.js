import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.js";

const Details = sequelize.define("Details", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Details;

