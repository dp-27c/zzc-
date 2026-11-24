---
title: 字符串
sidebarOutline: true
---

# 字符串

## 字符串输入：


```cpp
char s[100];
scanf(“%s”, s); // 遇到空格、换行符结束；忽略前导空格、换行符
// 正则表达式读取法
scanf(“%*c”); // 读取 输入文件 中的第一个待读字符并抛弃，俗称：吸收一个字符。
scanf(“%[^\n]”, s); // 读字符，直到遇到’\n’终止；’\n’成为待读的第一个字符。功能：读一行。
scanf(“%[^\n]%*c”, s); // 读字符，直到遇到’\n’终止；并吸收’\n’。可以避免遗留的’\n’对后续产生影响
scanf(“%[^ab\nc]”, s); // 读字符，遇到集合{‘a’，’b’，’c’，’\n’}中的任一字符终止；^表示否定含义
```



## 字符串相关函数：


```cpp
//string中,sort(),next_permutation(),reverse()都适用
string s;
cin>>s; //直接读入,有空格或换行符时停止
getline(cin,s);//取一行,遇到换行停止,注意如果前面有读取数字，需要先cin.ignore()清除缓冲区的'\n'
getline(cin,s,'e');//读一行,读到字符'e'停止,且抛弃字符'e'

//截取
s.substr(n,len);//从下标为n的位置(下标从0开始)开始取,取长度为len的字符串
s.substr(n);//从下标为n的位置(下标从0开始)开始取,取完整个字符串

//插入
s.insert(n,"abc");//在下标为n的位置之前插入"abc"串
s.insert(n,cnt,'X');//在下标为n的位置之前插入cnt个'X'字符
string s=s1+s2; // 使用 + 拼接字符串

//删除
s.erase(s.begin()+1,s.begin()+4);//删除索引1到3的字符(不含索引4)
s.erase(pos,len);//从下标为pos的位置开始删除长度为len的字符串
s.erase(pos);//从下标为pos的位置及后面的所有字符

//查找子串
s.find(str);//查找字符串str在当前字符串s中第一次出现的位置,如果未找到则返回std::string::npos
s.find(str,pos);//查找字符串str在当前字符串s的[pos,end]中第一次出现的位置

//替换
s.replace(7, 5, "banana");  // 从位置7开始，替换5个字符为"banana" 搭配find()食用更佳

//类型转换
string str=to_string(number);//整数转换成字符串(可用stringstream ss;ss<<number;string str;ss>>str;)
int number=stoi(str);//字符串转换成整数
const char* str = "123";//字符串转换成整数（C风格）
int number=atoi(str);;//字符串转换成整数（C风格）
isdigit(char);//检查字符是否为数字（0-9）。如果是数字，则返回 true；否则返回false。
isalpha(char);//检查字符是否为字母（a-z 或 A-Z）。如果是字母，则返回 true；否则返回false。
```



## KMP 字符串匹配


```cpp
void solve() // ll
{
    auto caozuo=[&](string s,int n,vi &ne)
    {
        ne.resize(n+1);
        ne[0]=0;
        for(int i=1,j;i<n;++i)
        {
            j=ne[i-1];
            while(j>0&&s[i]!=s[j]) j=ne[j-1];
            if(s[j]==s[i]) j++;
            ne[i]=j;
        }
    };
    vi ans;
    auto KMP=[&](string s1,int n1,string s2,int n2)
    {
        int i=0,j=0;
        vi ne;
        caozuo(s2,n2,ne);
        int pre=0;
        while(i<n1)
        {
            j=pre;
            while(j>0&&s1[i]!=s2[j]) j=ne[j-1];
            if(s1[i]==s2[j]) j++;
            if(j==n2) 
            {
                j=ne[j-1];
                ans.push_back(i-n2+1);
            }
            pre=j;
            ++i;
        }
    };
    string s1,s2;cin>>s1>>s2;
    int n1=s1.size(),n2=s2.size();
    KMP(s1,n1,s2,n2);
    for(auto x:ans) cout<<x+1<<endl;
}
```


## Manacher:


```cpp
string yuchuli(string s)
{
    string str="$#";
    for(auto c:s)
    {
        str.push_back(c),str.push_back('#');
    }
    return str;
}
void solve() // ll
{
    string s;cin>>s;
    s=yuchuli(s);
    vi d(s.length(),0);
    int mx=0,id=0;
    auto manacher=[&](string str)
    {
        d[1]=1;
        int n=str.length()-1;
        for(int i=2,l,r=1;i<=n;++i)
        {
            if(i<=r) d[i]=min(d[l+r-i],r-i+1);//查询盒子内的对称点的半径，取最大可以接受的半径
            while(str[i-d[i]]==str[i+d[i]]) d[i]++;//暴力拓展半径
            if(i+d[i]-1>r) l=i-d[i]+1,r=i+d[i]-1;//更新新盒子
            if(d[i]>mx)//找到最长半径的点和半径
            {
                id=i;mx=d[i];
            }
        }
    };
    manacher(s);
    int ans=(s[id]!='#');
    for(int i=id+1;i<=id+mx-1;++i) //暴力枚举去 # 号
        if(s[i]!='#') ans+=2;
    cout<<ans<<endl;
}
```
