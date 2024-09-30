import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, setPersistence, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import {Capacitor} from "@capacitor/core";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
function whichAuth() {
    let auth
    if (Capacitor.isNativePlatform()) {
        auth = initializeAuth(app, {
            persistence: indexedDBLocalPersistence
        })
    } else {
        auth = getAuth()
    }
    return auth
}

const auth = whichAuth()
export const db = getFirestore(app);

export async function login(email: string, password: string) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res)

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function register(
    name: string,
    email: string,
    password: string
) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });

        return {
            status: true,
        }
    } catch (error) {
        return {
            error: error,
            status: false
        }
    }
}

export async function logout() {
    try {
        await auth.signOut();
        return true;
    } catch (error) {
        return false;
    }
}

export async function getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // Stop listening after we get the result
            resolve(user);
        }, reject);
    });
}