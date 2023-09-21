
//https://stackoverflow.com/questions/68180648/string-replacements-in-index-html-in-vite
const transformHtmlPlugin = data => ({
    name: 'transform-html',
    transformIndexHtml: {
        enforce: 'pre',
        transform(html) {
            return html.replace(
                /<%=\s*(\w+)\s*%>/gi,
                (match, p1) => data[p1] || ''
            );
        }
    }
});
export default transformHtmlPlugin