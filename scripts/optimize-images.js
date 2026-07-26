const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const dir = path.dirname(filePath);
    const base = path.basename(filePath);

    const backupDir = path.join(dir, 'backups');
    await fs.mkdir(backupDir, { recursive: true });
    const backupPath = path.join(backupDir, `${Date.now()}-${base}`);
    await fs.copyFile(filePath, backupPath);

    const img = sharp(filePath);
    const metadata = await img.metadata();

    // Resize if width > 1200
    const operations = img.clone();
    if (metadata.width && metadata.width > 1200) {
        operations.resize(1200);
    }

    if (ext === '.jpg' || ext === '.jpeg') {
        await operations.jpeg({ quality: 75, mozjpeg: true }).toFile(filePath + '.tmp');
    } else if (ext === '.png') {
        // Re-encode with high compression
        await operations.png({ compressionLevel: 9 }).toFile(filePath + '.tmp');
    } else if (ext === '.webp') {
        await operations.webp({ quality: 75 }).toFile(filePath + '.tmp');
    } else {
        // unsupported format, skip
        return { file: filePath, skipped: true };
    }

    // Replace original
    await fs.rename(filePath + '.tmp', filePath);

    const before = (await fs.stat(backupPath)).size;
    const after = (await fs.stat(filePath)).size;
    return { file: filePath, before, after };
}

async function run() {
    const imgDir = path.join(process.cwd(), 'app', 'img');
    const files = await fs.readdir(imgDir);
    const imgs = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    const results = [];
    for (const f of imgs) {
        try {
            const res = await optimizeImage(path.join(imgDir, f));
            results.push(res);
            console.log('Optimized', f, res.skipped ? '(skipped)' : `: ${res.before} -> ${res.after}`);
        } catch (err) {
            console.error('Error optimizing', f, err.message || err);
        }
    }

    console.log('Done. Backups stored in app/img/backups');
}

run().catch((e) => { console.error(e); process.exit(1); });
