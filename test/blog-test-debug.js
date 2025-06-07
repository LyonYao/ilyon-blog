/**
 * 博客应用登录测试调试脚本
 */

const puppeteer = require('puppeteer');

async function debugLogin() {
  console.log('开始登录调试...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox'],
    slowMo: 100 // 放慢操作速度，便于观察
  });
  
  const page = await browser.newPage();
  
  try {
    // 打开登录页面
    console.log('打开登录页面...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
    
    // 等待表单加载
    await page.waitForSelector('.auth-form');
    console.log('登录表单已加载');
    
    // 输入用户名和密码
    console.log('输入用户名: admin');
    await page.type('#username', 'admin');
    
    console.log('输入密码: password123');
    await page.type('#password', 'password123');
    
    // 截图登录表单
    await page.screenshot({ path: 'login-form.png' });
    console.log('已截图登录表单');
    
    // 点击登录按钮
    console.log('点击登录按钮...');
    await Promise.all([
      page.click('.auth-button'),
      // 不等待导航完成，避免因导航问题阻塞测试
      new Promise(resolve => setTimeout(resolve, 5000))
    ]);
    
    // 截图登录结果
    await page.screenshot({ path: 'login-result.png' });
    console.log('已截图登录结果');
    
    // 获取当前URL
    const url = page.url();
    console.log(`当前URL: ${url}`);
    
    // 检查是否有错误消息
    const errorElement = await page.$('.auth-error');
    if (errorElement) {
      const errorText = await page.$eval('.auth-error', el => el.textContent);
      console.log(`登录错误: ${errorText}`);
    }
    
    // 检查页面内容
    const pageContent = await page.content();
    console.log('页面内容包含"dashboard":', pageContent.includes('dashboard'));
    console.log('页面内容包含"退出":', pageContent.includes('退出'));
    console.log('页面内容包含"Logout":', pageContent.includes('Logout'));
    
    // 等待用户查看
    console.log('调试完成，请查看浏览器窗口了解登录结果');
    console.log('按Ctrl+C退出程序');
    
    // 保持浏览器打开状态
    await new Promise(resolve => setTimeout(resolve, 300000)); // 等待5分钟
    
  } catch (error) {
    console.error('调试过程中出错:', error);
  } finally {
    await browser.close();
  }
}

debugLogin().catch(console.error);