export default function replaceHtmlQuotes(str: string) {
  return str.replace(/&quot;/g, '"');
}
