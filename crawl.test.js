import { test, expect } from "@jest/globals"
import { normalizeURL } from "./crawl"

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