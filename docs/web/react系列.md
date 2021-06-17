---
sidebar: auto
---
# react系列

## react-hooks 原理
本篇文章主要从<code>react-hooks</code>起源，原理，源码角度，开始剖析<code>react-hooks</code>运行机制和内部原理，相信这篇文章过后，对于面试的时候那些<code>hooks</code>问题，也就迎刃而解了。实际<code>react-hooks</code>也并没有那么难以理解，听起来很<code>cool</code>，实际就是函数组件解决没有<code>state</code>，生命周期，逻辑不能复用的一种技术方案。

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

老规矩,🤔️🤔️🤔️我们带着疑问开始今天的探讨(能回答上几个，自己可以尝试一下，掌握程度)：
1. 在无状态组件每一次函数上下文执行的时候，react用什么方式记录了hooks的状态？
2. 多个react-hooks用什么来记录每一个hooks的顺序的 ？ 换个问法！为什么不能条件语句中，声明hooks? hooks声明为什么在组件的最顶部？
3. function函数组件中的useState，和 class类组件 setState有什么区别？
4. react 是怎么捕获到hooks的执行上下文，是在函数组件内部的？
5. useEffect,useMemo 中，为什么useRef不需要依赖注入，就能访问到最新的改变值？
6. useMemo是怎么对值做缓存的？如何应用它优化性能？
7. 为什么两次传入useState的值相同，函数组件不更新?
...

![react1](https://vin668.oss-cn-hangzhou.aliyuncs.com/img/react1.jpg)

如果你认真读完这篇文章，这些问题全会迎刃而解。

### function组件和class组件本质的区别

在解释react-hooks原理的之前，我们要加深理解一下， 函数组件和类组件到底有什么区别，废话不多说，我们先看 两个代码片段。
```js
class Index extends React.Component<any,any>{
    constructor(props){
        super(props)
        this.state={
            number:0
        }
    }
    handerClick=()=>{
       for(let i = 0 ;i<5;i++){
           setTimeout(()=>{
               this.setState({ number:this.state.number+1 })
               console.log(this.state.number)
           },1000)
       }
    }

    render(){
        return <div>
            <button onClick={ this.handerClick } >num++</button>
        </div>
    }
}
```
打印结果？
再来看看函数组件中：
```js

function Index(){
    const [ num ,setNumber ] = React.useState(0)
    const handerClick=()=>{
        for(let i=0; i<5;i++ ){
           setTimeout(() => {
                setNumber(num+1)
                console.log(num)
           }, 1000)
        }
    }
    return <button onClick={ handerClick } >{ num }</button>
}
```
打印结果？
------------公布答案-------------

在第一个例子🌰打印结果： 1 2 3 4 5

在第二个例子🌰打印结果： 0 0 0 0 0

这个问题实际很蒙人，我们来一起分析一下,第一个类组件中，由于执行上setState没有在react正常的函数执行上下文上执行，而是setTimeout中执行的，批量更新条件被破坏。原理这里我就不讲了,所以可以直接获取到变化后的state。

但是在无状态组件中，似乎没有生效。原因很简单，在class状态中，通过一个实例化的class，去维护组件中的各种状态；但是在function组件中，没有一个状态去保存这些信息，每一次函数上下文执行，所有变量，常量都重新声明，执行完毕，再被垃圾机制回收。所以如上，无论setTimeout执行多少次，都是在当前函数上下文执行,此时num = 0不会变，之后setNumber执行，函数组件重新执行之后，num才变化。

所以， 对于class组件，我们只需要实例化一次，实例中保存了组件的state等状态。对于每一次更新只需要调用render方法就可以。但是在function组件中，每一次更新都是一次新的函数执行,为了保存一些状态,执行一些副作用钩子,react-hooks应运而生，去帮助记录组件的状态，处理一些额外的副作用。

### 一 初识：揭开hooks的面纱

#### 1 当我们引入hooks时候发生了什么？

我们从引入 hooks开始，以useState为例子，当我们从项目中这么写：
```js
import { useState } from 'react'
```
于是乎我们去找useState,看看它到底是哪路神仙？

<code>react/src/ReactHooks.js</code>

useState
```js
export function useState(initialState){
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```
useState() 的执行等于 dispatcher.useState(initialState) 这里面引入了一个dispatcher，我们看一下resolveDispatcher做了些什么？

resolveDispatcher
```js
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current
  return dispatcher
}
```
ReactCurrentDispatcher
<code>react/src/ReactCurrentDispatcher.js</code>
```js
const ReactCurrentDispatcher = {
  current: null,
};
```
我们看到ReactCurrentDispatcher.current初始化的时候为null，然后就没任何下文了。我们暂且只能把**ReactCurrentDispatcher**记下来。看看ReactCurrentDispatcher什么时候用到的 ？

### 2 开工造物，从无状态组件的函数执行说起

想要彻底弄明白hooks，就要从其根源开始，上述我们在引入hooks的时候，最后以一个ReactCurrentDispatcher草草收尾，线索全部断了，所以接下来我们只能从函数组件执行开始。

renderWithHooks 执行函数

对于function组件是什么时候执行的呢？

<code>react-reconciler/src/ReactFiberBeginWork.js</code>

function组件初始化：
```js
renderWithHooks(
    null,                // current Fiber
    workInProgress,      // workInProgress Fiber
    Component,           // 函数组件本身
    props,               // props
    context,             // 上下文
    renderExpirationTime,// 渲染 ExpirationTime
);
```
对于初始化是没有current树的，之后完成一次组件更新后，会把当前workInProgress树赋值给current树。

function组件更新：
```js
renderWithHooks(
    current,
    workInProgress,
    render,
    nextProps,
    context,
    renderExpirationTime,
);
```
我们从上边可以看出来，renderWithHooks函数作用是调用function组件函数的主要函数。我们重点看看renderWithHooks做了些什么？