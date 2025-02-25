import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fireBaseConfig";

export async function deleteMyTrip(tripId) {
  try {
    const tripRef = doc(db, "UserTrips", tripId);
    await deleteDoc(tripRef);
    console.log(`Successfully deleted trip ${tripId}`);
  } catch (error) {
    console.error(`Error in deleteMyTrip`, error);
    throw error;
  }
}
