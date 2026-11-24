---
title: 基础工具
sidebarOutline: true
---

# 基础工具

## 计算几何：
```cpp
// cout<<fixed<<setprecision(10)<< (double) val<<endl; long double 的输出
```
## 计算几何头：
```cpp
#define ld long double
#define sqrt sqrtl
#define fabs fabsl
#define cos cosl
#define acos acosl
#define sin sinl
#define atan2 atan2l
#define abs fabs
```
## 生成随机数
```cpp
// 这个放全局
std::random_device rd;// 随机函数
std::mt19937 g(rd());
// 这个可以放局部
std::uniform_int_distribution<int> uni_int(l, r); // l 和 r 是参数
int id1=uni_int(g),id2=uni_int(g);// g 就是第二行 你设定的种子
// 随机排序
shuffle(pp.begin()+1,pp.end(),g);
```
