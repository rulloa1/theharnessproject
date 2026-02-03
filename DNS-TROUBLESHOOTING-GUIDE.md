# DNS Troubleshooting Guide - www.theharnessproject.org

**Issue**: Custom domain not showing up  
**Date**: January 31, 2026  
**Deployment URL (Working)**: https://luplpvug.gensparkspace.com/  
**Custom Domain (Not Working)**: www.theharnessproject.org

---

## 🔍 DIAGNOSTIC STEPS

### Step 1: Check DNS Propagation Status

**Run these commands in Terminal/Command Prompt:**

#### On Mac/Linux:
```bash
nslookup www.theharnessproject.org
nslookup theharnessproject.org
```

#### On Windows:
```bash
nslookup www.theharnessproject.org
nslookup theharnessproject.org
```

**What to look for:**
- If you see an IP address → DNS is propagating
- If you see "can't find" → DNS not configured or still propagating

---

### Step 2: Check Online DNS Checker

**Visit**: https://dnschecker.org

1. Enter: `www.theharnessproject.org`
2. Select: `CNAME` record type
3. Check results globally

**What you should see:**
- Target: `luplpvug.gensparkspace.com`
- Green checkmarks across multiple locations

---

## 🛠️ COMMON ISSUES & FIXES

### Issue 1: DNS Records Not Configured Yet

**Where to check**: IONOS or Cloudflare (whichever is your DNS provider)

#### If Using IONOS:
1. Log in to https://www.ionos.com
2. Go to **Domains** → Select `theharnessproject.org`
3. Click **DNS Settings**
4. Verify you have:

```
Type: CNAME
Host: www
Points to: luplpvug.gensparkspace.com
TTL: 3600 (or Automatic)
```

```
Type: CNAME
Host: @ (or leave blank for root)
Points to: luplpvug.gensparkspace.com
TTL: 3600 (or Automatic)
```

**OR** (if CNAME for root doesn't work):

```
Type: A Record
Host: @ (root domain)
Points to: [IP address of luplpvug.gensparkspace.com]
TTL: 3600
```

To find IP address:
```bash
ping luplpvug.gensparkspace.com
# or
nslookup luplpvug.gensparkspace.com
```

---

#### If Using Cloudflare:
1. Log in to https://dash.cloudflare.com
2. Select `theharnessproject.org`
3. Go to **DNS** → **Records**
4. Verify you have:

```
Type: CNAME
Name: www
Target: luplpvug.gensparkspace.com
Proxy status: DNS only (gray cloud ☁️)
TTL: Auto
```

```
Type: CNAME
Name: @ (root)
Target: luplpvug.gensparkspace.com
Proxy status: DNS only (gray cloud ☁️)
TTL: Auto
```

⚠️ **IMPORTANT**: Make sure Proxy is set to **DNS only** (gray cloud), NOT Proxied (orange cloud)

---

### Issue 2: Nameservers Not Pointed Correctly

**Check at IONOS** (Domain Registrar):
1. Go to **Domains** → `theharnessproject.org`
2. Click **Nameservers**
3. Check what's listed

**If using Cloudflare**, should show:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

**If using IONOS DNS**, should show:
```
ns1.ionos.com (or similar)
ns2.ionos.com (or similar)
```

⚠️ **Make sure you're only using ONE DNS provider** (either IONOS or Cloudflare, not both)

---

### Issue 3: DNS Propagation Still in Progress

**Timeline:**
- **0-2 hours**: Usually not working yet (normal)
- **2-6 hours**: Starting to work in some locations
- **6-24 hours**: Working in most locations
- **24-48 hours**: Fully propagated globally

**How long has it been since you configured DNS?**

If it's been less than 24 hours → **This is normal, keep waiting**

---

### Issue 4: SSL Certificate Issues

If the domain resolves but shows security warnings:

1. **Check Cloudflare SSL Settings** (if using Cloudflare):
   - Go to **SSL/TLS** → **Overview**
   - Set to: **Full** (not Flexible, not Full Strict)

2. **Wait for SSL Certificate**:
   - Cloudflare takes 15-30 minutes to provision SSL
   - Let's Encrypt certificates can take 1-2 hours

---

### Issue 5: Cloudflare Error 1014

**Error Message**: "CNAME Cross-User Banned"

**Solution**: Turn off Cloudflare Proxy
1. Cloudflare Dashboard → DNS → Records
2. Click on the orange cloud next to your CNAME records
3. Change to gray cloud (DNS only)
4. Save

---

## 📋 CONFIGURATION CHECKLIST

### Current Status (Check each):

- [ ] DNS records created (CNAME or A record)
- [ ] Nameservers pointing to correct DNS provider
- [ ] Using only ONE DNS provider (not both IONOS and Cloudflare)
- [ ] If Cloudflare: Proxy set to DNS only (gray cloud)
- [ ] Waited at least 2-4 hours since DNS change
- [ ] Deployment URL (luplpvug.gensparkspace.com) still works

---

## 🔧 RECOMMENDED SETUP

### Option A: Cloudflare DNS (Recommended)

**Why**: Free CDN, SSL, DDoS protection, faster globally

**Setup**:
1. **At Cloudflare** (DNS Settings):
   ```
   CNAME | www | luplpvug.gensparkspace.com | DNS only (gray)
   CNAME | @   | luplpvug.gensparkspace.com | DNS only (gray)
   ```

2. **At IONOS** (Nameservers):
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

3. **At Cloudflare** (SSL/TLS):
   - Set to: **Full**
   - Enable: **Always Use HTTPS**
   - Enable: **Automatic HTTPS Rewrites**

---

### Option B: IONOS DNS Only (Simpler)

**Why**: Simpler, fewer moving parts, good for beginners

**Setup**:
1. **At IONOS** (DNS Settings):
   ```
   CNAME | www | luplpvug.gensparkspace.com
   A Record | @ | [IP of luplpvug.gensparkspace.com]
   ```

2. **At IONOS** (Nameservers):
   ```
   Keep default IONOS nameservers
   ```

---

## 🆘 IMMEDIATE ACTION ITEMS

### What to do RIGHT NOW:

1. **Test deployment URL**:
   ```
   Visit: https://luplpvug.gensparkspace.com/
   ```
   ✅ If this works → DNS issue, not website issue
   ❌ If this doesn't work → Website/hosting issue

2. **Check your DNS records**:
   - Screenshot your DNS settings (IONOS or Cloudflare)
   - Verify CNAME/A records exist
   - Share screenshots if you need help

3. **Check your Nameservers**:
   - Where are nameservers pointing?
   - IONOS or Cloudflare?

4. **How long has it been?**:
   - When did you last change DNS settings?
   - If less than 4 hours → **wait**
   - If more than 48 hours → **DNS misconfigured**

---

## 🎯 NEXT STEPS

### Tell me:

1. **Does the deployment URL work?**
   - Test: https://luplpvug.gensparkspace.com/
   - YES or NO?

2. **Which DNS provider are you using?**
   - IONOS or Cloudflare?

3. **When did you configure DNS?**
   - Hours ago? Days ago? Just now?

4. **What happens when you visit www.theharnessproject.org?**
   - Error message?
   - Nothing (won't load)?
   - Shows something else?

5. **DNS Check Results**:
   - Run: `nslookup www.theharnessproject.org`
   - What does it say?

---

## 📞 SUPPORT RESOURCES

### If you need help:

**Cloudflare Support**:
- Community: https://community.cloudflare.com/
- Docs: https://developers.cloudflare.com/dns/

**IONOS Support**:
- Help: https://www.ionos.com/help
- Phone: Check your IONOS account for support number

**DNS Checker Tools**:
- https://dnschecker.org
- https://www.whatsmydns.net/
- https://mxtoolbox.com/

---

## ⏰ TYPICAL DNS PROPAGATION TIMELINE

```
0-15 min:   DNS records saved in provider
15-30 min:  Some DNS servers start seeing it
30-60 min:  Your ISP might see it
1-2 hours:  Local region propagated
2-6 hours:  Most of your country
6-24 hours: Most of the world
24-48 hours: 100% global propagation
```

**Current Time**: Note when you made DNS changes, then calculate expected completion time.

---

## ✅ VERIFICATION COMMANDS

Once DNS propagates, these should work:

```bash
# Should show IP or CNAME
nslookup www.theharnessproject.org

# Should load your site
curl -I https://www.theharnessproject.org

# Should show DNS details
dig www.theharnessproject.org
```

---

**Need immediate help?** Share:
1. DNS provider (IONOS or Cloudflare)
2. Screenshot of DNS records
3. Result of: `nslookup www.theharnessproject.org`
4. How long since you configured DNS

I'll help you troubleshoot!
