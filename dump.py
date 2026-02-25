import re

with open('toolkit.html', 'r', encoding='utf-8') as f:
    content = f.read()

# remove styles
content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
# remove image srcs that are data uris
content = re.sub(r'src="data:image/[^>]*"', 'src="[DATA URI REMOVED]"', content)

body_match = re.search(r'<body[^>]*>', content)
if body_match:
    body = content[body_match.end():]
    
    # print up to 50 lines
    for i, line in enumerate(body.split('\n')[:80]):
        if line.strip():
            print(line.strip())
