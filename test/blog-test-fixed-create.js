/**
 * 博客应用创建文章测试脚本
 * 专注于修复创建新文章功能
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 测试配置
const config = {
  baseUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:5000',
  screenshotDir: path.join(__dirname, 'test-screenshots-create'),
  user: {
    username: 'admin',
    password: 'password123',
    displayName: '管理员'
  },
  testPost: {
    title: '博客系统测试文章',
    content: '<p>这是一篇测试文章，用于验证博客系统的功能。</p><p>包括文章的创建、编辑和删除功能。</p>',
    category: '技术',
    tags: ['测试', '博客', '系统']
  }
};

// 确保截图目录存在
if (!fs.existsSync(config.screenshotDir)) {
  fs.mkdirSync(config.screenshotDir, { recursive: true });
}

// 保存截图
async function saveScreenshot(page, name) {
  const fileName = `${Date.now()}-${name.replace(/\\s+/g, '-')}.png`;
  const filePath = path.join(config.screenshotDir, fileName);
  
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`📸 截图已保存: ${fileName}`);
  return filePath;
}

// 主测试函数
async function testCreatePost() {
  console.log('🚀 开始测试创建新文章功能...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // 1. 登录
    console.log('正在登录...');
    await page.goto(`${config.baseUrl}/login`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.auth-form');
    
    // 填写登录表单
    await page.type('#username', config.user.username);
    await page.type('#password', config.user.password);
    await saveScreenshot(page, '填写登录表单');
    
    // 提交登录
    await Promise.all([
      page.click('.auth-button'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {})
    ]);
    
    // 等待确保页面加载完成
    await new Promise(resolve => setTimeout(resolve, 3000));
    await saveScreenshot(page, '登录后页面');
    
    // 2. 导航到创建文章页面
    console.log('导航到创建文章页面...');
    await page.goto(`${config.baseUrl}/create-post`, { waitUntil: 'networkidle2' });
    
    // 等待页面完全加载
    await new Promise(resolve => setTimeout(resolve, 3000));
    await saveScreenshot(page, '创建文章页面');
    
    // 监听控制台消息，捕获API错误
    page.on('console', msg => {
      console.log(`页面控制台: ${msg.text()}`);
    });
    
    // 3. 填写文章表单
    console.log('填写文章表单...');
    
    // 等待并填写标题
    await page.waitForSelector('#title');
    await page.focus('#title');
    await page.keyboard.type(config.testPost.title);
    console.log('已填写标题');
    
    // 等待并填写富文本编辑器内容
    await page.waitForSelector('.ql-editor');
    await page.evaluate((content) => {
      const editor = document.querySelector('.ql-editor');
      if (editor) {
        editor.innerHTML = content;
        // 触发输入事件，确保React捕获到变化
        const event = new Event('input', { bubbles: true });
        editor.dispatchEvent(event);
      }
    }, config.testPost.content);
    console.log('已填写内容');
    
    // 选择分类
    try {
      await page.waitForSelector('.checkbox-item input[type="checkbox"]');
      const checkboxes = await page.$$('.checkbox-item input[type="checkbox"]');
      
      if (checkboxes && checkboxes.length > 0) {
        await checkboxes[0].click();
        console.log('已选择第一个分类');
      }
    } catch (err) {
      console.log('选择分类时出错:', err.message);
    }
    
    // 添加标签
    try {
      await page.waitForSelector('.tag-input-field input');
      const tagInput = await page.$('.tag-input-field input');
      const addTagButton = await page.$('.tag-input-field button');
      
      if (tagInput && addTagButton) {
        for (const tag of config.testPost.tags) {
          await tagInput.focus();
          await tagInput.evaluate(el => el.value = ''); // 清空输入框
          await tagInput.type(tag);
          await addTagButton.click();
          await new Promise(resolve => setTimeout(resolve, 500)); // 等待标签添加完成
        }
        console.log('已添加标签');
      }
    } catch (err) {
      console.log('添加标签时出错:', err.message);
    }
    
    // 设置发布状态
    try {
      const publishCheckbox = await page.$('#published');
      if (publishCheckbox) {
        await publishCheckbox.click();
        console.log('已设置为立即发布');
      }
    } catch (err) {
      console.log('设置发布状态时出错:', err.message);
    }
    
    await saveScreenshot(page, '填写完成的表单');
    
    // 4. 提交表单
    console.log('提交表单...');
    
    // 查找并点击提交按钮
    const submitButton = await page.$('button[type="submit"]');
    if (!submitButton) {
      throw new Error('未找到提交按钮');
    }
    
    // 截图提交前状态
    await saveScreenshot(page, '提交前状态');
    
    // 点击提交按钮并等待响应
    await submitButton.click();
    console.log('已点击提交按钮');
    
    // 等待页面变化
    await new Promise(resolve => setTimeout(resolve, 5000));
    await saveScreenshot(page, '提交后状态');
    
    // 5. 验证创建结果
    console.log('验证创建结果...');
    
    // 检查当前URL
    const currentUrl = page.url();
    console.log('当前URL:', currentUrl);
    
    if (currentUrl.includes('/dashboard')) {
      console.log('已返回仪表盘，创建可能成功');
      
      // 检查仪表盘是否有新文章
      await new Promise(resolve => setTimeout(resolve, 2000)); // 等待仪表盘加载
      
      const hasNewPost = await page.evaluate((title) => {
        const posts = document.querySelectorAll('.post-item-title');
        for (const post of posts) {
          if (post.textContent.includes(title)) return true;
        }
        return false;
      }, config.testPost.title);
      
      if (hasNewPost) {
        console.log('✅ 测试通过: 在仪表盘找到新创建的文章');
      } else {
        console.log('❌ 测试失败: 未在仪表盘找到新文章');
      }
    } else {
      // 如果没有返回仪表盘，手动导航回去检查
      console.log('未返回仪表盘，手动导航回仪表盘检查');
      await page.goto(`${config.baseUrl}/dashboard`, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const hasNewPost = await page.evaluate((title) => {
        const posts = document.querySelectorAll('.post-item-title');
        for (const post of posts) {
          if (post.textContent.includes(title)) return true;
        }
        return false;
      }, config.testPost.title);
      
      if (hasNewPost) {
        console.log('✅ 测试通过: 在仪表盘找到新创建的文章');
      } else {
        console.log('❌ 测试失败: 未在仪表盘找到新文章');
      }
    }
    
    // 最终截图
    await saveScreenshot(page, '测试结束状态');
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error);
    await saveScreenshot(page, '测试错误');
  } finally {
    // 关闭浏览器
    await browser.close();
    console.log('🏁 测试完成!');
  }
}

// 运行测试
testCreatePost().catch(console.error);