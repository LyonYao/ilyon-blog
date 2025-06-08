import json
import urllib.request
import urllib.parse
import urllib.error
import base64

def lambda_handler(event, context):
    # EC2 内部链接地址
    ec2_url = "http://ip-172-31-5-123.ap-east-1.compute.internal"  # 替换为你的EC2内部链接 45612
    #print(event)
    # 从API Gateway事件中提取信息
    http_method = event.get('httpMethod', 'GET')
    path = event.get('path', '')
    query_string = event.get('queryStringParameters', {}) or {}
    headers = event.get('headers', {}) or {}
    body = event.get('body', '')
    is_base64_encoded = event.get('isBase64Encoded', False)
    
    # 如果body是base64编码的，进行解码
    if is_base64_encoded and body:
        body = base64.b64decode(body)
    port = 45612
    if(path.startswith('/api/blog/')):
        path = path.replace('/api/blog/', '/api/')
        port = 45612
    # 构建完整URL（包含查询参数）
    if query_string:
        query_params = urllib.parse.urlencode(query_string)
        full_url = f"{ec2_url}:{port}{path}?{query_params}"
    else:
        full_url = f"{ec2_url}:{port}{path}"
    print(full_url)
    
    # 创建请求
    req = urllib.request.Request(full_url, method=http_method)
    
    # 添加请求头
    for key, value in headers.items():
        # 跳过API Gateway特定的头部
        if key.lower() not in ['host', 'content-length']:
            req.add_header(key, value)
    
    # 添加请求体 - 支持所有HTTP方法
    if body:
        if isinstance(body, str):
            req.data = body.encode('utf-8')
        else:
            req.data = body
    
    try:
        # 发送请求到EC2
        response = urllib.request.urlopen(req)
        
        # 读取响应
        response_body = response.read()
        status_code = response.getcode()
        response_headers = dict(response.getheaders())
        
        # 检查是否需要base64编码（二进制内容）
        is_binary = 'image' in response_headers.get('Content-Type', '') or 'application/octet-stream' in response_headers.get('Content-Type', '')
        
        if is_binary:
            response_body = base64.b64encode(response_body).decode('utf-8')
            is_base64_encoded = True
        else:
            try:
                response_body = response_body.decode('utf-8')
                is_base64_encoded = False
            except UnicodeDecodeError:
                # 如果无法解码为UTF-8，则使用base64编码
                response_body = base64.b64encode(response_body).decode('utf-8')
                is_base64_encoded = True
        
        # 返回API Gateway格式的响应
        return {
            'statusCode': status_code,
            'headers': response_headers,
            'body': response_body,
            'isBase64Encoded': is_base64_encoded
        }
        
    except urllib.error.HTTPError as e:
        # 处理HTTP错误
        error_body = e.read()
        try:
            error_body = error_body.decode('utf-8')
        except UnicodeDecodeError:
            error_body = base64.b64encode(error_body).decode('utf-8')
            is_base64_encoded = True
        
        return {
            'statusCode': e.code,
            'headers': dict(e.headers),
            'body': error_body,
            'isBase64Encoded': is_base64_encoded
        }
        
    except Exception as e:
        # 处理其他错误
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Internal server error',
                'error': str(e)
            }),
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False
        }