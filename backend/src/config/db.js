import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    
});

console.log(pool.query("SELECT NOW;"));

await pool.end();
