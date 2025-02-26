import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/fireBaseConfig";
import moment from "moment";

export const isSameDay = async uid => {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const lastGeneratedAt = docSnap.data().lastGeneratedAt?.toDate();
      if (!lastGeneratedAt) return false;

      return moment(lastGeneratedAt).isSame(moment(), "day");
    }
  } catch (error) {
    console.log(`Error in isSameDay: `, error);
    return false;
  }
};
