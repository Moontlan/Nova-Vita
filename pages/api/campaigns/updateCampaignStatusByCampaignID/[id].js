import { pool } from '../../../../lib/mysql';

export default async (req, res) => {
  if (req.method === 'PUT') {
    const id = req.query.id;

    try {
      const { status } = req.body;

      const [result] = await pool.query(
        `UPDATE Campaigns SET status = ? WHERE idCampaign = ?`,
        [status, id]
      );

      res.status(200).json({ message: 'Campaign updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only PUT requests are accepted' });
  }
};