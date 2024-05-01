import { pool } from '../../../lib/mysql';

export default async (req, res) => {
    if (req.method === 'POST') {
      try {
        const { idInstitution, firstName, firstLastName, secondLastName, nit, representative, email, phone, mobile, address, location } = req.body;
  
        const [result] = await pool.query(
          `INSERT INTO Institutions (idInstitution, firstName, firstLastName, secondLastName, nit, representative, email, phone, mobile, address, location) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [idInstitution, firstName, firstLastName, secondLastName, nit, representative, email, phone, mobile, address, location]
        );
  
        res.status(200).json({ message: 'Institution created successfully', idInstitution });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Only POST requests are accepted' });
    }
  };  