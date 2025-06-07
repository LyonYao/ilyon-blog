# 博客应用测试环境设置指南

本文档介绍如何设置和运行博客应用的自动化测试。

## 前提条件

1. 确保已安装 Node.js (v14+) 和 npm
2. 确保博客前端应用和API服务都已启动：
   - 前端应用运行在 http://localhost:3000
   - API服务运行在 http://localhost:5000

## 测试环境设置

### 1. 使用初始化账号

测试将使用系统中已初始化的admin账号：

```
用户名: admin
密码: password123
```

确保该账号在系统中可用，如果不存在，可以通过API创建：

```bash
# 启动API服务
cd blog-api
python app.py

# 在另一个终端中，使用curl创建用户
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123","email":"admin@example.com","role":"admin"}'
```

### 2. 安装测试依赖

```bash
# 创建package.json文件
npm init -y

# 安装Puppeteer和其他依赖
npm install puppeteer fs-extra path
```

### 3. 创建测试目录结构

```bash
mkdir -p test-screenshots
```

## 运行测试

```bash
# 确保前端和API服务都在运行
cd blog-api
python app.py

# 在另一个终端中
cd blog-app
npm start

# 在第三个终端中运行测试
node blog-test.js
```

## 测试结果

测试完成后，将生成以下文件：

1. `test-screenshots/` - 包含测试过程中的所有截图
2. `test-report.json` - 包含详细的测试数据
3. `test-results.md` - 可读的测试报告

## 常见问题

### 1. 浏览器启动失败

如果遇到浏览器启动问题，可以尝试以下解决方案：

```javascript
// 修改blog-test.js中的浏览器启动选项
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1280, height: 800 },
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu'
  ]
});
```

### 2. 选择器匹配失败

如果测试失败并显示选择器匹配错误，可能是因为前端应用的HTML结构与测试脚本中的选择器不匹配。请检查前端应用的实际DOM结构，并相应地更新测试脚本中的选择器。

### 3. 测试超时

如果测试步骤超时，可以增加等待时间：

```javascript
// 增加导航超时时间
page.setDefaultNavigationTimeout(60000);

// 增加等待选择器的超时时间
await page.waitForSelector('.selector', { timeout: 10000 });
```