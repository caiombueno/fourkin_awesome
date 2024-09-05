import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInAnonymously, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@firebaseConfig'; // Your Firebase config file
import { User } from '@models';

interface EmailCredentials {
    email: string;
    password: string;
}

class AuthDataSource {
    async login({ email, password }: EmailCredentials) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async register({ email, password }: EmailCredentials) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async logout() {
        return await signOut(auth);
    }

    async signInAnonymously() {
        return await signInAnonymously(auth);
    }

    get currentUser(): User | null {
        return auth.currentUser;
    }

    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        // Set up the listener using Firebase's onAuthStateChanged
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // If the user is authenticated, return a simplified User object
                const user: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                };
                callback(user);
            } else {
                // If no user is authenticated, return null
                callback(null);
            }
        });

        // Return the unsubscribe function to stop listening when necessary
        return unsubscribe;
    }
}

const authDataSource = new AuthDataSource();

export { AuthDataSource, authDataSource, EmailCredentials, User };