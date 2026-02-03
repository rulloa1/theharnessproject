# 🌐 DOMAIN CHANGE - QUICK REFERENCE

**Old Domain**: harnessproject.com  
**New Domain**: www.theharnessproject.org

---

## ⚡ QUICK START (3 Steps)

### **Step 1: Backup** (1 minute)
```bash
# Make a backup copy of your project
cp -r /path/to/project /path/to/project-backup
```

### **Step 2: Run Script** (2 minutes)
```bash
# Run the domain change script
python3 change-domain.py

# When prompted, type: yes
```

### **Step 3: Verify** (2 minutes)
```bash
# Check if any old domain references remain
grep -r "harnessproject\.com" . --exclude-dir=node_modules

# Should show: no results (or only in backups)
```

**Total Time**: ~5 minutes

---

## 📂 WHAT GETS CHANGED

The script automatically updates:

✅ **All HTML files** (~100 files)
- Canonical URLs
- Open Graph URLs
- Twitter card URLs
- Image URLs

✅ **sitemap.xml**
- All page URLs

✅ **manifest.json**
- PWA start_url
- PWA scope

✅ **robots.txt**
- Sitemap URL

✅ **README.md & docs**
- Documentation references

✅ **JavaScript files**
- Any domain references

---

## 🔍 FILES CHANGED

```
Typical changes:
• sitemap.xml              (80+ URLs)
• manifest.json            (3 properties)
• robots.txt               (1 line)
• index.html               (5-10 references)
• app.html                 (5-10 references)
• All other HTML files     (3-8 references each)
• README.md                (varies)
```

---

## ✅ VERIFICATION CHECKLIST

After running script:

- [ ] Run verification command (no results = success)
- [ ] Check sitemap.xml has new domain
- [ ] Check manifest.json has new domain
- [ ] Check robots.txt has new sitemap URL
- [ ] Open 3 random HTML files - verify canonical URLs
- [ ] Open 3 random HTML files - verify og:url tags

---

## 🚀 DEPLOYMENT

### **After File Updates**:

1. **Test Locally** (if possible)
   - Open a few pages
   - Check console for errors
   - Verify no broken links

2. **Deploy to Production**
   - Use Publish tab
   - Or your normal deployment method

3. **DNS Setup** (if new domain)
   - Register theharnessproject.org
   - Point DNS to your hosting
   - Get SSL certificate (usually automatic)

4. **Set Up Redirects** (recommended)
   - 301 redirect from harnessproject.com
   - Preserves SEO and existing links

---

## 🆘 TROUBLESHOOTING

### **Script Won't Run**
```bash
# Check Python version
python3 --version  # Need 3.6+

# Make script executable
chmod +x change-domain.py

# Run with full path
python3 /full/path/to/change-domain.py
```

### **Old Domain Still Appears**
```bash
# Find where it still exists
grep -rn "harnessproject\.com" .

# Manually update those files
# Or run script again
```

### **Changes Didn't Work**
```bash
# Restore from backup
cp -r /path/to/project-backup/* /path/to/project/

# Check file permissions
ls -la change-domain.py

# Try again
python3 change-domain.py
```

---

## 📊 EXPECTED RESULTS

### **Before Script**
```
harnessproject.com found in:
• 100+ HTML files
• sitemap.xml
• manifest.json
• robots.txt
• README.md
Total: ~300-500 occurrences
```

### **After Script**
```
harnessproject.com found in:
• 0 files (or only in backups/docs)

www.theharnessproject.org found in:
• 100+ HTML files
• sitemap.xml
• manifest.json
• robots.txt
• README.md
Total: ~300-500 occurrences ✅
```

---

## 📞 COMMANDS SUMMARY

```bash
# 1. Backup
cp -r . ../harness-backup

# 2. Run script
python3 change-domain.py

# 3. Verify
grep -r "harnessproject\.com" . --exclude-dir=node_modules | wc -l
# Should show: 0 (or very few)

# 4. Count new domain
grep -r "theharnessproject\.org" . | wc -l
# Should show: 300-500+

# 5. Deploy
# Use Publish tab or git push
```

---

## 🎯 AFTER DEPLOYMENT

### **Immediate** (Same Day)
- [ ] Visit www.theharnessproject.org
- [ ] Verify site loads correctly
- [ ] Check SSL certificate (green padlock)
- [ ] Test 5-10 random pages
- [ ] Check sitemap: /sitemap.xml

### **Within 1 Week**
- [ ] Submit new sitemap to Google Search Console
- [ ] Update social media profile links
- [ ] Update email signatures
- [ ] Set up 301 redirects from old domain
- [ ] Monitor analytics for any issues

---

## 🌐 DNS & SSL

### **If Domain Already Registered**
```
1. Point A record to hosting IP
2. Add www CNAME to root domain
3. SSL auto-generates (most hosts)
4. Wait 5-30 minutes for propagation
```

### **If New Domain**
```
1. Register theharnessproject.org
2. Configure DNS as above
3. Wait for propagation (up to 48 hours)
4. Deploy files once DNS works
```

---

## ✅ SUCCESS CRITERIA

**Script Complete When**:
- ✅ No errors during execution
- ✅ Shows "X files updated"
- ✅ Verification finds 0 old domain references
- ✅ Manual spot-check shows new domain

**Deployment Complete When**:
- ✅ www.theharnessproject.org loads
- ✅ SSL certificate active (HTTPS works)
- ✅ All pages accessible
- ✅ No 404 errors
- ✅ Images load correctly

---

## 📖 FULL DOCUMENTATION

See `DOMAIN-CHANGE-GUIDE.md` for:
- Detailed explanations
- 301 redirect setup
- External services to update
- Advanced troubleshooting
- SEO considerations

---

**Status**: 📋 **READY TO USE**  
**Estimated Time**: 5 minutes  
**Risk**: Low (with backup)

---

**Command to Start**:
```bash
python3 change-domain.py
```

---

**HARNESS Project**  
*Fearless. Protected. Empowered.*

**New Domain**: www.theharnessproject.org 🌐
