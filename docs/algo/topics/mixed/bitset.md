---
title: bitset
sidebarOutline: true
---

# bitset

## 创建：


```cpp
bitset<10> bt(123);
bitset<10> bt2("111011")
```

创建了一个 bitset ，由长度为 10 的 01 串构成，内存占用为 4
同时将 123 十进制 转 二进制，如果超过 10 位二进制的数将不会显示。

下面则是字符串赋值，变成 $0000111011$


## 总结：


```cpp
void solve() // ll
{                  
    bitset<15> bt(114514);
    cout<<bt<<endl;// 01 串输出，第 i 个就是 倒数第 i 个输出
    bt[3]=1; // 直接给第 i 个位置上赋值
    bt.set(4);// 有参：将第 i 个位置设为 1，无参：将所有位置设为 1
    bt.reset(3);// 有参：将第 i 个位置设为 0，无参将所有位置设为 0
    bt.flip(3);// 有参：翻转第 i 个位置，无参，翻转所有位置。

    cout<<sizeof(bt)<<endl;// 专用内存
    cout<<bt.count()<<endl;// 数 1 的个数
    cout<<bt.none()<<endl;// 判断是否有1，有则0，无则1
    cout<<bt.any()<<endl;// 判断是否有1，有则1，无则0
    cout<<bt.test(3)<<endl;// 测试第 i 位上是 1 还是 0，是1 则1.
    cout<<bt.to_ulong()<<endl;// 将bt的二进制转成十进制
    cout<<bt.to_string()<<endl;// 将二进制数转成 01 字符串输出

	bitset<15> bt2("111011")
    cout<<(bt1==bt)<<endl;// 比较相等（前提是两个bt的大小一样，否则报错）
    // bitset 无法进行大小比较。
    cout<<(bt1^bt)<<endl; // 位运算（前提是大小相等）
    cout<< (bt>>2) <<endl; // 同时也可以进行左移右移的操作
}
```
