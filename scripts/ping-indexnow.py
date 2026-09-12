import urllib.request
import json
import xml.etree.ElementTree as ET

HOST = 'sadmanportfolio.vercel.app'
KEY = '9f31a293b8e1467cb40d5138f293bca1'
KEY_LOCATION = f'https://{HOST}/{KEY}.txt'

tree = ET.parse('public/sitemap.xml')
root = tree.getroot()
urls = [elem.text for elem in root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc') if elem.text]

payload = {
    'host': HOST,
    'key': KEY,
    'keyLocation': KEY_LOCATION,
    'urlList': urls
}

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(
    'https://api.indexnow.org/IndexNow',
    data=data,
    headers={'Content-Type': 'application/json; charset=utf-8'}
)

try:
    with urllib.request.urlopen(req) as resp:
        print(f'IndexNow ping response: {resp.status} {resp.reason}')
        print(f'Successfully submitted {len(urls)} URLs to IndexNow (Bing/Copilot/Yandex)!')
except urllib.error.HTTPError as e:
        print(f'IndexNow HTTP response: {e.code} - {e.read().decode("utf-8", errors="ignore")}')
except Exception as e:
        print(f'IndexNow error: {e}')
