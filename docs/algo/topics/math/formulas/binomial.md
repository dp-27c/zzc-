---
title: "二项式类"
sidebarOutline: true
---

# 二项式类

1. 斯特林反演+二项式反演推理，通过用 NTT 求 斯特林子集n数

$$
\Large S_{n}^{k}=\frac{1}{k!}\sum_{j=0}^{k}(-1)^{k-j}C_{k}^{j}\ j^n=\frac{k!}{k!}\sum_{j=0}^{k}\ \frac{j^n}{j!}\ \frac{(-1)^{k-j}}{(k-j)!}=\sum_{j=0}^{k}A_j\ B_{k-j}
$$

其中 $\large \displaystyle A_i=\frac{i^n}{i\ !},B_i=\frac{(-1)^{i}}{i\ !}$
