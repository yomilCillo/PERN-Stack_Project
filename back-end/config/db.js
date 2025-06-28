import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

//Create a sql connection using ENV variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require&channel_binding=require'`
);
