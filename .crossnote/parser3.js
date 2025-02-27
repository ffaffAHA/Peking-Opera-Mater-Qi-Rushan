module.exports = {
  onWillParseMarkdown: function(markdown) {
    return new Promise((resolve, reject)=> {
      markdown = transform_bars(markdown);
      return resolve(markdown);
    })
  },
  onDidParseMarkdown: function(html, {cheerio}) { //<div class="mume markdown-preview  "></div>的全部内容
    return new Promise((resolve, reject)=> {
      return resolve(html);
    })
  },
  onWillTransformMarkdown: function (markdown) {
        return new Promise((resolve, reject) => {
            return resolve(markdown);
        });
    },
  onDidTransformMarkdown: function (markdown) {
      return new Promise((resolve, reject) => {
          return resolve(markdown);
      });
  }
}
transform_bars = function(markdown ){
  reg = /\\(.*?)\s*\[(.*?)\]\s*{([^{}$]*(((\${1,2}[\w\W]+?\${1,2})|({[^{}]*?}))[^{}$]*)*)}/gm;
  replacement = "<div class=\"$1\" name=\"$2\">\n$3\n</div>\n";
  markdown = markdown.replace(reg,replacement);
  markdown = markdown.replace(reg,replacement);//正则表达式无法匹配多级括号，因此通过多次替换来解决标签套标签时程序会出现的bug，替换次数应大于等于最大嵌套层数
  return markdown;
};