import re

with open('toolkit.html', 'r', encoding='utf-8') as f:
    content = f.read()

# find HARNESS Toolkit
m = re.search(r'harness toolkit', content, re.IGNORECASE)
if m:
    idx = m.start()
    print('Found harness toolkit around:')
    print(content[max(0, idx-500):min(len(content), idx+500)])
else:
    print('HARNESS Toolkit not found.')

print('\n--- Nav / Header Tags ---')
for tag in ['<nav', '<header', 'class=\"nav', 'class=\"header']:
    idx = content.find(tag)
    if idx != -1:
        print(f'Found {tag} at', idx)
        print(content[idx:idx+200])

print('\n--- Badges ---')
for m in re.finditer(r'class="[^"]*badge[^"]*"', content, re.IGNORECASE):
    idx = m.start()
    print('Badge at', idx)
    print(content[max(0, idx-100):min(len(content), idx+200)])
