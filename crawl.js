export {normalizeURL, getURLSFromHTML}
import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const URLobject = new URL(url)
    const completeURL = URLobject.hostname + URLobject.pathname
    if (completeURL.endsWith('/')) {
        return completeURL.slice(0, -1)
    } else {
        return completeURL
    }
}

function getURLSFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    const urls = Array.from(links).map(link => link.href);
    for (let index in urls) {
        if (!urls[index].includes(baseURL)) {
            urls[index] = baseURL + urls[index]
        }

        if (urls[index].endsWith('/')) {
            urls[index] = urls[index].slice(0, -1)
        }
    }
    return urls;
}

console.log(getURLSFromHTML(`<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>`, "https://blog.boot.dev"));