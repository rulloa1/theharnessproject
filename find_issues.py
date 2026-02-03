#!/usr/bin/env python3
"""
Find and categorize website issues
"""
import re
from pathlib import Path
from collections import defaultdict

def analyze_site():
    project_root = Path('/home/ubuntu/theharnessproject')
    issues = defaultdict(list)
    
    # Get all HTML files
    html_files = sorted(project_root.glob('*.html'))
    
    print(f"Analyzing {len(html_files)} HTML files...\n")
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            filename = html_file.name
            
            # 1. Check for broken external script references
            external_scripts = re.findall(r'<script[^>]*src="([^"]*\.js)"', content)
            for script in external_scripts:
                if not script.startswith('http'):
                    script_path = project_root / script
                    if not script_path.exists():
                        issues['missing_js_files'].append(f"{filename} → {script}")
            
            # 2. Check for broken external CSS references
            external_css = re.findall(r'<link[^>]*href="([^"]*\.css)"', content)
            for css in external_css:
                if not css.startswith('http'):
                    css_path = project_root / css
                    if not css_path.exists():
                        issues['missing_css_files'].append(f"{filename} → {css}")
            
            # 3. Check for broken image references (non-base64)
            img_refs = re.findall(r'<img[^>]*src="([^"]*)"', content)
            for img in img_refs:
                if not img.startswith('data:') and not img.startswith('http'):
                    img_path = project_root / img
                    if not img_path.exists():
                        issues['missing_images'].append(f"{filename} → {img}")
            
            # 4. Check for duplicate IDs
            ids = re.findall(r'\sid="([^"]+)"', content)
            seen_ids = set()
            for id_val in ids:
                if id_val in seen_ids:
                    issues['duplicate_ids'].append(f"{filename} → {id_val}")
                seen_ids.add(id_val)
            
            # 5. Check for empty href links
            empty_hrefs = len(re.findall(r'href=""', content))
            hash_only_hrefs = len(re.findall(r'href="#"[^>]*>[^<]+</a>', content))
            if empty_hrefs > 0:
                issues['empty_hrefs'].append(f"{filename} → {empty_hrefs} empty hrefs")
            if hash_only_hrefs > 3:  # Some hash links are OK for modals
                issues['placeholder_links'].append(f"{filename} → {hash_only_hrefs} hash-only links")
            
            # 6. Check for missing alt attributes on images
            imgs_without_alt = re.findall(r'<img(?![^>]*alt=)[^>]*>', content)
            if len(imgs_without_alt) > 0:
                issues['missing_alt_tags'].append(f"{filename} → {len(imgs_without_alt)} images")
            
            # 7. Check for console.log statements (should be removed in production)
            console_logs = len(re.findall(r'console\.log\(', content))
            if console_logs > 0:
                issues['console_logs'].append(f"{filename} → {console_logs} console.log statements")
            
            # 8. Check for TODO/FIXME comments
            todos = len(re.findall(r'(TODO|FIXME|XXX|HACK)', content, re.IGNORECASE))
            if todos > 0:
                issues['todo_comments'].append(f"{filename} → {todos} TODO/FIXME comments")
    
    # Print report
    print("="*70)
    print("WEBSITE ISSUES REPORT")
    print("="*70)
    print()
    
    total_issues = sum(len(v) for v in issues.values())
    
    if total_issues == 0:
        print("✅ No issues found!")
        return
    
    print(f"Total Issue Categories: {len(issues)}")
    print(f"Total Issues: {total_issues}")
    print()
    
    for category, items in sorted(issues.items()):
        print(f"\n🔴 {category.upper().replace('_', ' ')} ({len(items)})")
        print("-"*70)
        for item in items[:10]:  # Show first 10
            print(f"  {item}")
        if len(items) > 10:
            print(f"  ... and {len(items) - 10} more")
    
    print("\n" + "="*70)
    
    # Save to file
    with open(project_root / 'ISSUES_FOUND.txt', 'w') as f:
        f.write("WEBSITE ISSUES REPORT\n")
        f.write("="*70 + "\n\n")
        f.write(f"Total Issue Categories: {len(issues)}\n")
        f.write(f"Total Issues: {total_issues}\n\n")
        
        for category, items in sorted(issues.items()):
            f.write(f"\n{category.upper().replace('_', ' ')} ({len(items)})\n")
            f.write("-"*70 + "\n")
            for item in items:
                f.write(f"  {item}\n")
    
    print("\n✅ Report saved to ISSUES_FOUND.txt")

if __name__ == '__main__':
    analyze_site()
