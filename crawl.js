export {normalizeURL, getURLSFromHTML, crawlPage}
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

async function crawlPage(currentURL) {
    const response = await fetch(currentURL, {
        method: 'GET',
        mode: 'cors',
        
    })
    if (response.status >= 400) {
        console.error(`Error: Response is error-level code ${response.status}`)
        return 
    }
    if (!response.headers.get('Content-Type').includes('text/html')) {
        console.error(`Error: Invalid Content-Type (${response.headers.get('content-type')})`)
        return 
    } else {
        console.log(await response.text())
    }

}

