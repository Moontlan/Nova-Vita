import { db, collection, getDocs, query, where } from "../../../../../lib/firebase";
import { pool } from "../../../../../lib/mysql";
import { doc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query; // get the campaign id from request query parameter

    // Verify if the campaign with the provided ID is closed
    const [campaigns] = await pool.query(
      `SELECT * FROM Campaigns WHERE idCampaign = ? AND status = 'closed'`,
      [id]
    );

    if (campaigns.length > 0) {
      // If the campaign exists and is closed, fetch all donations from Firebase for this campaign
      const donationRef = collection(db, "donations");
      const q = query(donationRef, where("campaign_id", "==", id));
      const querySnapshot = await getDocs(q);
      const donations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const updatedDonations = await Promise.all(
        donations.map(async (donation) => {
          if (donation.isAnonymous === "Yes") {
            return { id: donation.id, ...donation, Name: "Anonimo" };
          } else {
            const userDocRef = doc(db, "users", donation.user_id);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              return { id: donation.id, ...donation, Name: userData.fullName };
            } else {
              return { id: donation.id, ...donation };
            }
          }
        })
      );

      res.status(200).json({ donations: updatedDonations });
    } else {
      res.status(404).json({ message: "No closed campaign found with the provided ID" });
    }
  } else {
    res.status(400).json({ error: "Only GET requests are accepted" });
  }
};
