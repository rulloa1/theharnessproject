/**
 * HARNESS Project - Build Check Script
 * Validates project structure and critical files before deployment
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const warnings = [];

console.log('🏗️  HARNESS Build Check\n');
console.log('='.repeat(50));

// Critical files that must exist
const CRITICAL_FILES = [
    'index.html',
    'app.html',
    'manifest.json',
    'service-worker.js',
    'offline.html',
    'js/harness-global.js',
    'css/global.css'
];

// Check critical files
console.log('\n📁 Checking critical files...');
CRITICAL_FILES.forEach(file => {
    const filePath = path.join(ROOT, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  ✓ ${file} (${sizeKB} KB)`);
    } else {
        errors.push(`Missing critical file: ${file}`);
        console.log(`  ❌ ${file} - MISSING`);
    }
});

// Check for merge conflicts in HTML files
console.log('\n🔍 Checking for merge conflicts...');
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
    if (content.includes('<<<<<<<') || content.includes('>>>>>>>')) {
        errors.push(`Merge conflict in: ${file}`);
        console.log(`  ❌ ${file} - HAS MERGE CONFLICTS`);
    }
});

// Check service worker precache list
console.log('\n📦 Validating service worker precache list...');
try {
    const swContent = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');
    const precacheMatch = swContent.match(/PRECACHE_ASSETS\s*=\s*\[([\s\S]*?)\]/);
    if (precacheMatch) {
        const assets = precacheMatch[1].match(/'[^']+'/g) || [];
        assets.forEach(asset => {
            const assetPath = asset.replace(/'/g, '').replace(/^\//, '');
            if (assetPath && assetPath !== '/') {
                const fullPath = path.join(ROOT, assetPath);
                if (!fs.existsSync(fullPath)) {
                    warnings.push(`Service worker precache references missing file: ${assetPath}`);
                }
            }
        });
    }
    console.log(`  ✓ Service worker validated`);
} catch (e) {
    warnings.push('Could not validate service worker');
}

// Check manifest.json
console.log('\n📱 Validating PWA manifest...');
try {
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
    if (!manifest.name) warnings.push('Manifest missing: name');
    if (!manifest.short_name) warnings.push('Manifest missing: short_name');
    if (!manifest.start_url) warnings.push('Manifest missing: start_url');
    if (!manifest.icons || manifest.icons.length === 0) warnings.push('Manifest missing: icons');
    console.log(`  ✓ Manifest validated`);
} catch (e) {
    errors.push('Invalid or missing manifest.json');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 BUILD CHECK SUMMARY\n');

if (errors.length > 0) {
    console.log('❌ ERRORS:');
    errors.forEach(e => console.log(`   • ${e}`));
}

if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log(`   • ${w}`));
}

if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All checks passed!');
}

console.log(`\n📈 Total: ${errors.length} errors, ${warnings.length} warnings`);

if (errors.length > 0) {
    console.log('\n❌ Build check FAILED');
    process.exit(1);
} else {
    console.log('\n✅ Build check PASSED');
    process.exit(0);
}
