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


### 语义化版本（Semantic Versioning）规范格式

#### 开源项目版本信息案例

- 软件的版本通常由三位组成，形如:X.Y.Z
- 版本是严格递增的，此处是：16.2.0 -> 16.3.0 -> 16.3.1
- 在发布重要版本是，可以发布 alpha，rc 等先行版本

#### 遵守 Semver 规范优势

- 避免出现循环依赖
- 依赖冲突减少

#### 语义化版本格式规范

- 主版本号：当你做了不兼容的 API 修改
- 次版本号：当你做了向下兼容的功能性新增
- 修订号：当你做了向下兼容的问题修正

#### 先行版本号

- alpha：是内部测试版本，一般不向外发布，会有很多 bug。
- beta：也是测试版，这个阶段的版本会一直加入新的功能。在 alpha 版本以后推出
- rc: 系统平台上就是发行候选版本。RC 版不会再加入新的功能，主要用于除错。