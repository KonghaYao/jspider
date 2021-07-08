# Task

## Task 是什么？

Task 是用于将用户输入的数据封装成可以被 JSpider 使用的拥有统一的 API 的 Class。

## Task 与 TaskGroup 的关系

Task 归属于唯一一个 TaskGroup，而 TaskGroup 包含多个 Task，Task 不能归属于多个 TaskGroup。

Task 拥有全局的生命，而 TaskGroup 只有在完成一项任务的时候才有存在的意义，所以 TaskGroup 是临时的。（天下无不散之宴席）

## TaskGroup 的用途。

1. TaskGroup 一般具有注册和销毁的功能，在执行需要多个 Task 的聚合类操作的时候需要它的存在。

2. TaskGroup 的 API 具有扩散功能，对于 TaskGroup 的报错会扩散到所有 Task 身上。

## Task 的状态问题

Task 状态只能通过固定的事件驱动函数触发。如触发 error 事件时，会更改为 error 状态，然后产生
