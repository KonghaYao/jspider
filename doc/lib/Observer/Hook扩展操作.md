---
title: Hook函数扩展操作
date: 2020/9/5
author: KonhaYao
tags:
  -Jspider
---

# Hook 函数扩展操作

Hook 是 JSpider 的 Observer 的一个函数，使用 Proxy 对函数的参数进行控制操作。灵活使用 Hook 对于爬虫的 Ajax 监控和其他一些判断操作都有作用。



## Ajax 监控

### GET监控

通常，音乐平台使用 get 请求音乐的下载地址，携带的参数有加密，通过 GET 监控可以查看每一次请求的具体参数。

使用此函数后就可以不用到源代码中找请求函数，再次触发符合条件的 Hook 时就会进入 debugger 然后可以通过调用栈查找到发送请求的函数。

```js
async function GETwatch(urlReg) {
    window.Hook =
        window.Hook ||
        (await import("https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js").then((res) => {
            console.log("%c 载入成功", "color:green");
            return res.default;
        }));
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    
    //=================上面为代理 open 函数=====================//
    //=================下面为注入 url     检测=====================//
    
    XMLHttpRequest.prototype.open.Func.push((args) => {
        let [type, url, ...any] = args;
        
        //依照正则表达式匹配 url 来debugger
         
         if (urlReg.test(url) && type.toLocaleLowerCase() === "get") {
            let urlObj = new URL(url);
             //查看参数
            let params = Object.fromEntries(urlObj.searchParams.entries());
            console.log(params);
            debugger;
        }
        return args;
    });
}
GETwatch(/www/);
```



### POST监控

通过 XHR 方式发动 POST 请求时，url 的输入和 body 的输入分割在不同的函数，所以需要联合触发来完成一次 POST 的调用。

```js
async function POSTwatch(urlReg) {
    window.Hook = window.Hook || (await import ("https://cdn.jsdelivr.net/npm/js-spider/lib/Observer/hook.js").then((res)=>{
        console.log("%c 载入成功","color:green");
        return res.default ;
        }
        ));
    XMLHttpRequest.prototype.open = Hook(XMLHttpRequest.prototype.open);
    XMLHttpRequest.prototype.send = Hook(XMLHttpRequest.prototype.send);
    XMLHttpRequest.prototype.setRequestHeader = Hook(XMLHttpRequest.prototype.setRequestHeader);
    
    //========================完成代理=============================//
    //========================接入代理函数=========================//
    
    XMLHttpRequest.prototype.open.Func.push((args)=>{
        let[type,url,...any] = args;
        if (urlReg.test(url) && type.toLocaleLowerCase() === "post") {
            
            //设置“开关” 并打开 ，所以下面的函数代理可以执行
            
            window.STOP = true;
            console.log(url);
            debugger ;
        }
        console.log(args);
        return args;
    }
    );
    XMLHttpRequest.prototype.setRequestHeader.Func.push((args)=>{
        if (window.STOP) {
            console.log(args);
        }
        return args;
    }
    );
    XMLHttpRequest.prototype.send.Func.push((args)=>{
        if (window.STOP) {
            console.log(args);
            debugger;
            window.STOP = false;
        }
        return args;
    }
    );
}
```



## 匿名函数的代理
当我们在查看源代码的时候，会有很多函数是运行在立即执行函数内部，不能被直接获取到。但是在 debugger 时，匿名函数中的函数可以被获取，这个时候它就可以被导出和代理。

```js
//立即执行函数

(function (index){
    let add = (i)=>i++
    let plus = (i)=>add(i**i)
    window.plus =plus
})(i)


//首先定下 debugger 断点，并触发

add = Hook(add)
temp1 = add // temp1就是那个藏在立即执行函数中的函数

//上面为打断状态下执行的函数

//添加监控 测试是否被 Hook 住
temp1.Func.push((args)=>{
    console.log('通过参数  ', args)
    return args
})
plus(21)
```
# [JSpider](../../JSpider.md)
