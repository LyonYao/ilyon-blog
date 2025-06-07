/**
 * 博客应用测试执行脚本
 * 
 * 这个脚本用于执行博客应用的自动化测试，并生成测试报告
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);

// 测试配置
const config = {
  apiPort: 5000,
  frontendPort: 3000,
  testTimeout: 300000, // 5分钟超时
  screenshotsDir: path.join(__dirname, 'test-screenshots'),
  reportsDir: path.join(__dirname, 'test-reports')
};

// 确保目录存在
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// 启动API服务
async function startApiServer() {
  console.log('正在启动API服务...');
  
  try {
    const apiProcess = exec('cd ../blog-api && python app.py', {
      env: { ...process.env, PORT: config.apiPort.toString() }
    });
    
    // 将输出重定向到控制台
    apiProcess.stdout.pipe(process.stdout);
    apiProcess.stderr.pipe(process.stderr);
    
    // 等待服务启动
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`API服务已启动在端口 ${config.apiPort}`);
    
    return apiProcess;
  } catch (error) {
    console.error('启动API服务失败:', error);
    throw error;
  }
}

// 启动前端服务
async function startFrontendServer() {
  console.log('正在启动前端服务...');
  
  try {
    const frontendProcess = exec('cd ../blog-app && npm start', {
      env: { ...process.env, PORT: config.frontendPort.toString() }
    });
    
    // 将输出重定向到控制台
    frontendProcess.stdout.pipe(process.stdout);
    frontendProcess.stderr.pipe(process.stderr);
    
    // 等待服务启动
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log(`前端服务已启动在端口 ${config.frontendPort}`);
    
    return frontendProcess;
  } catch (error) {
    console.error('启动前端服务失败:', error);
    throw error;
  }
}

// 创建测试用户
async function createTestUser() {
  console.log('使用已初始化的admin账号...');
  
  try {
    const userData = {
      username: 'admin',
      password: 'password123',
      email: 'admin@example.com',
      role: 'admin'
    };
    
    const curl = `curl -X POST http://localhost:${config.apiPort}/api/auth/register -H "Content-Type: application/json" -d '${JSON.stringify(userData)}'`;
    
    const { stdout, stderr } = await execPromise(curl);
    
    if (stderr) {
      console.error('创建用户时出错:', stderr);
    } else {
      console.log('测试用户创建成功:', stdout);
    }
  } catch (error) {
    console.warn('创建用户失败，可能用户已存在:', error.message);
  }
}

// 运行测试
async function runTests() {
  console.log('正在运行测试...');
  
  try {
    const { stdout, stderr } = await execPromise('node blog-test.js', {
      timeout: config.testTimeout
    });
    
    console.log('测试输出:', stdout);
    
    if (stderr) {
      console.error('测试错误:', stderr);
    }
  } catch (error) {
    console.error('测试执行失败:', error);
    throw error;
  }
}

// 生成HTML测试报告
function generateHtmlReport() {
  console.log('正在生成HTML测试报告...');
  
  try {
    // 读取JSON测试报告
    const reportPath = path.join(__dirname, 'test-report.json');
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    // 创建HTML报告
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>博客应用测试报告</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    .header {
      background-color: #3498db;
      color: white;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .summary {
      display: flex;
      justify-content: space-between;
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .summary-item {
      text-align: center;
    }
    .test-case {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 15px;
    }
    .test-case.passed {
      border-left: 5px solid #2ecc71;
    }
    .test-case.failed {
      border-left: 5px solid #e74c3c;
    }
    .status {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 3px;
      color: white;
      font-weight: bold;
    }
    .status.passed {
      background-color: #2ecc71;
    }
    .status.failed {
      background-color: #e74c3c;
    }
    .screenshots {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    .screenshot {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
    }
    .screenshot img {
      max-width: 100%;
      border-radius: 3px;
    }
    .timestamp {
      color: #7f8c8d;
      font-size: 0.9em;
    }
    .error {
      background-color: #ffecec;
      color: #e74c3c;
      padding: 10px;
      border-radius: 3px;
      margin-top: 10px;
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>博客应用测试报告</h1>
    <p>测试用户: 管理员(admin)</p>
  </div>
  
  <div class="summary">
    <div class="summary-item">
      <h3>开始时间</h3>
      <p>${new Date(report.startTime).toLocaleString()}</p>
    </div>
    <div class="summary-item">
      <h3>结束时间</h3>
      <p>${new Date(report.endTime).toLocaleString()}</p>
    </div>
    <div class="summary-item">
      <h3>持续时间</h3>
      <p>${report.duration} 秒</p>
    </div>
    <div class="summary-item">
      <h3>通过测试</h3>
      <p>${report.passed}</p>
    </div>
    <div class="summary-item">
      <h3>失败测试</h3>
      <p>${report.failed}</p>
    </div>
  </div>
  
  <h2>测试用例结果</h2>
  
  ${report.tests.map(test => `
    <div class="test-case ${test.status}">
      <h3>${test.name}</h3>
      <p><span class="status ${test.status}">${test.status === 'passed' ? '通过' : '失败'}</span></p>
      <p class="timestamp">执行时间: ${new Date(test.timestamp).toLocaleString()}</p>
      ${test.error ? `<div class="error">${test.error}</div>` : ''}
    </div>
  `).join('')}
  
  <h2>测试截图</h2>
  
  <div class="screenshots">
    ${report.screenshots.map(screenshot => `
      <div class="screenshot">
        <h4>${screenshot.name}</h4>
        <img src="test-screenshots/${path.basename(screenshot.path)}" alt="${screenshot.name}" />
        <p class="timestamp">截图时间: ${new Date(screenshot.timestamp).toLocaleString()}</p>
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;
    
    // 保存HTML报告
    ensureDirectoryExists(config.reportsDir);
    fs.writeFileSync(path.join(config.reportsDir, 'test-report.html'), html);
    console.log('HTML测试报告已生成');
  } catch (error) {
    console.error('生成HTML报告失败:', error);
  }
}

// 主函数
async function main() {
  console.log('===== 博客应用测试执行开始 =====');
  
  // 确保目录存在
  ensureDirectoryExists(config.screenshotsDir);
  ensureDirectoryExists(config.reportsDir);
  
  let apiProcess = null;
  let frontendProcess = null;
  
  try {
    // 启动服务
    apiProcess = await startApiServer();
    frontendProcess = await startFrontendServer();
    
    // 创建测试用户
    await createTestUser();
    
    // 运行测试
    await runTests();
    
    // 生成HTML报告
    generateHtmlReport();
    
    console.log('===== 博客应用测试执行完成 =====');
  } catch (error) {
    console.error('测试执行过程中发生错误:', error);
  } finally {
    // 关闭服务
    if (apiProcess) {
      apiProcess.kill();
      console.log('API服务已关闭');
    }
    
    if (frontendProcess) {
      frontendProcess.kill();
      console.log('前端服务已关闭');
    }
  }
}

// 执行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  startApiServer,
  startFrontendServer,
  createTestUser,
  runTests,
  generateHtmlReport
};