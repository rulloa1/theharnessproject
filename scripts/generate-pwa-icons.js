/**
 * HARNESS Project - PWA Icon Generator
 * Generates all required PWA icon sizes from source image
 *
 * Requirements:
 *   - Node.js installed
 *   - sharp package: npm install sharp
 *
 * Usage:
 *   node scripts/generate-pwa-icons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.error('❌ Error: sharp package not found');
    console.error('   Install it with: npm install sharp');
    console.error('   Or use an online PNG resizer to manually create icons');
    process.exit(1);
}

// Configuration
const SOURCE_IMAGE = path.join(__dirname, '..', 'images', 'harness.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'icons');

// Icon sizes required by manifest.json
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('✓ Created icons directory');
}

// Check if source image exists
if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error(`❌ Source image not found: ${SOURCE_IMAGE}`);
    process.exit(1);
}

console.log('🎨 Generating PWA icons from harness.png...\n');

// Generate each icon size
async function generateIcons() {
    for (const size of ICON_SIZES) {
        const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);

        try {
            await sharp(SOURCE_IMAGE)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .png()
                .toFile(outputPath);

            console.log(`  ✓ Generated icon-${size}x${size}.png`);
        } catch (error) {
            console.error(`  ❌ Failed to generate ${size}x${size}:`, error.message);
        }
    }

    console.log('\n✅ Icon generation complete!');
    console.log(`   ${ICON_SIZES.length} icons created in /icons/ directory`);
}

generateIcons().catch(error => {
    console.error('❌ Icon generation failed:', error);
    process.exit(1);
});
