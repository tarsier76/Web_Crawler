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

async function fetchAndParse(currentURL, baseURL) {
    try {
    const response = await fetch(currentURL, {
        method: 'GET',
        mode: 'cors',
    })
    if (response.status >= 400) {
        console.error(`Error: Response is error-level code ${response.status}`)
        return []
    }
    if (!response.headers.get('Content-Type').includes('text/html')) {
        console.error(`Error: Invalid Content-Type (${response.headers.get('content-type')})`)
        return []
    } else {
        const html = await response.text()
        return getURLSFromHTML(html, baseURL)
    }
    } catch (error) {
        console.error(`Fetch error: ${error.message}`)
        return []
    }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const baseDomain = new URL(baseURL).hostname
    const currentDomain = new URL(currentURL).hostname
    const normalizedCurrentURL = normalizeURL(currentURL)

    if (baseDomain !== currentDomain ) {
        return pages
    } 

    if (normalizedCurrentURL in pages) {
        pages[normalizedCurrentURL]++
        return pages
    } else {
        pages[normalizedCurrentURL] = 1
    }

    const listOfURLS = await fetchAndParse(currentURL, baseURL)
    for (const url of listOfURLS) {
        await crawlPage(baseURL, url, pages)
    }

    return pages
}

