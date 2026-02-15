import { Sequelize } from "sequelize";
import env from "dotenv";
env.config();

const sequilize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);

export const connectDB = async () =>{

    try {
        await sequilize.authenticate();
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
