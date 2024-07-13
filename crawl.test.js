import { test, expect } from "@jest/globals"
import { normalizeURL, getURLSFromHTML } from "./crawl"

describe('Returns a constant normalized URL.', () => {
    const testCases = [
        { input: 'https://blog.boot.dev/path/', expected: 'blog.boot.dev/path' },
        { input: 'https://blog.boot.dev/path', expected: 'blog.boot.dev/path' },
        { input: 'http://blog.boot.dev/path/', expected: 'blog.boot.dev/path' },
        { input: 'http://blog.boot.dev/path', expected: 'blog.boot.dev/path' },
        { input: 'http://blog.boot.dev:80/path/', expected: 'blog.boot.dev/path' },
        { input: 'http://blog.boot.dev:443/path/', expected: 'blog.boot.dev/path' },
        { input: 'https://blog.boot.dev:80/path/', expected: 'blog.boot.dev/path' },
        { input: 'https://blog.boot.dev:443/path/', expected: 'blog.boot.dev/path' },
        { input: 'https://blog.boot.dev:443/path', expected: 'blog.boot.dev/path' },
        { input: 'https://blog.boot.dev:443/path/?query=123', expected: 'blog.boot.dev/path' }
    ]

    testCases.forEach(({ input, expected }) => {
        test(`Normalizing URL ${input}...`, () => {
            expect(normalizeURL(input)).toBe(expected)
        })
    })
})

describe('Gets URLs from HTML.', () => {
    const testCases = [
        { htmlBody: `<html><body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
          </body></html>`,
          baseURL: 'https://blog.boot.dev',
          expected: ['https://blog.boot.dev']
        },

        { htmlBody: `<html><body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev/hello"><span>Go to Boot.dev</span></a>
          </body></html>`,
          baseURL: 'https://blog.boot.dev',
          expected: ['https://blog.boot.dev', 'https://blog.boot.dev/hello']
        }, 

        { htmlBody: `<html><body>
            <a href="/xyz"><span>Go to Boot.dev</span></a>
          </body></html>`,
          baseURL: 'https://blog.boot.dev',
          expected: ['https://blog.boot.dev/xyz']
        },

        { htmlBody: `<html><body>
            <a href="https://boot.dev/abc?q=info"><span>Go to Boot.dev</span></a>
            <a href="https://boot.dev/xyz"><span>Go to Boot.dev</span></a>
            <a href="/abc"><span>Go to Boot.dev</span></a>
          </body></html>`,
          baseURL: 'https://boot.dev',
          expected: ['https://boot.dev/abc?q=info', 'https://boot.dev/xyz', 'https://boot.dev/abc']
        }
    ]

    testCases.forEach(({ htmlBody, baseURL, expected }) => {
        test('Extracting URLs from HTML...', () => {
            expect(getURLSFromHTML(htmlBody, baseURL)).toStrictEqual(expected)
        })
    })
})