const { normalizeURL, getURLsfromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')
//input.replace(/^(https:\/\/|http:\/\/)(www\.)?/,'')
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
            Bood.dev Blog
            </a>
        </body>
    </html>    
        `
        const inputBaseURL="https://blog.boot.dev/path/"
    const actual = getURLsfromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Bood.dev Blog
            </a>
            <a href="/path2/">
                Bood.dev Blog
            </a>
        </body>
    </html>    
        `
        const inputBaseURL="https://blog.boot.dev"
    const actual = getURLsfromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})
test('getURLsfromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                INVALID URL
            </a>
        </body>
    </html>    
        `
        const inputBaseURL="https://blog.boot.dev"
    const actual = getURLsfromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})