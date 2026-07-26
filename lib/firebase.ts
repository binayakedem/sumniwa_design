import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '';
const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? '';
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
    databaseURL: databaseUrl,
};

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

function isValidDatabaseUrl(url: string) {
    // Accept both legacy `firebaseio.com` domains and the newer
    // regional `firebasedatabase.app` domains (with optional subdomains).
    return /^https:\/\/[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.(?:firebaseio\.com|firebasedatabase\.app)(?:\/.*)?$/.test(url);
}

export const db: Database | null = isValidDatabaseUrl(databaseUrl) ? getDatabase(firebaseApp) : null;
