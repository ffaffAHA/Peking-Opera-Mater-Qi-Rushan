---
html:
  toc: true
class: "tocNumberHidden"
---

[toc]

<div class="wrap2">
  <div class="box">
  j
  </div>
  <div class="box">
  2</div>
</div>

这段代码是一个 Node.js 模块，其主要功能是对 Markdown 文本进行预处理与后处理。具体功能包含：
从 Markdown 文本里提取 YAML 配置块，找出主题配置，若主题文件存在，就把主题文件引入到 Markdown 文本中。
对 Markdown 文本里的特定标记进行转换，像将 /.box < 转换为 <div class="box">，把 /-> 转换为 </div>，以及把 /--内容 转换为 <span class="tabb">内容</span>。
提供了几个钩子函数，用于在 Markdown 解析和转换的不同阶段执行操作。



<div class="box">
这是一个盒子的内容。
</div>
这是普通文本。
<span class="tabb">重要内容</span>

# 使用攻略

建议查看带有样式的readme.html文件

  
/.box < ffaff /- guananncanacinacn


## 1. 效果图参考

![20230513160456](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513160456.png)

## 2. 安装

速览：

1. vscode 安装mark all in one、[Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/) 插件

2. css方式二， `preview_theme` 和 `prism_theme` 中的`pepper`相关文件放到对应的本地文件夹中，在`setting.json` 调用

![图 2](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/a96bb5db3ce6cd8c46331e5425180caa3990fef1a32c24929ed6f97cbe1b68e3.png)

3. `my_mume`的js文件放在本地`.mume`文件夹中

![20230515163800](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230515163800.png)

1. tocNumberHidden.less[按需调用](#45-标题序号)

### 2.1. css

#### （1） 方式一：插件自带

1. 插件Markdown Preview Enhanced有*官网推荐*的方法，在.mume/style.less下编辑
2. 文件夹`my-mume`的css文件替换到本地`.mume`文件夹
3. 该文件已**包含代码高亮样式**

***注意***

1. **2023.5.14后不更新**
2. **该文件未优化！**，经历了 less 👉 css 👉 less 👉 css，发现style.less有些地方写了@important仍无法直接覆盖`preview_theme`的默认样式，瞅一眼就有好几处！！原来的pepper.css是可以的，懒得一个个找又一个个改了，就这样吧，方式二！👇

#### （2） 方式二：文件夹替换 ⭐

1. 把`preview_theme` 和 `prism_theme` 中的pepper相关文件放到对应的文件夹中
2. 在`setting.json` 调用

setting.json 配置参考

```javascript
{
    "markdown-preview-enhanced.previewTheme": "pepper.css", //使用自己的css pepper.css
    "markdown-preview-enhanced.codeBlockTheme": "pepperLight.css",
    "markdown-preview-enhanced.printBackground": true, //使用自己的css打印html/pdf
    "[markdown]": {
        "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
    },
    "markdown.extension.toc.levels": "2..4",
    "markdown-preview-enhanced.enableExtendedTableSyntax": true,
    "markdown-preview-enhanced.enableScriptExecution": true,
    "markdownlint.config": {
        "MD029": false,
        "MD033": false,
    }
}
```

### 2.2. js

[自定义调用class](#4-功能)方法，根据[《爱吃的小白-MPE的使用》](https://zhuanlan.zhihu.com/p/532888400?utm_id=0)修改，文件夹`my-mume`的js文件替换到本地.mume文件夹

## 标题使用规范

| 标题位置           | 写法         | 效果                                                                                                             |
| ------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| 文章标题           | `# 文章标题` | 文章标题                                                                                                         |
| 第一章             | `# 第一章`   | 1　第一章                                                                                                        |
| 第一节             | `## 第一节`  | 1.1　第一节                                                                                                      |
| 第一段             | `### 第一段` | （1）　第一段                                                                                                    |
| 需要在目录显示的   | `#### xxx`   | .![20230513191052](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513191052.png) |
| 不需要在目录显示的 | `***效果***` | .![20230513191322](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513191322.png) |

## 功能

调用样式规则
开始：`/.cssname <`
结束：`/->`

5.22更新：`/>` 👉 `/->`，因有部分单标签结束为`/>`，为避免重复作此修改


# Example Markdown with Custom Syntax




<h1>Example Markdown with Custom Syntax</h1>

<div  class="thm" name="vsode">
This is a paragraph inside a custom box with the class "box". You can add more content here, and it will be inside the box.
</div>

<p>Here is some regular text.</p>

<p>This is some text with an inline <span class="tabb">highlighted</span> span.</p>

<p>Another box example:</p>

<div  class="another-class">
<p>This is another box with a different class "another-class".</p>

</div>


<div class="thm" name="定理1">
我是定理1的内容
</div>

/.box <
这是一个测试内容。
/->


\thm[hhh]{
123
  \def[hh]{
    456
  }
}



### 4.1. 右下角的提示 `/.fix`

移入显示，移出仅剩一行

***效果***
移出：![20230513153138](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513153138.png) 移入：![20230514023551](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230514023551.png)

### 4.2. 左右分栏 `/.wrap2`

部分内容想做左右对比参考效果，如：html和js写完占据大量的高度、两边代码对比等

***用法***

55开

`/.wrap2 <`
 `/.box <` `/->`
 `/.box <` `/->`
`/->`

37开

`/.wrap2 <`
 `/.box lit3 <` `/->`
 `/.box lit7 <` `/->`
`/->`

46开 同理 lit4  lit6

***ps***

1. 其他的可以自己去补充
2. ==出现异常！== 当左右分栏的多行代码块内**出现↓** 或 **目录消失**时，代码块加一格tab即可
`<p data-line="60" class="sync-line" style="margin:0;"></p>`
3. 并没有很严格的30% 70% 40% 60%，大概

***效果***

55开
![20230513154527](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513154527.png)

73开
![20230513154606](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513154606.png)

### 4.3. 图片大小 `#img_7`

`=100x100` 在vscode无法使用，装了几个插件都不行

使用：

`![xxx](xx.png#img_5)`

`![xxx](xx.png#img_3)`

### 4.4. 文字间隔 `/--`

实现效果
![20230516224807](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230516224807.png)

左侧文字有固定的宽度100px

使用方法 `/--split 将字符串转化为数组`

注意在 split 后面加空格以作区分

### 4.5. 标题序号

我的目的：**仅显示侧边栏的目录**，pepper.css内已有定义有标题序号

1. ctrl shift p 选择添加章节序号

2. **某个文件**要侧边栏（全部看3），`my_mume`文件夹内复制 `tocNumberHidden.less` 放在可以调用的位置

3. md文件中引入！

```html
---
html:
  toc: true
class: "tocNumberHidden"
---

@import "../assets/themesStyle/tocNumberHidden.less"
```

3. **全部的文件**全要侧边栏目录，释放以下代码：

![20230513152113](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513152113.png)

***效果***
![20230513190249](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513190249.png) 👉 ![20230513190221](https://hippyoo-img-1259521706.cos.ap-guangzhou.myqcloud.com/markdown_img/20230513190221.png)

4. 关于将`3.1.1`这种，想改成`（1）`，利用正则表达式曲线救国，就是有点麻烦
   - setting.json文件，`"markdown.extension.toc.levels": "2..4"`
   - `1.1.1.` → `（1）`，查找 `\s(\d+).(\d+).(\d+).\s` ，替换 `（$3）`
   - `1.1.1.1.` → `❥`，查找 `\s(\d+).(\d+).(\d+).(\d+).\s` ，替换 `❥`
   - setting.json文件，`"markdown.extension.toc.levels": "2..3"`
   - （一般四级标题的顺序不会变，二三级标题顺序经常变，所以换成2..3）

***PS***

1. 在排序到双数以上（如10、11）时，会有漏出`.`

2. 已根据标题内容自定义侧边栏宽度

## 5. 待填的坑

还没填完，哭瞎了

1. 使用多个左右布局，编辑框跟预览框不同步
2. 图片链接的大小改成=宽x高
3. 直接把侧边栏目录自定义序号 1. 1.1 （1） ，后面的标题不显示
