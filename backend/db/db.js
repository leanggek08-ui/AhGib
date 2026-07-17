import dotenv from "dotenv";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pg; // for node.js talk to a PostgreSQL
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
const placeholderPattern = /(?:USER|PASSWORD|HOST|DATABASE|your_|replace_)/i;

if (connectionString && placeholderPattern.test(connectionString)) {
  throw new Error(
    "SUPABASE_DB_URL still contains placeholder values. Copy the real PostgreSQL connection string from your Supabase project's Connect dialog into backend/.env.",
  );
}

if (
  !connectionString &&
  process.env.DB_HOST &&
  placeholderPattern.test(process.env.DB_HOST)
) {
  throw new Error(
    "DB_HOST still contains a placeholder value. Configure SUPABASE_DB_URL or provide real DB_* settings in backend/.env.",
  );
}

const isLocalConnection =
  !connectionString || /(?:localhost|127\.0\.0\.1)/i.test(connectionString);

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: isLocalConnection ? false : { rejectUnauthorized: false },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: false,
      },
);

export default pool;
