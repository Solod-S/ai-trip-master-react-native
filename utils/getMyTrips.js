import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/fireBaseConfig";

export async function getMyTrips(uid) {
  try {
    const q = query(
      collection(db, "UserTrips"),
      where("userUid", "==", uid),
      orderBy("docId", "desc")
    );
    const querySnapshot = await getDocs(q);
    const trips = querySnapshot.docs.map(doc => doc.data());
    return trips;
  } catch (error) {
    console.log(`error in getMyTrips`, error);
    return [];
  }
}
