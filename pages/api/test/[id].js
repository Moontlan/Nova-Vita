// File: ./pages/api/campaigns/[id].js
import { pool } from "../../../lib/mysql";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query; // get the campaign id from request query parameter

      const [campaigns] = await pool.query(
        `SELECT * FROM Campaigns WHERE idCampaign = ?`,
        [id]
      );

      if (campaigns.length > 0) {
        res.status(200).json({ campaign: campaigns[0] });
      } else {
        res.status(404).json({ error: "Campaign not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Only GET requests are accepted" });
  }
};
