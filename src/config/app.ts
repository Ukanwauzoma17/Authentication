import dotenv from "dotenv";
dotenv.config();

export const settings = {
    secretKey : process.env.JWT_KEY as string
}