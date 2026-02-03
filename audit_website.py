#!/usr/bin/env python3
"""
Comprehensive website audit script
Identifies various issues across the website
"""
import re
import os
from pathlib import Path
from collections import defaultdict

class WebsiteAuditor:
    def __init__(self, project_root):
        self.project_root = Path(project_root)
        self.issues = defaultdict(list)
        
    def audit_html_files(self):
        """Audit all HTML files for common issues"""
        html_files = list(self.project_root.glob('*.html'))
        
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                filename = html_file.name
                
                # Check for broken image references
                self.check_broken_images(filename, content)
                
                # Check for missing alt attributes
                self.check_missing_alt_tags(filename, content)
                
                # Check for inline styles
                self.check_inline_styles(filename, content)
                
                # Check for missing meta tags
                self.check_meta_tags(filename, content)
                
                # Check for accessibility issues
                self.check_accessibility(filename, content)
                
                # Check for duplicate IDs
                self.check_duplicate_ids(filename, content)
                
                # Check for empty links
                self.check_empty_links(filename, content)
    
    def check_broken_images(self, filename, content):
        """Check for potentially broken image references"""
        # Find all img src attributes
        img_pattern = r'<img[^>]*src="([^"]*)"'
        matches = re.findall(img_pattern, content, re.IGNORECASE)
        
        for src in matches:
            # Check if it's a data URI (base64 encoded)
            if src.startswith('data:image'):
                continue
            # Check if it's an external URL
            if src.startswith('http://') or src.startswith('https://'):
                continue
            # Check if local file exists
            img_path = self.project_root / src
            if not img_path.exists():
                self.issues['broken_images'].append({
                    'file': filename,
                    'src': src
                })
    
    def check_missing_alt_tags(self, filename, content):
        """Check for images without alt attributes"""
        # Find img tags without alt or with empty alt
        img_no_alt = r'<img(?![^>]*alt=)[^>]*>'
        matches = re.findall(img_no_alt, content, re.IGNORECASE)
        
        if matches:
            self.issues['missing_alt'].append({
                'file': filename,
                'count': len(matches)
            })
    
    def check_inline_styles(self, filename, content):
        """Check for excessive inline styles"""
        style_pattern = r'style="[^"]*"'
        matches = re.findall(style_pattern, content, re.IGNORECASE)
        
        if len(matches) > 10:  # Threshold for "excessive"
            self.issues['inline_styles'].append({
                'file': filename,
                'count': len(matches)
            })
    
    def check_meta_tags(self, filename, content):
        """Check for missing important meta tags"""
        required_meta = ['description', 'viewport']
        
        for meta in required_meta:
            if f'name="{meta}"' not in content and f"name='{meta}'" not in content:
                self.issues['missing_meta'].append({
                    'file': filename,
                    'meta': meta
                })
    
    def check_accessibility(self, filename, content):
        """Check for basic accessibility issues"""
        # Check for buttons without aria-label
        button_pattern = r'<button(?![^>]*aria-label)[^>]*>[^<]*</button>'
        matches = re.findall(button_pattern, content, re.IGNORECASE)
        
        if matches:
            self.issues['accessibility'].append({
                'file': filename,
                'issue': 'buttons_without_aria_label',
                'count': len(matches)
            })
    
    def check_duplicate_ids(self, filename, content):
        """Check for duplicate ID attributes"""
        id_pattern = r'id="([^"]*)"'
        ids = re.findall(id_pattern, content, re.IGNORECASE)
        
        seen = set()
        duplicates = set()
        for id_val in ids:
            if id_val in seen:
                duplicates.add(id_val)
            seen.add(id_val)
        
        if duplicates:
            self.issues['duplicate_ids'].append({
                'file': filename,
                'ids': list(duplicates)
            })
    
    def check_empty_links(self, filename, content):
        """Check for empty or broken links"""
        # Find links with empty href or href="#"
        empty_link_pattern = r'<a[^>]*href="(#?)"[^>]*>.*?</a>'
        matches = re.findall(empty_link_pattern, content, re.IGNORECASE)
        
        if matches:
            self.issues['empty_links'].append({
                'file': filename,
                'count': len(matches)
            })
    
    def check_css_files(self):
        """Audit CSS files for issues"""
        css_files = list(self.project_root.glob('**/*.css'))
        
        for css_file in css_files:
            with open(css_file, 'r', encoding='utf-8') as f:
                content = f.read()
                filename = str(css_file.relative_to(self.project_root))
                
                # Check for !important overuse
                important_count = content.count('!important')
                if important_count > 50:  # Threshold
                    self.issues['css_important_overuse'].append({
                        'file': filename,
                        'count': important_count
                    })
    
    def generate_report(self):
        """Generate a comprehensive report"""
        report = []
        report.append("=" * 70)
        report.append("WEBSITE AUDIT REPORT")
        report.append("=" * 70)
        report.append("")
        
        total_issues = sum(len(v) for v in self.issues.values())
        
        if total_issues == 0:
            report.append("✅ No major issues found!")
            return "\n".join(report)
        
        report.append(f"Total Issues Found: {total_issues}")
        report.append("")
        
        # Broken Images
        if 'broken_images' in self.issues:
            report.append(f"🔴 BROKEN IMAGE REFERENCES ({len(self.issues['broken_images'])})")
            report.append("-" * 70)
            for issue in self.issues['broken_images'][:10]:  # Show first 10
                report.append(f"  File: {issue['file']}")
                report.append(f"  Src: {issue['src']}")
                report.append("")
            if len(self.issues['broken_images']) > 10:
                report.append(f"  ... and {len(self.issues['broken_images']) - 10} more")
            report.append("")
        
        # Missing Alt Tags
        if 'missing_alt' in self.issues:
            report.append(f"🟡 MISSING ALT ATTRIBUTES ({len(self.issues['missing_alt'])})")
            report.append("-" * 70)
            for issue in self.issues['missing_alt']:
                report.append(f"  File: {issue['file']} - {issue['count']} images without alt")
            report.append("")
        
        # Inline Styles
        if 'inline_styles' in self.issues:
            report.append(f"🟡 EXCESSIVE INLINE STYLES ({len(self.issues['inline_styles'])})")
            report.append("-" * 70)
            for issue in self.issues['inline_styles']:
                report.append(f"  File: {issue['file']} - {issue['count']} inline styles")
            report.append("")
        
        # Missing Meta Tags
        if 'missing_meta' in self.issues:
            report.append(f"🟡 MISSING META TAGS ({len(self.issues['missing_meta'])})")
            report.append("-" * 70)
            for issue in self.issues['missing_meta']:
                report.append(f"  File: {issue['file']} - Missing: {issue['meta']}")
            report.append("")
        
        # Accessibility Issues
        if 'accessibility' in self.issues:
            report.append(f"🟡 ACCESSIBILITY ISSUES ({len(self.issues['accessibility'])})")
            report.append("-" * 70)
            for issue in self.issues['accessibility']:
                report.append(f"  File: {issue['file']} - {issue['issue']}: {issue['count']}")
            report.append("")
        
        # Duplicate IDs
        if 'duplicate_ids' in self.issues:
            report.append(f"🔴 DUPLICATE IDS ({len(self.issues['duplicate_ids'])})")
            report.append("-" * 70)
            for issue in self.issues['duplicate_ids']:
                report.append(f"  File: {issue['file']}")
                report.append(f"  Duplicate IDs: {', '.join(issue['ids'])}")
                report.append("")
        
        # Empty Links
        if 'empty_links' in self.issues:
            report.append(f"🟡 EMPTY/PLACEHOLDER LINKS ({len(self.issues['empty_links'])})")
            report.append("-" * 70)
            for issue in self.issues['empty_links']:
                report.append(f"  File: {issue['file']} - {issue['count']} empty links")
            report.append("")
        
        # CSS Important Overuse
        if 'css_important_overuse' in self.issues:
            report.append(f"🟡 CSS !IMPORTANT OVERUSE ({len(self.issues['css_important_overuse'])})")
            report.append("-" * 70)
            for issue in self.issues['css_important_overuse']:
                report.append(f"  File: {issue['file']} - {issue['count']} uses")
            report.append("")
        
        report.append("=" * 70)
        
        return "\n".join(report)
    
    def run_audit(self):
        """Run the complete audit"""
        print("Running website audit...")
        print("Checking HTML files...")
        self.audit_html_files()
        print("Checking CSS files...")
        self.check_css_files()
        print("Generating report...\n")
        return self.generate_report()

def main():
    project_root = '/home/ubuntu/theharnessproject'
    auditor = WebsiteAuditor(project_root)
    report = auditor.run_audit()
    print(report)
    
    # Save report to file
    with open(f'{project_root}/AUDIT_REPORT.txt', 'w') as f:
        f.write(report)
    print("\n✅ Report saved to AUDIT_REPORT.txt")

if __name__ == '__main__':
    main()
