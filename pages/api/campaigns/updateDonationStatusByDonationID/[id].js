// File: ./pages/api/donations/update/[id].js
import { db, collection, doc, updateDoc } from '../../../../lib/firebase';

export default async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const donation_id = req.query.id;
      const { status } = req.body;

      const donationRef = doc(db, 'donations', donation_id);
      await updateDoc(donationRef, {
        status
      });

      res.status(200).json({ message: 'Donation updated successfully' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only PUT requests are accepted' });
  }
};
