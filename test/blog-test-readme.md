# 博客应用测试项目

这个项目包含对博客前端应用的自动化测试代码。测试使用admin账号进行操作，并记录测试结果。

## 项目结构

- `blog-test.js` - 主测试脚本
- `blog-test-config.js` - 测试配置文件
- `blog-test-results.md` - 测试结果报告
- `blog-test-package.json` - 项目依赖配置

## 测试内容

测试脚本模拟了用户曹操的以下操作：

1. **访问博客首页** - 验证页面加载和基本布局
2. **用户登录** - 使用admin账号登录系统
3. **浏览博客文章** - 查看文章列表和分页功能
4. **筛选文章** - 通过分类和标签筛选文章
5. **查看文章详情** - 打开并阅读完整文章
6. **创建新文章** - 创建一篇测试文章
7. **编辑文章** - 修改已创建的文章
8. **删除文章** - 删除测试文章
9. **用户登出** - 退出登录

## 如何运行测试

### 前提条件

1. 确保博客前端应用运行在 http://localhost:3000
2. 确保博客API运行在 http://localhost:5000
3. 安装Node.js (v14+)

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
npm test
```

### 以无头模式运行测试（不显示浏览器窗口）

```bash
npm run test:headless
```

## 测试报告

测试完成后，会生成以下文件：

1. `test-results.md` - 可读的测试报告
2. `test-report.json` - 详细的测试数据
3. `test-screenshots/` - 测试过程中的截图

## 自定义测试

可以通过修改 `blog-test-config.js` 文件来自定义测试参数，包括：

- 测试用户信息
- 测试文章内容
- 浏览器配置
- 截图设置
- 超时设置

## 注意事项

- 测试会创建真实的文章并在测试结束后删除
- 请确保使用测试环境运行，避免影响生产数据
- 测试用户需要预先在系统中创建