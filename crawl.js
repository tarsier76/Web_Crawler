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

function getURLSFromHTML() {}