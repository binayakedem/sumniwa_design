import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const email = (body?.email ?? '').toString().trim();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        const dataDir = path.join(process.cwd(), 'data');
        await fs.mkdir(dataDir, { recursive: true });
        const filePath = path.join(dataDir, 'subscriptions.json');

        let list: string[] = [];
        try {
            const raw = await fs.readFile(filePath, 'utf8');
            list = JSON.parse(raw);
            if (!Array.isArray(list)) list = [];
        } catch (err) {
            list = [];
        }

        if (!list.includes(email)) {
            list.push(email);
            await fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf8');
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
