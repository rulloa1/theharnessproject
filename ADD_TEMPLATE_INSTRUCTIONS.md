# Quick Template Loader Addition Instructions

## For ALL Pages - Add Before `</head>`:

```html
<!-- Template Loader - Auto-loads Navigation & Footer -->
<script src="js/template-loader.js" defer></script>
```

OR for pages in subdirectories (educator/, blog/, etc.):

```html
<!-- Template Loader - Auto-loads Navigation & Footer -->
<script src="../js/template-loader.js" defer></script>
```

## Pages to Update:

### Root Level:
- about.html
- toolkit.html
- pricing.html  
- app.html
- participant-companion.html
- contact.html

### Subdirectories:
- educator/index.html
- educator/ebook-reader.html
- educator/facilitator-guide.html
- educator/participant-guide.html
- blog/index.html
- workshops/workshop-page.html

## What the Template Loader Does:

1. **Automatically loads** `components/standard-nav.html`
2. **Automatically loads** `components/standard-footer.html`
3. **Adjusts paths** based on page depth (root vs subdirectory)
4. **Inserts nav** at beginning of `<body>`
5. **Inserts footer** at end of `<body>`

## Remove Old Nav/Footer:

After adding the script, you can remove existing `<nav>` and `<footer>` tags - the template loader will handle them automatically!

