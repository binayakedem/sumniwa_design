import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin using service account provided via env var.
function initAdmin() {
    if (admin.apps.length) return admin;

    const svc = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!svc && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        throw new Error('Provide FIREBASE_SERVICE_ACCOUNT (base64 or json) or set GOOGLE_APPLICATION_CREDENTIALS');
    }

    let credential;
    if (svc) {
        try {
            // Try base64 decode first
            const parsed = JSON.parse(Buffer.from(svc, 'base64').toString('utf8'));
            credential = admin.credential.cert(parsed as any);
        } catch (e) {
            try {
                const parsed = JSON.parse(svc);
                credential = admin.credential.cert(parsed as any);
            } catch (e2) {
                // fallthrough to applicationDefault if available
                credential = admin.credential.applicationDefault();
            }
        }
    } else {
        credential = admin.credential.applicationDefault();
    }

    admin.initializeApp({
        credential,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    return admin;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, phone, address, paymentProof } = body ?? {};

        if (!phone || !address) {
            return NextResponse.json({ error: 'Phone and address required' }, { status: 400 });
        }

        if (!paymentProof) {
            return NextResponse.json({ error: 'Payment proof is required' }, { status: 400 });
        }

        const adminApp = initAdmin();
        const db = adminApp.firestore();
        const bucket = adminApp.storage().bucket();

        const orderId = `ord_${Date.now()}`;

        // upload payment proof (base64 data URL)
        const matches = String(paymentProof).match(/^data:(.+);base64,(.*)$/);
        let proofUrl: string | null = null;
        if (matches) {
            const contentType = matches[1];
            const data = matches[2];
            const buffer = Buffer.from(data, 'base64');
            const filePath = `orders/${orderId}/proof-${Date.now()}`;
            const file = bucket.file(filePath);
            await file.save(buffer, { metadata: { contentType } });
            // Make a signed URL valid long-term (adjust expiry as needed)
            const [signedUrl] = await file.getSignedUrl({ action: 'read', expires: '12-31-2491' });
            proofUrl = signedUrl;
        }

        const order = {
            id: orderId,
            items: Array.isArray(items) ? items : [],
            phone,
            address,
            paymentProofUrl: proofUrl,
            createdAt: new Date().toISOString(),
        };

        await db.collection('orders').doc(orderId).set(order);

        return NextResponse.json({ success: true, orderId });
    } catch (err: any) {
        console.error('Order save error', err?.message ?? err);
        return NextResponse.json({ error: 'Server error: ' + (err?.message ?? '') }, { status: 500 });
    }
}
