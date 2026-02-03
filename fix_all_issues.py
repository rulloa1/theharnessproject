#!/usr/bin/env python3
"""
Fix all identified website issues
"""
import re
from pathlib import Path

def fix_html_file(filepath):
    """Fix issues in a single HTML file"""
    print(f"Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    changes = []
    
    # 1. Remove broken external script references (they're embedded inline)
    # Keep only the actual inline scripts
    script_src_pattern = r'<script src="js/[^"]*"[^>]*></script>\s*\n?'
    removed_scripts = len(re.findall(script_src_pattern, content))
    if removed_scripts > 0:
        content = re.sub(script_src_pattern, '', content)
        changes.append(f"Removed {removed_scripts} broken script references")
    
    # 2. Remove console.log statements
    console_pattern = r'console\.log\([^)]*\);?\s*\n?'
    removed_logs = len(re.findall(console_pattern, content))
    if removed_logs > 0:
        content = re.sub(console_pattern, '// console.log removed\n', content)
        changes.append(f"Removed {removed_logs} console.log statements")
    
    # 3. Fix images without alt attributes
    # Add alt="" to images that don't have alt
    img_no_alt_pattern = r'<img((?![^>]*alt=)[^>]*)>'
    def add_alt(match):
        return f'<img{match.group(1)} alt="">'
    
    fixed_alts = len(re.findall(img_no_alt_pattern, content))
    if fixed_alts > 0:
        content = re.sub(img_no_alt_pattern, add_alt, content)
        changes.append(f"Added alt attributes to {fixed_alts} images")
    
    # 4. Fix empty href attributes
    content = re.sub(r'href=""', 'href="#"', content)
    
    # 5. Remove TODO/FIXME comments that are just noise
    # Keep them but make them less obtrusive
    # content = re.sub(r'//\s*(TODO|FIXME|XXX|HACK):', r'// Note:', content, flags=re.IGNORECASE)
    
    # Write back if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Fixed: {', '.join(changes)}")
        return True
    else:
        print(f"  - No changes needed")
        return False

def create_missing_directories():
    """Create missing directories"""
    project_root = Path('/home/ubuntu/theharnessproject')
    
    # Create js directory (even though scripts are inline, for future use)
    js_dir = project_root / 'js'
    if not js_dir.exists():
        js_dir.mkdir()
        print("✓ Created js/ directory")
    
    # Create images directory if missing
    images_dir = project_root / 'images'
    if not images_dir.exists():
        images_dir.mkdir()
        print("✓ Created images/ directory")
        
        # Create a placeholder README
        with open(images_dir / 'README.md', 'w') as f:
            f.write("# Images Directory\n\nPlace all website images here.\n")

def main():
    """Run all fixes"""
    project_root = Path('/home/ubuntu/theharnessproject')
    
    print("="*70)
    print("FIXING WEBSITE ISSUES")
    print("="*70)
    print()
    
    # Create missing directories
    print("Creating missing directories...")
    create_missing_directories()
    print()
    
    # Fix HTML files
    print("Fixing HTML files...")
    html_files = sorted(project_root.glob('*.html'))
    
    fixed_count = 0
    for html_file in html_files:
        if fix_html_file(html_file):
            fixed_count += 1
    
    print()
    print("="*70)
    print(f"COMPLETE! Fixed {fixed_count} out of {len(html_files)} files")
    print("="*70)

if __name__ == '__main__':
    main()
