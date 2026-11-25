---
title: 博弈论
sidebarOutline: true
---

# 博弈论

通过枚举上一步来更新 vis 数组，这个代码能快速求出 sg 函数。
```cpp
for(sg[i]=0;vis[sg[i]]==i;sg[i]++);
```
