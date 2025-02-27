import fs from 'fs';

// 转换开头标记
function transform_bars_tou(markdown) {
  const reg = /(?<!`)\/\.(.*?)\s*</gm; // 写法：  /.box <
  const replacement = "<div class=\"$1\">\n";
  return markdown.replace(reg, replacement);
}

// 转换结尾标记
function transform_bars_wei(markdown) {
  const reg = /(?<!`)\/\-\>/gm; // 写法：    /->
  const replacement = "\n</div>\n";
  return markdown.replace(reg, replacement);
}

// 转换宽度标记
function transform_width(markdown) {
  const reg = /(?<!`)\/--([^\s]+)/g; // 写法：/--
  const replacement = "<span class=\"tabb\">$1</span>";
  return markdown.replace(reg, replacement);
}

function transform_bars(markdown) {
  const reg = /\\(.*?)\s*\[(.*?)\]\s*{([^{}$]*(((\${1,2}[\w\W]+?\${1,2})|({[^{}]*?}))[^{}$]*)*)}/gm;
  const replacement = "<div class=\"$1\" name=\"$2\">\n$3\n</div>\n";
  markdown = markdown.replace(reg, replacement);
  markdown = markdown.replace(reg, replacement); // 正则表达式无法匹配多级括号，因此通过多次替换来解决标签套标签时程序会出现的bug，替换次数应大于等于最大嵌套层数
  return markdown;
}





module.exports = {
  onWillParseMarkdown: function(markdown) {
    return new Promise((resolve, reject) => {
      try {
        // Extract YAML configuration block
        const YAMLCfgList = markdown?.match(/---\n([\s\S]*?)\n---/)?.[1]?.split('\n');
        // Find the theme configuration line
        const ThemeYAMLCfg = YAMLCfgList?.find(one => /^[^:]*theme\:[\s\S]*/.test(one));
        // Extract the theme name
        const theme = ThemeYAMLCfg?.split(':')[1]?.trim();
        if (theme) {
          // Construct paths to the theme file
          const absolutePath = `/Users/admin/doc/_style/${theme}.less`;
          const relativePath = `../_style/${theme}.less`;
          // Check if the theme file exists
          if (fs.existsSync(absolutePath)) {
            // Modify the Markdown to include the theme file
            const md = markdown.replace(/(---\n([\s\S]*?)\n---)/, `$1\n@import \"${relativePath}\" \n`);
            return resolve(md);
          }
        }
        // 执行自定义转换
        markdown = transform_bars_tou(markdown);
        markdown = transform_bars_wei(markdown);
        markdown = transform_width(markdown);
        // Resolve with the original Markdown if no theme or file not found
        return resolve(markdown);
      } catch (error) {
        return reject(error);
      }
    });
  },
  onDidParseMarkdown: function(html) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(html);
      } catch (error) {
        return reject(error);
      }
    });
  },
  onWillTransformMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(markdown);
      } catch (error) {
        return reject(error);
      }
    });
  },
  onDidTransformMarkdown: function (markdown) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(markdown);
      } catch (error) {
        return reject(error);
      }
    });
  }
};



module.exports = {
  onWillParseMarkdown: function(markdown) {
    return new Promise((resolve)=> {
      markdown = transform_bars_tou(markdown);
      return resolve(markdown);
    })
  },
  onDidParseMarkdown: function(html) { //<div class="mume markdown-preview  "></div>的全部内容
    return new Promise((resolve, reject)=> {
      return resolve(html);
    })
  },
  onWillTransformMarkdown: function (markdown) {
        return new Promise((resolve) => {
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