# Task

## Task 是什么？

Task 是用户输入的数据封装成的可以被其他系统所调用的 **基础对象**。其中封装的管理属性的 Class 为 Data，而对外的方法由 Task 继承 Data 后写入。

## Task 与 TaskGroup 的关系

Task 归属于唯一一个 TaskGroup，而 TaskGroup 包含多个 Task，Task 不能归属于多个 TaskGroup。

Task 拥有全局的生命，而 TaskGroup 只有在完成一项任务的时候才有存在的意义，所以 TaskGroup 是临时的。（天下无不散之宴席）

## Task 与 Data 的关系

Data 是保存数据的最小单位，保存的是可以持久化的数据，Task 是 Data 的

## TaskGroup 的用途。

1. TaskGroup 一般具有注册和销毁的功能，在执行需要多个 Task 的聚合类操作的时候需要它的存在。

2. TaskGroup 的 API 具有扩散功能，对于 TaskGroup 的报错会扩散到所有 Task 身上。

## Task 中的 Event

Task 中可以直接向 EventHub 进行 Event 触发，通过 EventHub，其他的系统可以拥有更好的监控 Task 的方式。

TaskGroup 通过 EventHub 的 emit 来实现 Event 的扩散作用。

## Task 各项参数解析

1. \_status: Task 状态只能通过固定的事件驱动函数触发。如触发 error 事件时，会更改为 error 状态，然后调用自定义的函数。

2. \_process: 用于系统中的各个阶段返回的数据的切片数组。这个数组是一个收集装置。当 Task 开始进行一项任务的时候，会先进行 “打卡”（punch in） 的动作来创建一个 Record 记录实例，然后交给 Task 中的 \_process。
