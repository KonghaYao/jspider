
# :alembic:​ JSpider —— Cookies 模块 2.0
浏览器本身对于 js 获取 cookies 是有限制, js 获取 cookies 需要符合 同一个域名并被服务器允许才可以获取, 所以能够操作的 cookies 是有限制的, 但是请求的时候携带的 cookies ，所以对于 cookies 的操作其实是很一般的查看和删除修改。

## 查看可以看到的 cookies
在导入 JSpider 的时候就已经更新了 Cookies 中的属性。
```js
let jspider = new JSpider();
console.log(jspider.Cookies);
```


## 增加 cookies 
直接对 Cookies 对象设置值，会直接更改到 cookies
```js
let jspider = new JSpider();
jspider.Cookies['key'] = 'value1';
jspider.Cookies.keys = 'vals';
```

## 删除 cookies
当 cookies 设置为空字符串时自动删除。
```js
let jspider = new JSpider();
jspider.Cookies['key'] = '';
jspider.Cookies.keys = '';
```

## 缺陷
- Cookies 模块不能检测到 Ajax 请求附带的 cookies。
-  Cookies 模块不能够查询到不在 document.cookie 中的 cookie。
