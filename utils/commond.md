### 发布到 npm

- 添加用户：`npm adduser`
- 升级版本

&emsp; 升级补丁版本号：npm version patch
&emsp; 升级小版本号：npm verson minor
&emsp; 升级大版本号：npm version major

- 发布版本：`npm publish`

### 代码提交规范

#### 良好的 Git commit 规范优势：

- 加快 Code Review 的流程
- 根据 Git Commit 的元数据生成 Changelog
- 后续维护者可以知道 Feature 被修改的原因

#### 提交格式要求

~~~
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
~~~

**对格式的说明如下：**
- type 代表某次提交的类型，比如是修复一个 bug 还是增加一个新的 feature。所有的 type 类型如下：
- feat：新增 featuer
- fix：修复bug
- docs：仅仅修改了文档，比如：README，CHANGELOG，CONTRIBUTE 等等
- style：仅仅修改了空格，格式锁紧，等号等等，不改变代码逻辑
- refactor：代码重构，没有加新功能或修复 bug
- perf：优化相关，比如提升性能，体验
- test：测试用例，包括单元测试，集成测试等
- chore：改变构建流程，或者增加依赖库，工具等
- revert：回滚到上一个版本

#### 本地开发阶段增加 precommit 钩子

**安装 husky**

~~~
npm install husky -D
~~~

#### 通过 commitmsg 钩子校验信息

~~~
"script": {
    "commitmsg": "validate-commit-msg",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}

"devDependencies": {
    "validate-commit-msg": "^2.11.1",
    "conventional-changelog-cli": "^1.2.0",
    "husky":"^0.13.1"
}
~~~