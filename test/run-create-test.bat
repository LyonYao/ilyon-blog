@echo off
echo 开始执行博客创建文章测试...

REM 创建截图目录
if not exist test-screenshots-create mkdir test-screenshots-create

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
  echo 错误: 未安装Node.js，请先安装Node.js
  exit /b 1
)

REM 检查是否安装了依赖
if not exist node_modules (
  echo 安装测试依赖...
  npm install puppeteer fs-extra path
  if %errorlevel% neq 0 (
    echo 错误: 安装依赖失败
    exit /b 1
  )
)

echo 运行创建文章测试脚本...
node blog-test-fixed-create.js

echo 测试完成!
echo 测试截图已保存到 test-screenshots-create 目录

pause