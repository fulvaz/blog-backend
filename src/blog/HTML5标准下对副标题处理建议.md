@@title:HTML5标准下对副标题处理建议
@@date:2016-08-17

参考: https://www.w3.org/TR/html5/common-idioms.html#sub-head

> 基本是意译

<!-- more -->

HTML没有提供副标题标签, 下面是替代方案

`h1` - `h6` 不能用于表示副标题, 除非是用于表示一个新段落的heading, (unless intended to be the heading for a new section or subsection)

ps: 后面例子没有说明unless部分的内容是什么意思. 请赐教


例子(子标题不用`hx`): 
---
下面例子的标题与子标题用`header`组合(group)到一块,  作者不想让子标题也包含在表格内容中, 而且子标题也不是用于表明新段落(section)的开头, 所以他们用`p`来表示, 显示效果如下.
```
   <header>
   <h1>HTML 5.1 Nightly</h1>
   <p>A vocabulary and associated APIs for HTML and XHTML</p>
   <p>Editor's Draft 9 May 2013</p>
   </header>
```
结果:
![image](https://www.w3.org/TR/html5/images/htmlheading.png)



例子(副标题主标题在同一行):
---
下面例子中的书名, 子标题与和主标题用一个冒号分隔, 然后放到同一行中. 如下:
```
<h1>The Lord of the Rings: The Two Towers</h1>
```

结果:
![images](https://www.w3.org/TR/html5/images/lotr.PNG)



例子:
----
用于表示一个专辑名, 通过`span`和CSS表示子标题
(原文:In the following example part of an album title is included in a span element, allowing it to be styled differently from the rest of the title. A br element is used to place the album title on a new line. A sample CSS styled rendering of the heading is provided below the code example.)

```
   <h1>Ramones <br>
   <span>Hey! Ho! Let's Go</span> 
   </h1>
```
结果:
![images](https://www.w3.org/TR/html5/images/ramones.png)


例子:
---
下面例子中, 新闻的题目与摘要(tagline)是`header`组织, 题目用`h2`表示, 子标题用`p`, 效果如下
```
<header>
   <h2>3D films set for popularity slide </h2>
   <p>First drop in 3D box office projected for this year despite hotly tipped summer blockbusters,
    according to Fitch Ratings report</p>
   </header>
```

![images](https://www.w3.org/TR/html5/images/title-tagline.PNG)

例子:
---
我都懒得写了, 直接上代码
```
 <header>
   <p>Magazine of the Decade</p>
   <h1>THE MONTH</h1>
   <p>The Best of UK and Foreign Media</p>
   </header>
```

![images](https://www.w3.org/TR/html5/images/themonth.png)

总结
---
anyway, w3c认为这样处理副标题更加语义化

另外那么多例子是为了指出可以怎么用, 而不是说有一种可以通用的用法.

ps: 本文由来:  [mdn上关于`hgroup`处理副标题](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) , 指向了 [Subheadings, subtitles, alternative titles and taglines](https://www.w3.org/TR/html5/common-idioms.html#sub-head)