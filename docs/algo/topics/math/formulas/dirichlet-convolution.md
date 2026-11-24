---
title: "狄利克雷卷积（开卷！！）"
sidebarOutline: true
---

# 狄利克雷卷积（开卷！！）

定义：
$f(n),g(n)$ 是 两个积性函数。
$\Large (\tilde{f}*\tilde{g})(n)=\sum_{d|n} f(d)g(n/d)=\sum_{d|n} f(n/d)g(d)$
这是 这个卷积的定义，只有做这样的运算时，看成$\sum_{d|n} f(d)$，而单独的 $f(n)$ 不能看成这样。
要将他们全都构造成多项式的狄利克雷生成函数，而不是一个简单的函数值：
比如：

规律： (上面都加上一个 ~)
满足交换律：$f*g=g*f$
满足结合律：$(f*g)*h=f*(g*h)$
满足分配律：$(f+g)*h=f*h+g*h$

三个常用的函数：
1.元函数 $\varepsilon (n)=[n==1]$ 怎么这么像 莫比乌斯函数的约数和

2.常函数：$1(n)=1$

3.恒等函数：${id}(n)=n$

## 常用函数的卷积关系：
1. $\large \sum_{d|n} \mu(d)=[n==1] => (\mu * 1)(n) =\varepsilon(n)$  
(这一步可以告诉我们，$\mu(n)$变成符合性质的公式时，只需要卷上 常函数)
2. $\large \sum_{d|n} \varphi(d)=n => (\varphi * 1)(n) =id(n) => \varphi*1=id$

3. $\large \sum_{d|n} \mu(d)*id(n/i)=\sum_{d|n} \mu(d)*(n/i)=\varphi(n) => \mu*id=\varphi$

4. $\large \tilde{f}*\varepsilon=\tilde{f}$

5. $\large \tilde{f}*1 \ne \tilde{f}$
