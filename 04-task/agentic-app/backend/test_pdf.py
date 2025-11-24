import urllib.request
import urllib.error
import json

url = "https://quizler-backend.vercel.app/api/pdf/generate"
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'

# Create a dummy PDF content
pdf_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Resources <<\n/Font <<\n/F1 4 0 R\n>>\n>>\n/Contents 5 0 R\n>>\nendobj\n4 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n5 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000117 00000 n\n0000000256 00000 n\n0000000343 00000 n\ntrailer\n<<\n/Size 6\n/Root 1 0 R\n>>\nstartxref\n437\n%%EOF"

# Construct the body
data = []
data.append(f'--{boundary}'.encode('utf-8'))
data.append('Content-Disposition: form-data; name="file"; filename="test.pdf"'.encode('utf-8'))
data.append('Content-Type: application/pdf'.encode('utf-8'))
data.append(''.encode('utf-8'))
data.append(pdf_content)
data.append(f'--{boundary}--'.encode('utf-8'))
data.append(''.encode('utf-8'))

body = b'\r\n'.join(data)

req = urllib.request.Request(url, data=body)
req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
req.add_header('User-Agent', 'Python-urllib/3.x')

try:
    print(f"Uploading PDF to {url}...")
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print("Response Text:")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print("Response Text:")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
