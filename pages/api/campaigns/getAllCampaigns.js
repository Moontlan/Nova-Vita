import { pool } from '../../../lib/mysql';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const [result] = await pool.query('SELECT * FROM Campaigns');
      const campaigns = result;

      res.status(200).json({ campaigns });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only GET requests are accepted' });
  }
};
