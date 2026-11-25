---
title: "二进制常用技巧总结（可用于数位dp,异或）"
algorithms: []
sidebarOutline: true
---

# 二进制常用技巧总结（可用于数位dp,异或）

注意：
$m$ 位的二进制数虽然有 $2^m$ 种，但是如果加入限制条件，这个种数会大大减少，比如下面第二个

## 判断一个数的二进制是否具有相邻的1

```
int check(int x){return ((x)&((x)>>1));}
``` 

是具有则返回 1 。
按道理取反即可，下面同理

## 判断 这个数的二进制数中1的位置的相邻两位之内不能有其他1

```
int check(int x)
{
    return !((x)&((x)>>1)||(x)&((x)>>2));
}
```

注意：对于十位二进制数中，符合这个条件的个数只有 60 个而不是 1e3 的次方数

## 返回一个数的二进制1的个数：

```
int count(int x)
{
    int cnt=0;
    while(x){cnt=(x&1?cnt+1:cnt),x>>=1;}
    return cnt;
}
```

## 判断 两个数 x 和 y 满足 二进制下，y有0的位置上，x不能有1：

```
bool check(int x,int y)
{
	return (y|x)==y;
}
```

## 判断两个数之间异或后1的个数的奇偶性

```
bool check(int x,int y)
{
    int cnx=0,cny=0;
    rep(i,0,32){
        if(x>>i&1) cnx++;
        if(y>>i&1) cny++;
    }
    return (cnx%2==cny%2); //符合则为偶数
}
```

这个方法在大量运算的过程中适用，不需要对每个数对`{x,y}`做分析
