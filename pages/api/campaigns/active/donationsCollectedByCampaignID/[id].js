//./pages/api/donations/received/[id].js
import { db, collection, getDocs, query, where } from '../../../../../lib/firebase';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const campaignId = req.query.id;

      const q = query(
        collection(db, 'donations'), 
        where('campaign_id', '==', campaignId),
        where('status', '==', 'RECIBIDA')
      );

      const querySnapshot = await getDocs(q);
      let donations = [];
      querySnapshot.forEach((doc) => {
        donations.push(doc.data());
      });

      res.status(200).json({ donations });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only GET requests are accepted' });
  }
};
