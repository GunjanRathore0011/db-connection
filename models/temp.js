import { DataTypes } from "@sequelize/core";
import sequelize from "../config/db.js";

const Temp = sequelize.define("temp", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

export default Temp;

