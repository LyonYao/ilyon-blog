/**
 * 博客应用测试配置文件
 */

module.exports = {
  // 应用URL
  baseUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:5000/api',
  
  // 测试用户信息
  testUser: {
    username: 'caocao',
    password: 'password123',
    displayName: '曹操',
    email: 'caocao@example.com'
  },
  
  // 测试文章
  testPost: {
    title: '三国英雄传',
    content: '<p>天下英雄，唯使君与操耳。</p><p>宁教我负天下人，休教天下人负我。</p>',
    category: '历史',
    tags: ['三国', '魏国', '英雄']
  },
  
  // 测试分类
  testCategories: ['历史', '文学', '哲学', '军事'],
  
  // 测试标签
  testTags: ['三国', '魏国', '英雄', '战略', '政治'],
  
  // 浏览器配置
  browser: {
    headless: process.env.HEADLESS === 'true',
    slowMo: 50,
    defaultViewport: {
      width: 1280,
      height: 800
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  
  // 截图配置
  screenshots: {
    enabled: true,
    directory: './test-screenshots',
    fullPage: true
  },
  
  // 测试超时设置
  timeouts: {
    navigation: 30000,
    element: 10000,
    action: 5000
  }
};