const MarkdownIt = require('markdown-it');
// 假设下面是你的代码模块
const customMarkdownTransform = {
    onWillParseMarkdown: function (markdown) {
        return new Promise((resolve, reject) => {
            try {
                markdown = transform_bars_tou(markdown);
                markdown = transform_bars_wei(markdown);
                markdown = transform_width(markdown);
                resolve(markdown);
            } catch (error) {
                reject(error);
            }
        });
    }
};

function transform_bars_tou(markdown) {
    const reg = /(?<!`)\/\.(.*?)\s*</gm;
    const replacement = "<div class=\"$1\">\n";
    return markdown.replace(reg, replacement);
}

function transform_bars_wei(markdown) {
    const reg = /(?<!`)\/\-\>/gm;
    const replacement = "\n</div>\n";
    return markdown.replace(reg, replacement);
}

function transform_width(markdown) {
    const reg = /(?<!`)\/--([^\s]+)/g;
    const replacement = "<span class=\"tabb\">$1</span>";
    return markdown.replace(reg, replacement);
}

// 创建 markdown-it 实例
const md = new MarkdownIt();

// 模拟 Markdown 文本
const markdownText = `/.box <
这是一个测试内容。
/->`;

// 执行自定义转换
customMarkdownTransform.onWillParseMarkdown(markdownText)
   .then((transformedMarkdown) => {
        // 使用 markdown-it 解析转换后的 Markdown
        const html = md.render(transformedMarkdown);
        console.log(html);
    })
   .catch((error) => {
        console.error('转换过程中出现错误:', error);
    });