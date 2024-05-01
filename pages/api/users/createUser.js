import { db, collection } from '../../../lib/firebase';
import { addDoc } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { CI, donations, email, fullName, location, phone } = req.body;
      
      const userRef = collection(db, 'users');
      const newUser = await addDoc(userRef, {
        CI,
        donations,
        email,
        fullName,
        location,
        phone
      });

      res.status(200).json({ message: 'User created successfully', userId: newUser.id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only POST requests are accepted' });
  }
};
