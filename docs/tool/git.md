---
sidebar: auto
---
# GIT
## git如何将本地文件关联到远程服务器
#### 第一步：选择目录
进入本地需要关联的目录（比如demo目录），然后

```Bash
git init
```
第二步：关联,origin后面的git地址从git远程复制
``` Bash
git remote add origin https://github.com/xxxx/xxx.git
```
或者
``` Bash
git remote add origin git@git.oschina.net:yourname/demo.git
```
第三步：查看
``` Bash
git fetch  -vv
```
可以看出有多少分支

第四步：更新
``` Bash
git pull
```
#### 可能会出现的问题：
如果第二步写错了：则
``` Bash
git remote rm origin   //删除origin
```
``` Bash
git remote add origin git@git.oschina.net:yourname/demo.git   //重新添加origin
```

如果报错：`-refusing to merge unrelated histories`,出现这个问题的最主要原因还是在于本地仓库和远程仓库实际上是独立的两个仓库。假如我之前是直接clone的方式在本地建立起远程github仓库的克隆本地仓库就不会有这问题了。

查阅了一下资料，发现可以在pull命令后紧接着使用--allow-unrelated-history选项来解决问题（该选项可以合并两个独立启动仓库的历史）。
``` Bash
git pull origin master –allow-unrelated-histories
```
接着
``` Bash
git push origin master:master
```

## git版本管理规范
#### 主分支master
> 首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。
git主分支的名字，默认叫做master。它是自动建立的，版本库初始化以后，默认就是在主分支在进行开发。
每发布一个正式版本，在master上建一个tag标记。
master分支是长期存在。

#### 开发分支develop
主分支只用来分布重大版本，日常开发应该在另一条分支上完成。我们把开发用的分支，叫做develop。
develop分支是长期存在。

#### 功能分支feature
功能分支是为了开发某种特定功能，从develop分支上面分出来的。开发完成后，要再并入develop。
功能分支的名字，可以采用feature/*的形式命名。
例如我需要开发一个登录功能：
``` Bash
git checkout -b feature/login develop
```
开发完成后，合并到develop分支：
``` Bash
# 切换到develop分支
git checkout develop
# 分支合并
git merge --no-ff feature/login
# 删除功能分支
git branch -d feature/login
```
#### 预发布分支release
预发布分支是指发布正式版本之前（即合并到master分支之前），我们可能需要有一个预发布的版本进行测试。
预发布分支是从develop分支上面分出来的，预发布结束以后，必须合并进develop和master分支。
它的命名，可以采用release/*的形式。
创建一个预发布分支：
``` Bash
git checkout -b release/v1.0.0 develop
```
确认没有问题后，合并到master分支：
``` Bash
git checkout master
git merge --no-ff release/v1.0.0
# 对合并生成的新节点，做一个标签
git tag -a v1.0.0
```
再合并到develop分支：
``` Bash
git checkout develop
git merge --no-ff release/v1.0.0
```
最后，删除预发布分支：
``` Bash
git branch -d release/v1.0.0
```

#### 修补bug分支hotfix
软件正式发布以后，难免会出现bug。这时就需要创建一个分支，进行bug修补。
修补bug分支是从master分支上面分出来的。修补结束以后，再合并进master和develop分支。
它的命名，可以采用hotfix/*的形式。
创建一个修补bug分支：
```Bash
git checkout -b fixbug/v1.0.0 master
```
修补结束后，合并到master分支：
```Bash
git checkout master
git merge --no-ff fixbug/v1.0.0
git tag -a v1.0.1
```
再合并到develop分支：
```Bash
git checkout develop
git merge --no-ff fixbug/v1.0.0
```
最后，删除"修补bug分支"：
```Bash
git branch -d fixbug/v1.0.0
```
#### 注意
1. 分支合并必须使用--no-ff参数
```Bash
# 对Develop分支进行合并
git merge --no-ff develop
```

#### 参考资料
Git分支管理策略 <http://www.ruanyifeng.com/blog/2012/07/git.html> <br>
git-flow图解 <http://blog.csdn.net/liubo2012/article/details/8515065> <br>
Git 版本管理工具 <http://blog.csdn.net/ithomer/article/details/7527877>

## git其他基本操作
1. 更新git remote 中所有的远程
```Bash
git fetch
```
2. 查看git所有远程远程
```Bash
git branch -a
```
3. 删除远程分支
```Bash
git push origin --delete origin/dev(远程分支名)
```
4. 删除本地分支
```Bash
# 需要切换到其他分支
git branch -D dev(本地分支名)
```
5. 暂存分支，拉取代码
```Bash
git stash 
git pull origin master 
git stash pop
```

## 开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支
```Bash
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```
### 当master代码改动了，需要更新开发分支（dev）上的代码
```Bash
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```
