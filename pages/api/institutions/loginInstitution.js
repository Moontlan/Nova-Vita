import { pool } from '../../../lib/mysql';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email, nit } = req.body;

      const [result] = await pool.query(
        `SELECT idInstitution FROM Institutions WHERE email = ? AND nit = ?`,
        [email, nit]
      );

      if (result.length > 0) {
        const { idInstitution } = result[0];
        res.status(200).json({ idInstitution });
      } else {
        res.status(404).json({ message: 'Email and/or NIT do not exist in the database' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only POST requests are accepted' });
  }
};
