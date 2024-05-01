import { db, collection, getDocs, query, where } from '../../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Only GET requests are accepted' });
  }

  const { id: userId } = req.query; // Extract user id from request query parameters

  console.log('User ID:', userId); // Log the user id

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const donationsRef = collection(db, 'donations');
    const q = query(donationsRef, where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
  
    let donations = [];
    querySnapshot.forEach((doc) => {
      donations.push(doc.data());
    });
  
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
