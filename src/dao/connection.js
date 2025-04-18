import { connect } from "mongoose";
import { config } from "dotenv";

config({ path: "./config.env" });

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_ATLAS_URL);
  } catch (error) {
    throw new Error(error);
  }
};
