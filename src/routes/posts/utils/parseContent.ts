import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
})

export function textToMarkdown(text: string): string {
  return text.trim()
}

export function markdownToHtml(markdown: string): string {
  const rawHtml = md.render(markdown)

  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'h1',
      'h2',
      'h3',
    ]),
    allowedAttributes: {
      a: ['href', 'title', 'target'],
      img: ['src', 'alt', 'title'],
    },
    allowedSchemes: ['http', 'https'],
  })
}

export function htmlToText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, ' ')
    .trim()
}
