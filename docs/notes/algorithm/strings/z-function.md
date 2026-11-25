---
title: Z 数组（E 数组）
algorithms: []
sidebarOutline: true
---

# Z 数组（E 数组）

## 讲解：

待补图片（Pasted image 20260806201723.png）


Z函数：
`z[i] 表示以 i 为开头的后缀 与 整个字符串 的最长公共前缀长度` 
## Code（模板）
```c++
void solve() // ll
{
    string a,b;cin>>a>>b;
    auto Z=[&](string &s)// 用于求出字符串 s 的Z函数
    {
        vi z(s.size(),0);z[0]=s.size();
        int c=0,r=0;
        for(int i=1;i<s.size();++i) 
        {
            int len=i<r?min(z[i-c],r-i):0;
            while(i+len<s.size()&&len<s.size()&&s[i+len]==s[len]) ++len;
            if(r<i+len) r=i+len,c=i;
            z[i]=len;
        }
        return z;
    };
    vi z=Z(b);
    // 下面用于演示 b 为主串，a 为匹配串
    // 又叫 e 数组
    vi e(a.size(),0);
    int c=0,r=0;
    for(int i=0;i<a.size();++i)
    {
        int len = i<r ? min(z[i-c],r-i):0;
        while(i+len<a.size()&&len<b.size()&&a[i+len]==b[len]) ++len;// 注意len大小不要超限
        if(r<i+len) r=i+len,c=i;
        e[i]=len;
    }
};
```

