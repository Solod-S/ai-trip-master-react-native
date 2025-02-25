import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/fireBaseConfig.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: undefined,

  setUser: user => set({ user }),
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),

  updateUserData: async id => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      set(state => ({
        user: {
          ...state.user,
          email: data.email,
          fullName: data.fullName,
          userId: data.userId,
        },
      }));
    }
  },

  login: async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response.user };
    } catch (error) {
      console.log("Error login:", error);
      let msg = error.message || "An error occurred";
      if (msg.includes("invalid-email")) msg = "Invalid email";
      if (msg.includes("auth/invalid-credential"))
        msg = "Invalid email or password";
      // return { success: false, message: msg };
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false });
      return { success: true };
    } catch (error) {
      console.log("Error logout:", error);
      // return { success: false, message: error.message };
      set({ user: null, isAuthenticated: false });
    }
  },

  register: async (email, password, fullName) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        email,
        fullName,
        userId: response.user.uid,
        lastGeneratedAt: null,
      });

      return { success: true, data: response.user };
    } catch (error) {
      console.log("Error register:", error);
      let msg = error.message;
      if (msg.includes("invalid-email")) msg = "Invalid email";
      if (msg.includes("email-already-in-use")) msg = "Email already in use";
      // return { success: false, message: msg };
      throw error;
    }
  },

  initAuthListener: () => {
    set({ isAuthenticated: undefined }); // Устанавливаем состояние в неопределённое
    const unsubscribe = onAuthStateChanged(auth, async user => {
      // console.log("onAuthStateChanged triggered", user); // Логируем пользователя
      if (user) {
        set({ user, isAuthenticated: true });
        await useAuthStore.getState().updateUserData(user.uid); // Загружаем доп. данные пользователя
      } else {
        set({ user: null, isAuthenticated: false });
      }
    });
    return unsubscribe;
  },

  // initAuthListener: () => {
  //   set({ isAuthenticated: undefined }); // Устанавливаем состояние в неопределённое
  //   const unsubscribe = onAuthStateChanged(auth, async user => {
  //     console.log(`!`, user.email);
  //     if (user) {
  //       set({ user, isAuthenticated: true });
  //       await useAuthStore.getState().updateUserData(user.uid); // Загружаем доп. данные пользователя
  //     } else {
  //       set({ user: null, isAuthenticated: false });
  //     }
  //   });
  //   return unsubscribe;
  // },
}));

export default useAuthStore;
