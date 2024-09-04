// AuthDataSource.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@firebaseConfig'; // Your Firebase config file

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
}

const authDataSource = new AuthDataSource();

export { AuthDataSource, authDataSource, EmailCredentials };