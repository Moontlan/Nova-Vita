// File: ./pages/api/users/makeDonation.js
import { db, collection } from '../../../lib/firebase';
import { addDoc } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { campaign_id, description, donationDate, quantity, isAnonymous, user_id, pickupDateTime } = req.body;
      
      const donationsRef = collection(db, 'donations');
      const newDonation = await addDoc(donationsRef, {
        campaign_id,
        description,
        donationDate,
        quantity,
        status: 'POR RECOGER',
        user_id,
        isAnonymous,
        pickupDateTime
      });

      res.status(200).json({ message: 'Donation made successfully', donationId: newDonation.id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only POST requests are accepted' });
  }
};
