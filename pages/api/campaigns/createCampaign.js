import { db, collection, addDoc } from "../../../lib/firebase";
import { pool } from "../../../lib/mysql";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { idInstitution, campaignName, description, beneficiaryType, startDate, endDate, status } = req.body;

      // Insert campaign data into MySQL
      const query = `
        INSERT INTO Campaigns (idInstitution, campaignName, description, beneficiaryType, startDate, endDate, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        idInstitution,
        campaignName,
        description,
        beneficiaryType,
        startDate,
        endDate,
        status
      ];

      const [result] = await pool.query(query, values);

      // Get the auto-generated ID from the MySQL insert result
      const idCampaign = result.insertId;

      // Insert campaign data into Firebase with the obtained ID
      const campaignRef = collection(db, "campaigns");
      await addDoc(campaignRef, {
        idCampaign,
        idInstitution,
        campaignName,
        description,
        beneficiaryType,
        startDate,
        endDate,
        status
      });

      res.status(200).json({ message: "Campaign created successfully", idCampaign });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Only POST requests are accepted" });
  }
};