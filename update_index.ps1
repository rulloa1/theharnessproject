$lines = Get-Content -Path "c:\Users\roryu\theharnessproject\index.html"
$newLines = @()

# 1. Header Start (Lines 1-46 -> Ind 0-45)
$newLines += $lines[0..45]

# 2. Font Link
$newLines += '    <link rel="stylesheet" href="css/fonts.css">'

# 3. Gap - Stylesheet Comment & Transparent Headers Link (Lines 66-68 -> Ind 65-67)
# Skip Block A (@font-face: Lines 47-65 -> Ind 46-64)
$newLines += $lines[65..67]

# 4. New Links (Logo, Landing, Loader, Cookie)
# Skip Block B (Logo Styles + Landing Styles + Template Loader + Cookie Consent)
# Block B Range: Lines 69 to 4138 -> Ind 68 to 4137
$newLines += '    <link rel="stylesheet" href="css/harness-logo.css">'
$newLines += '    <link rel="stylesheet" href="css/harness-landing.css">'
$newLines += '    <script src="js/universal-loader.js" defer></script>'
$newLines += '    <script src="js/cookie-consent.js" defer></script>'

# 5. Body Content (Page Indicator, Loader, Hero, etc.)
# Range: Lines 4139 to 4720 -> Ind 4138 to 4719
$newLines += $lines[4138..4719]

# 6. Landing Scripts
# Skip Block C (Landing Page Animations)
# Block C Range: Lines 4721 to 5145 -> Ind 4720 to 5144
$newLines += '    <script src="js/harness-landing.js" defer></script>'
$newLines += '    <script src="js/lazy-loading.js" defer></script>'

# 7. Gap (Small gap between animations script and Lil Z)
# Range: Lines 5146 to 5147 -> Ind 5145 to 5146
$newLines += $lines[5145..5146]

# 8. Lil Z Scripts
# Skip Block D (Lil Z Companion + createModal helper)
# Block D Range: Lines 5148 to 6211 -> Ind 5147 to 6210
$newLines += '    <script src="js/lil-z-chat.js" defer></script>'
$newLines += '    <script src="js/seo-optimizer.js" defer></script>'
$newLines += '    <script src="js/accessibility.js" defer></script>'
$newLines += '    <script src="js/schema-generator.js" defer></script>'

# 9. Closing Tags (</body>, </html> - or whatever is left)
# Range: Lines 6212 to End -> Ind 6211 to End
$newLines += $lines[6211..($lines.Count - 1)]

# Write back to file
$newLines | Set-Content -Path "c:\Users\roryu\theharnessproject\index.html" -Encoding UTF8

Write-Host "Index.html refactored successfully."
