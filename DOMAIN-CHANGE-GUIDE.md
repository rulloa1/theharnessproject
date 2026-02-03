# 🌐 DOMAIN CHANGE GUIDE - www.theharnessproject.org

**Current Domain**: harnessproject.com  
**New Domain**: www.theharnessproject.org  
**Date**: January 25, 2026

---

## 📋 OVERVIEW

Changing your domain from `harnessproject.com` to `www.theharnessproject.org` requires updates in multiple places to ensure all links, metadata, and functionality work correctly.

---

## 🔍 FILES THAT NEED UPDATING

### **Critical Files** (Must Update)

1. **sitemap.xml** - All URL references
2. **manifest.json** - PWA configuration
3. **robots.txt** - Sitemap URL
4. **All HTML files with canonical URLs** (~100 files)
5. **All HTML files with Open Graph URLs** (~100 files)
6. **js/seo-optimizer.js** - If it has domain references

---

## 🛠️ METHOD 1: FIND & REPLACE (Recommended)

### **Step 1: Create a Backup**

```bash
# Create a backup of your entire project first!
cp -r /path/to/harness-project /path/to/harness-project-backup
```

### **Step 2: Find All Occurrences**

```bash
# Search for all instances of the old domain
grep -r "harnessproject.com" . --exclude-dir=node_modules --exclude-dir=.git
```

### **Step 3: Replace Domain (Using sed)**

```bash
# For macOS:
find . -type f -name "*.html" -exec sed -i '' 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.xml" -exec sed -i '' 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.json" -exec sed -i '' 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.txt" -exec sed -i '' 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.js" -exec sed -i '' 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.md" -exec sed -i '' 's/harnessproject\.com/theharnessproject.org/g' {} +

# For Linux:
find . -type f -name "*.html" -exec sed -i 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.xml" -exec sed -i 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.json" -exec sed -i 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.txt" -exec sed -i 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.js" -exec sed -i 's/harnessproject\.com/theharnessproject.org/g' {} +
find . -type f -name "*.md" -exec sed -i 's/harnessproject\.com/theharnessproject.org/g' {} +
```

---

## 🛠️ METHOD 2: PYTHON SCRIPT (Automated)

### **Create Domain Change Script**

```python
#!/usr/bin/env python3
"""
Domain Change Script
Changes harnessproject.com to www.theharnessproject.org
"""

import os
import re
from pathlib import Path

OLD_DOMAIN = "harnessproject.com"
NEW_DOMAIN = "www.theharnessproject.org"

# File extensions to process
EXTENSIONS = ['.html', '.xml', '.json', '.txt', '.js', '.md', '.css']

def should_process(filepath):
    """Check if file should be processed"""
    # Skip these directories
    skip_dirs = ['node_modules', '.git', '__pycache__', 'venv']
    
    for skip in skip_dirs:
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
        
        # Replace all occurrences
        new_content = content.replace(OLD_DOMAIN, NEW_DOMAIN)
        
        # Also handle variations
        new_content = new_content.replace(
            f"https://{OLD_DOMAIN}",
            f"https://{NEW_DOMAIN}"
        )
        new_content = new_content.replace(
            f"http://{OLD_DOMAIN}",
            f"https://{NEW_DOMAIN}"
        )
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Updated: {filepath}")
        return True
    
    except Exception as e:
        print(f"✗ Error updating {filepath}: {e}")
        return False

def main():
    """Main domain change process"""
    print("=" * 70)
    print("DOMAIN CHANGE SCRIPT")
    print(f"Changing: {OLD_DOMAIN} → {NEW_DOMAIN}")
    print("=" * 70)
    print()
    
    # Find all files
    files_to_process = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            filepath = Path(root) / file
            if should_process(filepath):
                files_to_process.append(filepath)
    
    print(f"Found {len(files_to_process)} files to process\n")
    
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
    print(f"Files processed: {len(files_to_process)}")
    print(f"Files updated:   {updated_count}")
    print(f"Files skipped:   {len(files_to_process) - updated_count}")
    print()
    print(f"✓ All references changed from {OLD_DOMAIN} to {NEW_DOMAIN}")
    print()

if __name__ == '__main__':
    main()
```

Save as `change-domain.py` and run:

```bash
python3 change-domain.py
```

---

## 🔍 SPECIFIC FILES TO CHECK

### **1. sitemap.xml**
```xml
<!-- OLD -->
<loc>https://harnessproject.com/</loc>

<!-- NEW -->
<loc>https://www.theharnessproject.org/</loc>
```

### **2. manifest.json**
```json
{
  "start_url": "https://www.theharnessproject.org/",
  "scope": "https://www.theharnessproject.org/",
  "id": "https://www.theharnessproject.org/"
}
```

### **3. robots.txt**
```txt
Sitemap: https://www.theharnessproject.org/sitemap.xml
```

### **4. HTML Files - Canonical URLs**
```html
<!-- OLD -->
<link rel="canonical" href="https://harnessproject.com/index.html">

<!-- NEW -->
<link rel="canonical" href="https://www.theharnessproject.org/index.html">
```

### **5. HTML Files - Open Graph**
```html
<!-- OLD -->
<meta property="og:url" content="https://harnessproject.com/">

<!-- NEW -->
<meta property="og:url" content="https://www.theharnessproject.org/">
```

### **6. HTML Files - Images**
```html
<!-- OLD -->
<meta property="og:image" content="https://harnessproject.com/images/logo.png">

<!-- NEW -->
<meta property="og:image" content="https://www.theharnessproject.org/images/logo.png">
```

---

## ✅ VERIFICATION CHECKLIST

After making changes, verify:

- [ ] sitemap.xml has new domain
- [ ] robots.txt references new sitemap URL
- [ ] manifest.json has new start_url
- [ ] All canonical URLs updated
- [ ] All Open Graph URLs updated
- [ ] All Twitter card URLs updated
- [ ] README.md references updated
- [ ] Documentation files updated
- [ ] No broken links remain

### **Verification Commands**

```bash
# Check if old domain still exists
grep -r "harnessproject\.com" . --exclude-dir=node_modules --exclude-dir=.git

# Should return: no results (or only in backups/docs)

# Count occurrences of new domain
grep -r "theharnessproject\.org" . --exclude-dir=node_modules | wc -l

# Should show many results
```

---

## 🌐 DNS & HOSTING SETUP

### **After File Updates, You Need To**:

1. **Register the Domain**
   - Register `theharnessproject.org` with a domain registrar
   - Add `www` subdomain

2. **DNS Configuration**
   - Point `theharnessproject.org` to your hosting
   - Point `www.theharnessproject.org` to your hosting
   - Or use CNAME: `www` → `theharnessproject.org`

3. **SSL Certificate**
   - Obtain SSL certificate for:
     - `theharnessproject.org`
     - `www.theharnessproject.org`
   - Most hosts (Netlify, Vercel, GitHub Pages) do this automatically

4. **Redirect Old Domain** (Optional)
   - Set up 301 redirects from `harnessproject.com` to `www.theharnessproject.org`
   - This preserves SEO and existing links

---

## 🔄 301 REDIRECT SETUP

### **If Using .htaccess (Apache)**

Create or update `.htaccess`:

```apache
# Redirect old domain to new domain
RewriteEngine On
RewriteCond %{HTTP_HOST} ^harnessproject\.com$ [OR]
RewriteCond %{HTTP_HOST} ^www\.harnessproject\.com$
RewriteRule ^(.*)$ https://www.theharnessproject.org/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

### **If Using Netlify**

Create `_redirects` file:

```
# Redirect old domain
https://harnessproject.com/* https://www.theharnessproject.org/:splat 301!
https://www.harnessproject.com/* https://www.theharnessproject.org/:splat 301!
```

### **If Using Vercel**

Add to `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://www.theharnessproject.org/$1",
      "permanent": true,
      "has": [
        {
          "type": "host",
          "value": "harnessproject.com"
        }
      ]
    }
  ]
}
```

---

## 📊 TESTING AFTER DEPLOYMENT

### **1. Basic Functionality**
- [ ] Homepage loads at www.theharnessproject.org
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] No 404 errors

### **2. SEO Verification**
```bash
# Check canonical URLs
curl -s https://www.theharnessproject.org/ | grep canonical

# Check Open Graph
curl -s https://www.theharnessproject.org/ | grep "og:url"

# Check sitemap
curl -s https://www.theharnessproject.org/sitemap.xml | head -20
```

### **3. Social Media Preview**
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### **4. SSL Certificate**
```bash
# Verify SSL works
curl -I https://www.theharnessproject.org/

# Should show: HTTP/2 200
# Should NOT show certificate errors
```

---

## 📝 UPDATE EXTERNAL SERVICES

After domain change, update:

1. **Google Search Console**
   - Add new property for www.theharnessproject.org
   - Submit new sitemap
   - Set up domain forwarding from old domain

2. **Google Analytics**
   - Update property settings with new domain
   - Set up cross-domain tracking if needed

3. **Social Media Profiles**
   - Update website URL on Facebook, Twitter, LinkedIn
   - Update bio links
   - Update cover images if they show domain

4. **Email Signatures**
   - Update any email signatures with website URL

5. **Business Cards / Marketing Materials**
   - Update printed materials at next reprint

---

## 🚨 COMMON ISSUES

### **Issue 1: Mixed Content Warnings**
```
Problem: Some resources load from old domain
Solution: Run domain change script again, check for hardcoded URLs
```

### **Issue 2: Broken Images**
```
Problem: Images not loading
Solution: Check image src URLs in HTML files
```

### **Issue 3: SSL Not Working**
```
Problem: Certificate errors
Solution: Verify DNS propagation, regenerate SSL cert
```

### **Issue 4: Sitemap Not Found**
```
Problem: /sitemap.xml returns 404
Solution: Verify file exists and robots.txt points to correct URL
```

---

## ✅ FINAL CHECKLIST

**Before Deployment**:
- [ ] Backup entire project
- [ ] Run domain change script
- [ ] Verify all files updated
- [ ] Test locally if possible
- [ ] Check no old domain references remain

**After Deployment**:
- [ ] Verify new domain loads
- [ ] Check SSL certificate
- [ ] Test 5-10 random pages
- [ ] Verify sitemap accessible
- [ ] Check robots.txt
- [ ] Submit new sitemap to Google
- [ ] Update social media links
- [ ] Set up 301 redirects from old domain

**Within 1 Week**:
- [ ] Monitor analytics for traffic
- [ ] Check for 404 errors
- [ ] Verify search engine indexing
- [ ] Update any external backlinks
- [ ] Monitor SSL certificate status

---

## 📞 QUICK COMMAND SUMMARY

```bash
# 1. Find all old domain references
grep -r "harnessproject\.com" . | wc -l

# 2. Run domain change script
python3 change-domain.py

# 3. Verify no old references remain
grep -r "harnessproject\.com" . --exclude-dir=backups

# 4. Verify new domain present
grep -r "theharnessproject\.org" . | wc -l

# 5. Deploy to production
# Use Publish tab or your deployment method
```

---

**Status**: 📋 **GUIDE COMPLETE**  
**Next**: Run domain change script and deploy  
**Estimated Time**: 15-30 minutes for file updates

---

**HARNESS Project**  
*Fearless. Protected. Empowered.*

**New Domain**: www.theharnessproject.org 🌐
