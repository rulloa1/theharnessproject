# Website Issues - Prioritized Fix Plan

## Summary
- **Total Issues**: 242 across 7 categories
- **Files Analyzed**: 30 HTML files

## Issue Categories (Prioritized)

### 🔴 CRITICAL - Must Fix (90 issues)

#### 1. Missing JS Files (124 references)
**Status**: Actually NOT broken - scripts are embedded inline
**Action**: Remove misleading `<script src="js/...">` references from `<head>` sections
**Impact**: HIGH - Causes browser 404 errors and confusion
**Files Affected**: Almost all HTML files

#### 2. Missing CSS Files (44 references)
**Status**: Need to check if CSS is embedded or actually missing
**Action**: Either create missing CSS files or remove references
**Impact**: HIGH - May cause styling issues
**Files Affected**: Multiple app-*.html files

#### 3. Missing Images (46 references)
**Status**: Template variables like `${logoPath}` not being replaced
**Action**: Check if images directory exists, fix template variable replacement
**Impact**: MEDIUM - Broken image icons
**Files Affected**: Multiple files

### 🟡 MEDIUM - Should Fix (19 issues)

#### 4. Console.log Statements (18 files)
**Status**: Debug code left in production
**Action**: Remove or comment out console.log statements
**Impact**: MEDIUM - Performance and security
**Files Affected**: 18 HTML files

#### 5. Missing Alt Tags (1 file)
**Status**: Accessibility issue
**Action**: Add alt attributes to images
**Impact**: MEDIUM - Accessibility compliance
**Files Affected**: toolkit-mobile.html

### 🟢 LOW - Nice to Fix (9 issues)

#### 6. TODO Comments (8 files)
**Status**: Development notes
**Action**: Review and complete TODOs or remove
**Impact**: LOW - Code quality
**Files Affected**: 8 HTML files with 595 total TODOs

#### 7. Duplicate IDs (1 file)
**Status**: HTML validation error
**Action**: Rename duplicate ID
**Impact**: LOW - May cause JavaScript issues
**Files Affected**: ebook-complete.html

## Recommended Fix Order

1. ✅ **Remove broken script src references** (Quick win, prevents 404 errors)
2. ✅ **Check and fix CSS references** (Ensure styling works)
3. ✅ **Fix template variables for images** (Fix broken image icons)
4. ✅ **Remove console.log statements** (Clean up debug code)
5. ✅ **Add missing alt tags** (Accessibility)
6. ⏭️ **Fix duplicate IDs** (HTML validation)
7. ⏭️ **Review TODO comments** (Code quality - can be done later)

## Notes

- The "missing JS files" are not actually missing - the JavaScript is embedded inline in the HTML
- The `<script src="js/...">` tags appear to be documentation/comments showing where scripts would normally be loaded from
- Need to verify if CSS files are also embedded or actually missing
