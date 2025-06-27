import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

app.get('/blogs/:blogName', async (req, res) => {
  const blogName = req.params.blogName;

  try {
    const result = await pool.query(
      'SELECT * FROM blogs WHERE blog_name = $1',
      [blogName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB query failed' });
  }
});

app.get('/projects/:projectName', async (req, res) => {
  const projectName = req.params.projectName;

  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE project_name = $1',
      [projectName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB query failed' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend ready at http://localhost:${port}`);
});
