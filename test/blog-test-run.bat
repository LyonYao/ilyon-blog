@echo off
echo 开始执行博客应用测试...

REM 创建截图目录
if not exist test-screenshots mkdir test-screenshots

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

REM 检查API服务是否运行
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% neq 0 (
  echo 警告: API服务似乎未运行，请确保API服务在端口5000上运行
  echo 是否继续? (Y/N)
  set /p continue=
  if /i "%continue%" neq "Y" exit /b 1
)

REM 检查前端服务是否运行
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
  echo 警告: 前端服务似乎未运行，请确保前端服务在端口3000上运行
  echo 是否继续? (Y/N)
  set /p continue=
  if /i "%continue%" neq "Y" exit /b 1
)

echo 运行测试脚本...
node blog-test.js

echo 测试完成!
echo 测试报告已保存到 test-results.md
echo 测试截图已保存到 test-screenshots 目录

pause