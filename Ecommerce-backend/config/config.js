import dotenv from "dotenv";
dotenv.config();
const {
  PORT,
  MONGO_URL
} = process.env;

export {
  PORT,
  MONGO_URL
}
