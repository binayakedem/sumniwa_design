"use client";

import FirebaseAuthStatus from './firebase-auth';

export default function AdminPanel() {
    return (
        <section style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '0.75rem' }}>
            <h2>Admin Controls</h2>
            <p>Only authenticated admin users should access this section.</p>
            <FirebaseAuthStatus />
            <div style={{ marginTop: '1rem' }}>
                <button type="button" style={{ marginRight: '1rem' }}>Manage Products</button>
                <button type="button">View Orders</button>
            </div>
        </section>
    );
}
