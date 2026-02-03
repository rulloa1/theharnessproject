#!/usr/bin/env python3
"""
HARNESS PROJECT - DOMAIN CHANGE SCRIPT
Changes harnessproject.com to www.theharnessproject.org
Created: January 25, 2026

Usage: python3 change-domain.py
"""

import os
import re
from pathlib import Path

OLD_DOMAIN = "harnessproject.com"
NEW_DOMAIN = "www.theharnessproject.org"

# File extensions to process
EXTENSIONS = ['.html', '.xml', '.json', '.txt', '.js', '.md', '.css']

# Directories to skip
SKIP_DIRS = ['node_modules', '.git', '__pycache__', 'venv', 'env', '.next']

def should_process(filepath):
    """Check if file should be processed"""
    # Skip directories
    for skip in SKIP_DIRS:
        if skip in str(filepath):
            return False
    
    # Check extension
    return filepath.suffix in EXTENSIONS

def replace_domain_in_file(filepath):
    """Replace old domain with new domain in file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file contains old domain
        if OLD_DOMAIN not in content:
            return False
        
        original_content = content
        
        # Replace all variations
        replacements = [
            # Basic domain
            (OLD_DOMAIN, NEW_DOMAIN),
            
            # HTTPS variations
            (f"https://{OLD_DOMAIN}", f"https://{NEW_DOMAIN}"),
            (f"https://www.{OLD_DOMAIN}", f"https://{NEW_DOMAIN}"),
            
            # HTTP variations (also upgrade to HTTPS)
            (f"http://{OLD_DOMAIN}", f"https://{NEW_DOMAIN}"),
            (f"http://www.{OLD_DOMAIN}", f"https://{NEW_DOMAIN}"),
            
            # Protocol-relative variations
            (f"//{OLD_DOMAIN}", f"//{NEW_DOMAIN}"),
            (f"//www.{OLD_DOMAIN}", f"//{NEW_DOMAIN}"),
        ]
        
        for old, new in replacements:
            content = content.replace(old, new)
        
        # Only write if content changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # Count changes
            changes = original_content.count(OLD_DOMAIN)
            print(f"✓ {filepath} ({changes} change(s))")
            return True
        
        return False
    
    except Exception as e:
        print(f"✗ Error: {filepath} - {e}")
        return False

def main():
    """Main domain change process"""
    print("=" * 70)
    print("HARNESS PROJECT - DOMAIN CHANGE SCRIPT")
    print("=" * 70)
    print(f"Old Domain: {OLD_DOMAIN}")
    print(f"New Domain: {NEW_DOMAIN}")
    print("=" * 70)
    print()
    
    # Confirm action
    print("⚠️  WARNING: This will modify files in your project!")
    print("   Make sure you have a backup before proceeding.")
    print()
    response = input("Continue with domain change? (yes/no): ").strip().lower()
    
    if response != 'yes':
        print("\n❌ Domain change cancelled.")
        return
    
    print("\n🔍 Scanning for files to update...")
    print()
    
    # Find all files
    files_to_process = []
    for root, dirs, files in os.walk('.'):
        # Remove skip directories from dirs list
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        
        for file in files:
            filepath = Path(root) / file
            if should_process(filepath):
                files_to_process.append(filepath)
    
    print(f"Found {len(files_to_process)} files to scan\n")
    print("📝 Updating files...")
    print()
    
    # Process each file
    updated_count = 0
    for filepath in sorted(files_to_process):
        if replace_domain_in_file(filepath):
            updated_count += 1
    
    # Summary
    print()
    print("=" * 70)
    print("DOMAIN CHANGE COMPLETE")
    print("=" * 70)
    print(f"Files scanned:  {len(files_to_process)}")
    print(f"Files updated:  {updated_count}")
    print(f"Files skipped:  {len(files_to_process) - updated_count}")
    print()
    
    if updated_count > 0:
        print("✅ Domain successfully changed!")
        print()
        print("📋 Next Steps:")
        print("1. Verify changes by running:")
        print(f"   grep -r '{OLD_DOMAIN}' . --exclude-dir=node_modules")
        print("   (Should return no results or only in documentation)")
        print()
        print("2. Test your site locally if possible")
        print()
        print("3. Deploy to production when ready")
        print()
        print("4. Set up 301 redirects from old domain (see DOMAIN-CHANGE-GUIDE.md)")
        print()
        print("5. Update external services:")
        print("   - Google Search Console")
        print("   - Google Analytics")
        print("   - Social media profiles")
    else:
        print("ℹ️  No files needed updating.")
        print(f"   The domain '{OLD_DOMAIN}' was not found in any files.")
    
    print()

if __name__ == '__main__':
    main()
