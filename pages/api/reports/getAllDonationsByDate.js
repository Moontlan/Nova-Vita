import { db, collection, getDocs, query, where } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  if (req.method === "POST") {
    const { startDate, endDate } = req.body;

    // convert dates to ISO format
    const startISO = new Date(startDate).toISOString();
    const endISO = new Date(endDate).toISOString();

    const donationRef = collection(db, "donations");
    const q = query(
      donationRef,
      where("donationDate", ">=", startISO),
      where("donationDate", "<=", endISO)
    );
    const querySnapshot = await getDocs(q);
    const filteredDonations = querySnapshot.docs.map((doc) => doc.data());

    const updatedDonations = await Promise.all(
      filteredDonations.map(async (donation) => {
        const userDocRef = doc(db, "users", donation.user_id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (donation.isAnonymous === "yes") {
            return { ...donation, Name: `${userData.fullName}(Anonimo)` };
          }
          return { ...donation, Name: userData.fullName };
        } else {
          return { ...donation };
        }
      })
    );

    res.status(200).json({ donations: updatedDonations });
  } else {
    res.status(400).json({ error: "Only POST requests are accepted" });
  }
};
