import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/fireBaseConfig";

export const saveTripData = async (jsonResponse, tripData, model) => {
  try {
    const user = auth.currentUser;
    const docId = Date.now().toString();

    const result = await setDoc(doc(db, "UserTrips", docId), {
      docId,
      userEmail: user.email,
      userUid: user.uid,
      tripDetails: jsonResponse,
      tripData: JSON.stringify(tripData) || "",
      model,
    });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      lastGeneratedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.log(`Error in saveTripData:`, error);
    return false;
  }
};
