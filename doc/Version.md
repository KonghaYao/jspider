# Version 情况
> 为了更好的让使用者了解我对每个版本的更改情况，我会将版本信息写在下面便于查看
# [JSpider](./JSpider.md)

## 1.3.15
-  修复一些 Copy 的 BUG ;

## 1.3.14
- Copy 模块加入，可以通过 extend 使用

## 1.3.8
- 完善了一下教程网站

## 1.3.5
- 修复了 Search 模块的 searchObj 
- 更新教程了

## 1.3.4
- 修改了部分的Ajax模块代码，使得请求结果依靠blob 的type，自动处理
- !!!从此版本后 hook 函数开启第二参数 async ,目的是分清楚代理 Promise 和非 Promise 函数