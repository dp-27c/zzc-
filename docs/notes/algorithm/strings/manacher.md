---
title: 回文半径与 Manacher
algorithms: []
sidebarOutline: true
---

# 回文半径与 Manacher

## Manacher
目的：
求字符串的最长回文子串
该模板范围的是 

`ans 最长回文子串的长度`
`p[i] 以 i 为中心的回文半径(预处理后的)` 转化关系如下代码

### 讲解：

待补图片（Pasted image 20260806193107.png）


### Code:
```cpp
void solve() // ll
{
    string ss,s;cin>>ss;
    // 预处理原串
    for(int i=0;i<ss.size();++i) s.push_back('#'),s.push_back(ss[i]);
    s.push_back('#');
    // r 是扩的范围的最右边，c则是最新一次扩边的回文中心
    int r=1,c=0,ans=0;
    vi p(s.size(),0);// p数组 表示以i为中心的回文半径
    // 实际上就 不断往右边扩点：
    // i 在范围内，则可以确定已知范围，然后继续外扩
    // i 在外围外，则暴力
    for(int i=0;i<s.size();++i)
    {
        int len=r>i?min(p[2*c-i],r-i):1;
        while(i-len>=0&&i+len<s.size()&&s[i-len]==s[i+len]) ++len;
        if(i+len>r) r=i+len,c=i;
        p[i]=len;
        ans=max(ans,p[i]-1);// p[i] - 1 是处理后的数组的回文半径 与 原数组的回文长度转换
    }
    cout<<ans<<endl;
};
```
