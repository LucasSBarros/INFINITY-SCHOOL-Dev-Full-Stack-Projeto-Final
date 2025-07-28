import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  JWT_SECRET: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.url(),
});

const env = envSchema.parse(process.env);

export default env;
