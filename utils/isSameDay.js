import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/fireBaseConfig";

export const isSameDay = async uid => {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const lastGeneratedAt = docSnap.data().lastGeneratedAt?.toDate();
      if (!lastGeneratedAt) return false;
      const today = new Date();

      const isSameDay =
        lastGeneratedAt &&
        lastGeneratedAt.getFullYear() === today.getFullYear() &&
        lastGeneratedAt.getMonth() === today.getMonth() &&
        lastGeneratedAt.getDate() === today.getDate();

      return isSameDay;
    }
  } catch (error) {
    console.log(`Error in isSameDay: `, error);
  }
};
