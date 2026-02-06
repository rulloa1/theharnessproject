/**
 * HARNESS Project - JavaScript Validation Script
 * Checks for common issues in JavaScript files
 */

const fs = require('fs');
const path = require('path');

const JS_DIR = path.join(__dirname, '..', 'js');
const issues = [];

// Files to validate
const jsFiles = fs.readdirSync(JS_DIR).filter(f => f.endsWith('.js'));

console.log('🔍 Validating JavaScript files...\n');

jsFiles.forEach(file => {
    const filePath = path.join(JS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Check for common issues
    lines.forEach((line, idx) => {
        const lineNum = idx + 1;

        // Check for console.log statements (warn only)
        if (line.includes('console.log') || line.includes('console.error') || line.includes('console.warn')) {
            // Don't flag service worker or intentional logging
            if (!file.includes('service-worker')) {
                issues.push({
                    file,
                    line: lineNum,
                    severity: 'warn',
                    message: 'Console statement found (consider removing for production)'
                });
            }
        }

        // Check for merge conflict markers
        if (line.includes('<<<<<<<') || line.includes('>>>>>>>') || line.match(/^=======/)) {
            issues.push({
                file,
                line: lineNum,
                severity: 'error',
                message: 'Unresolved merge conflict marker'
            });
        }

        // Check for debugger statements
        if (line.includes('debugger')) {
            issues.push({
                file,
                line: lineNum,
                severity: 'error',
                message: 'Debugger statement found'
            });
        }
    });

    console.log(`  ✓ ${file}`);
});

console.log('\n' + '='.repeat(50));

// Report issues
const errors = issues.filter(i => i.severity === 'error');
const warnings = issues.filter(i => i.severity === 'warn');

if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(issue => {
        console.log(`   ${issue.file}:${issue.line} - ${issue.message}`);
    });
}

if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length} console statements found)`);
    console.log('   Consider implementing a production logging wrapper');
}

if (errors.length === 0) {
    console.log('\n✅ JavaScript validation passed!');
    process.exit(0);
} else {
    console.log(`\n❌ Validation failed with ${errors.length} error(s)`);
    process.exit(1);
}
