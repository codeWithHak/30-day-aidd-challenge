import urllib.request
import urllib.error

url = "https://quizler-backend.vercel.app/api/quiz/generate"
headers = {
    "Origin": "http://random-origin.com",
    "Access-Control-Request-Method": "POST",
}

req = urllib.request.Request(url, headers=headers, method="OPTIONS")

try:
    print(f"Testing OPTIONS request to {url} with Origin: {headers['Origin']}...")
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print("Headers:")
        for key, value in response.headers.items():
            print(f"  {key}: {value}")

        if response.headers.get("Access-Control-Allow-Origin"):
            print("\nCORS Headers present.")
        else:
            print("\nCORS Headers MISSING.")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print("Headers:")
    for key, value in e.headers.items():
        print(f"  {key}: {value}")
except Exception as e:
    print(f"Error: {e}")
