# AWS Lambda HTTP 代理

这个 Lambda 函数用于将 API Gateway 的 HTTP 请求完全转发到 EC2 内部链接，并将 EC2 的响应返回给 API Gateway。

## 功能

- 转发所有 HTTP 方法 (GET, POST, PUT, DELETE 等)
- 保留原始请求头信息
- 转发查询参数
- 处理请求体数据
- 支持二进制内容的传输
- 处理错误情况

## 部署步骤

1. 在 Lambda 控制台创建新函数
2. 将 `lambda_proxy.py` 代码复制到函数中
3. 修改 `ec2_url` 变量为你的 EC2 内部链接地址
4. 配置 Lambda 函数的执行角色，确保有足够权限访问 EC2
5. 在 API Gateway 中创建 REST API 并配置与 Lambda 的集成
6. 在 API Gateway 中启用二进制媒体类型支持

## 注意事项

- 确保 EC2 安全组允许来自 Lambda 函数的入站流量
- 对于大型请求/响应，可能需要增加 Lambda 超时设置
- 考虑使用 VPC 配置让 Lambda 函数能够访问私有 EC2 实例