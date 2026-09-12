import { readFileSync } from 'fs';
import { resolve } from 'path';

const HOST = 'sadmanportfolio.vercel.app';
const KEY = '9f31a293b8e1467cb40d5138f293bca1';
const KEY_LOCATION = https://System.Management.Automation.Internal.Host.InternalHost/.txt;

async function pingIndexNow() {
  const xml = readFileSync(resolve('public/sitemap.xml'), 'utf-8');
  const urls: string[] = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    console.log([IndexNow] Status:  );
    console.log([IndexNow] Successfully pushed  URLs to Bing & IndexNow engines.);
  } catch (err) {
    console.error('[IndexNow] Error pinging IndexNow:', err);
  }
}

pingIndexNow();
