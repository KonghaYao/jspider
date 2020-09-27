---
title: JSpider——Observer模块
version: 2.0
date: 2020/8/31
author: KonhaYao
---

# :book: JSpider —— Observer 模块 2.0

## :pencil2: 介绍

Observer 模块是用于监视某些在浏览器中的变量的。

## 闲聊
最初设计这个模块是用来获取匿名函数的，但是后来学到了新的 Proxy 对象，发现 MDN 提及了一些用法，但是没有深入。所以我自己开发了函数代理函数 **Hook** 。然后想到 Vue 的双向绑定和代理的本质其实很像，所以使用递归的方式把整个 **对象** 代理了，并且对象里面的对象都可以设置相应的方式来拦截数据，这就使得 **Observer** 这个模块的作用大幅提升。

由于 String 和 Number 等非对象和函数的类型过于简单，所以直接使用`__defineGetter__`和`__defineSetter__`就可以完成代理，所以在这个模块中没有对这些数据的代理方式。

<br>


## :hammer: 快速开始

### JsDelivr cdn 载入链接解析

按类型引入 
- ES6引入 [https://cdn.jsdelivr.net/npm/js-spider/JSpider.min.js](#)
- ES5引入 [https://cdn.jsdelivr.net/npm/js-spider/dist/JSpider.min.js](#)
- 单个模块引入 [https://cdn.jsdelivr.net/npm/js-spider/src/模块名.js](#)

```js
// js文件遵循 ES6 的 import 方式，所以要用下面的方式导入
//动态载入
import('https://cdn.jsdelivr.net/npm/js-spider/src/Observer.js')
            .then(res=>window.Observer = res)

// ES5 可以直接在 script 标签中引入
```

<br>

## :book: Observer 

### :candy: Hook 函数

Hook 通过代理函数，对函数的输入和输出进行操作。

<br>

#### :candy: 代理非Promise 函数

默认代理 非Promise 函数，非Promise 是指返回值不为 Promise 的函数。

如果非 Promise 函数的第二参数填了 true 会导致返回结果为一个Promise对象，

这对于某些需要返回数据的函数来说就是大灾难。

```js
let jspider =new JSpider()
//完成代理
Array.prototype.pop = jspider.Observer.hook(Array.prototype.pop)

//在被代理函数的位置上多了 Func 和 afterFunc 两个数组

// Func 是在被代理函数执行之前，会拦截并处理参数
// 传入参数为数组，输出也要为数组
Array.prototype.pop.Func.push((args)=>{
    console.log('输入参数数组',args)
    // 可以修改参数...
    return args // 返回必须是数组
})

// afterFunc 是触发在被代理函数返回数据后，将处理数据，然后输出
//传入参数数量为 1 ，输出也为1
Array.prototype.pop.afterFunc.push((res)=>{
    console.log('返回数据数组',res)
    // 可以修改参数...
    return  res+1
})
let s = [0].pop() 
//s=1
console.log(s+1)
// 可以尝试将 hook 的第二个参数填为true，查看结果的不同。
```

##### 但是有一个例外，不需要返回值的 Promise 可以使用这个
例如 XMLHttpRequest 的 send 函数一般是没有返回的，所以可以用。

##### 有一些关键的函数最好不要代理，如 Array 中的 push，如果使用的时候代理它，可能会导致向代理数据中添加代理函数时发生错误
 
<br>
#### :candy: 代理 Promise 函数

像 fetch 这种返回 Promise 的函数，必须要使用第二参数，若不使用，则会导致错误。

```js
let jspider =new JSpider()
//完成代理
fetch = jspider.Observer.hook(fetch,true)

fetch.Func.push((args)=>{
    console.log('输入参数数组',args)
    // 可以修改参数...
    return args // 返回必须是数组
})

// afterFunc 是触发在被代理函数返回数据后，将处理数据，然后输出
fetch.afterFunc.push((res)=>{
    console.log('返回数据数组',res)
    // 可以修改参数...
    return  res// 返回必须是数组
})
fetch('/')
```
### [Hook例子](./Observer/Hook扩展操作.md) 

<br>
### :candy: watch 函数

watch 是用来控制 js 对象的，多层对象也可以控制。

由于 Proxy 对多层对象 只能代理表层的短板，我特地将 Proxy 的 get 和 set 函数导向了被代理对象的 GETTER 和 SETTER 使用者只需要将自己的函数赋值到 GETTER 和 SETTER 的相应的 key 上，就可以实现对被代理对象相应属性的代理。

当每一层的受控制的对象都有 GETTER 和 SETTER 属性的时候，处理就方便了很多。

#### 开始代理

```js
let a = {
    name: ['张三', '李四', {
        name: '王五'
    }],
    age: 30,
    sex: undefined,
    work: {
        java: false,
        php: true,
        java: false
    }
}
let jspider = new JSpider()

//代理方式和前面的 hook 是一致的，都要赋值给自身完成代理
a = jspider.Observer.watch(a)

// 被设置 sex 属性的时候会触发
a.SETTER.sex=(oldValue,value)=>{
    console.log(oldValue,value)
    console.log('你确定？')
    return value //这个数据是最终赋值的数据
}

// 读取 name 属性的时候触发
a.GETTER.name = (value)=>{
    console.log('你偷看')
    return value //这个是最终返回的数据
}

a.sex='男'
a.name
```

<br>

#### GETTER 和 SETTER 详解

##### DEFAULT 属性

在 STETTER 和 GETTER 中都有 DEFAULT 属性，该属性会在没有定义函数的属性被访问时使用。

```js

a.name.SETTER.DEFAULT = (key, value) => {
    console.log("触发set检查 " + value);
    return value;
};
a.name.GETTER.DEFAULT = (key, value) => {
    console.log("触发get检查 " + value);
    return value;
};
```

##### 设置触发函数

```js
// 被设置 sex 属性的时候会触发
a.SETTER.sex=(oldValue,value)=>{
    console.log(oldValue,value)
    console.log('你确定？')
    return value //这个数据是最终赋值的数据
}

// 读取 name 属性的时候触发
a.GETTER.name = (value)=>{
    console.log('你偷看')
    return value //这个是最终返回的数据
}
```



## [推荐下一篇](./Copy.md)
# [JSpider](../JSpider.md)