
Yayoi UI 项目
============

# 如何测试开发
## 前置条件
需要安装[nodejs][nodejs](可以不是最新版本)

## Demo查看
1. 在shell中输入以下命令运行建议服务器(**端口号可根据实际占用情况调整**)
```shell
node ./httpServer.js 9090
 ```
2. 打开浏览器地址 http://localhost:9090/html/index.html 进入主页

# 如何使用该框架
1. 使用该框架需先引入jQuery框架
```html
<script type="text/javascript"src="../js/jquery.min.js"></script>
```
2. 将[yayoi-ui-core.js][152221b6]和同目录的文件夹[yayoi][152221b7]拷贝到自己的项目中**不要破坏两者的路径结构,项目代码会自动根据组件全名来搜索组件js文件并载入**
3. 在html页面引入基础的[yayoi-ui-core.js][152221b6]即可
```html
<script type="text/javascript" src="../src/yayoi-ui-core.js" data-init="startYayoi" data-devMode="true"></script>
```

[152221b6]: ./src/yayoi-ui-core.js "核心的js文件"
[152221b7]: ./src/yayoi "组件文件夹"
[nodejs]: https://nodejs.org/en/ "nodejs官网"
