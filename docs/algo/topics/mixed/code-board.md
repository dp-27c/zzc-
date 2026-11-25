---
title: 代码板
sidebarOutline: true
---

# 代码板

大头文件：

```cpp
#define _CRT_SECURE_NO_WARNINGS // 忽略scanf的不安全性

#include <bits/stdc++.h>
#include <unordered_map>
#include <random>
using namespace std;                          // 存一下这个nb代码
const int N = 4e6+7;                          // 数组上限

const double eps = 1e-9; // 最小可忽略
int const mod = 998244353;//1e9+7;//1e18;//1e6+7;//mod运算
#define endl "\n"
#define ll long long
#define ld long double
// #define ld double
// #define cp complex
#define int ll
// #define int unsigned short
#define pii pair<int, int> // 此int 已经是 ll 了
#define vi vector<int>
#define vii vector<vi>
#define rep(i, l, r) for (int i = (l); i <= (r); ++i)
typedef long long LL;
const int inf = -1061109568,INF = 0x3f3f3f3f3f3f3f3f;
int lowbit(int x) { return x & (-x); }
// cout<< fixed << setprecision(3) 
//cout.flush();
//(__int128)
// 上述
//
// 这个放全局
// std::random_device rd;// 随机函数
// std::mt19937 g(rd());

const ld PI=(ld)3.141592653589793;
//1004535809
int Mod(int a,int M){return (a%M+M)%M;}
int ksm(int x, int k,int M)
{
    int sum = 1;
    x%=M;
    while (k)
    {
        if (k & 1)
            sum = (sum * x) % M;
        x = (x * x) % M, k >>= 1;
    }
    return sum;
}
int gcd(int a,int b){return b?gcd(b,a%b):a;}
void solve() // ll 
{

}
signed main()
{
    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);
    ios::sync_with_stdio(0); cin.tie(0); cout.tie(0);
    int t_ = 1;
    // cin>>t_;
    // init_inv(N-1,mod);
    // init();
    while (t_--) { solve(); }
    return 0;
}
// ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
```


小头：

```cpp
// std::string::npos --  s.find(str) ,没找到返回这个，否则为第一个符合条件的子串的第一个字符的位置。
// int upbit(int x)//(1<<62)
// {
//     if(x<=0) return 1;
//     x--;
//     x|=x>>1;
//     x|=x>>2;
//     x|=x>>4;
//     x|=x>>8;
//     x|=x>>16;
//     x|=x>>32; //(1<<62) 之前 
//     return x+1;
// }

// int gcd(int a,int b){return b?gcd(b,a%b):a;}
// int ksm(int x, int k,int M)
// {
//     int sum = 1;
//     x%=M;
//     while (k)
//     {
//         if (k & 1)
//             sum = (sum * x) % M;
//         x = (x * x) % M, k >>= 1;
//     }
//     return sum;
// }

// int interval_yuhe(int l,int r)// 快速求l 到 r 的与和
// {
//     while(l<r)// 找到区间公共位
//     {
//         r-=lowbit(r);
//     }
//     return r;
// }

// int count_bit(int x)// 32 位整数,64位，可以提前>>32
// {
//     x=(x&0x55555555)+((x>>1)&0x55555555);
//     x=(x&0x33333333)+((x>>2)&0x33333333);
//     x=(x&0x0f0f0f0f)+((x>>4)&0x0f0f0f0f);
//     x=(x&0x00ff00ff)+((x>>8)&0x00ff00ff);
//     x=(x&0x0000ffff)+((x>>16)&0x0000ffff);
//     // 如果有 64 位，可以一半一半进行32位的整数1 计算。
//     return x;
// }

// int flip_bit(int x)// 32 位int
// {
//     x=((x&0xaaaaaaaa)>>1)|((x&0x55555555)<<1);
//     x=((x&0xcccccccc)>>2)|((x&0x33333333)<<2);
//     x=((x&0xf0f0f0f0)>>4)|((x&0x0f0f0f0f)<<4);
//     x=((x&0xff00ff00)>>8)|((x&0x00ff00ff)<<8);
//     x=(x>>16)|(x<<16);
//     return x;
// }

```
