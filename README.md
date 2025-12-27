# DCEducation Backend API 文档（现有接口汇总）

> 更新时间：2025-12-27  
> 说明：本文档基于当前 `router.go` 已注册路由及现有模块实现（universities / users / auth）。

---

## 1. 基础信息

### 1.1 服务地址

- **直连（Go 服务）**：`http://127.0.0.1:8080`
- **Nginx 反代（按你的部署脚本）**：通常为 `http(s)://<你的域名>/api/...`  
  例如：`/api/health` 会被转发到 Go 服务的 `/health`

> 你部署脚本里是把 `/api/` 反代到 `127.0.0.1:8080/`，所以：
>
> - Nginx：`/api/health` → Go：`/health`
> - Nginx：`/api/api/v1/...` → Go：`/api/v1/...`

### 1.2 统一响应格式（大多数接口）

除 `/health` 外，你的业务接口基本采用统一包裹：

```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```

- `code = 0`：成功
- `code = 400/401/403/404/423/500...`：失败（`message` 为错误说明）

> `/health` 是特殊：直接返回 `{"status":"ok"}`。

---

## 2. 健康检查

### GET `/health`

**描述**：服务健康检查（不走统一 response 包裹）。

**请求参数**：无

**返回示例**

```json
{"status":"ok"}
```

**curl**

```bash
curl -i http://127.0.0.1:8080/health
# 或 nginx 反代：
curl -i http://127.0.0.1/api/health
```

---

## 3. Universities 模块

路由前缀：`/api/v1/universities`

### 3.1 GET `/api/v1/universities`

**描述**：分页搜索学校列表（支持国家代码与关键字）。

**Query 参数**

- `country_code` *(string, 可选)*：国家代码过滤（例如 `US`）
- `q` *(string, 可选)*：关键字（会在 repo 中用于 LIKE 搜索）
- `page` *(int, 可选, 默认 1)*：页码
- `size` *(int, 可选, 默认 20)*：每页数量

**返回：统一格式 + 分页对象**

- `data.page` *(int)*
- `data.size` *(int)*
- `data.total` *(int)*：总数
- `data.items` *(array)*：列表项（见下）

`items[]`（UniversityListItemDTO）

- `id` *(uint64)*
- `country_code` *(string)*
- `country` *(string)*
- `name_en` *(string)*
- `name_en_short` *(string)*
- `name_cn` *(string)*

**返回示例**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "page": 1,
    "size": 20,
    "total": 1234,
    "items": [
      {
        "id": 1,
        "country_code": "US",
        "country": "United States",
        "name_en": "University of ...",
        "name_en_short": "U...",
        "name_cn": "..."
      }
    ]
  }
}
```

**curl**

```bash
curl -i "http://127.0.0.1:8080/api/v1/universities?page=1&size=20&q=california&country_code=US"
```

---

### 3.2 GET `/api/v1/universities/:id`

**描述**：按 ID 获取学校详情。

**Path 参数**

- `id` *(uint64, 必填)*：学校 ID

**返回：统一格式 + University**
`data` 字段（University）

- `id` *(uint64)*
- `country_code` *(string)*
- `country` *(string)*
- `name_en` *(string)*
- `name_en_short` *(string)*
- `name_cn` *(string)*
- `domains_json` *(string)*：JSON 字符串（未来可解析成 `[]string`）

**curl**

```bash
curl -i "http://127.0.0.1:8080/api/v1/universities/1"
```

---

### 3.3 GET `/api/v1/universities/u-name-cn`

**描述**：返回所有学校中文名（字符串数组）。

**参数**：无

**返回**
`data` 为 `string[]`

**curl**

```bash
curl -i "http://127.0.0.1:8080/api/v1/universities/u-name-cn"
```

---

### 3.4 GET `/api/v1/universities/options-u-name-cn`

**描述**：前端下拉选项（中文名），分页 + 可模糊搜索。

**Query 参数**

- `q` *(string, 可选)*：中文名模糊搜索关键字
- `page` *(int, 可选, 默认 1)*
- `size` *(int, 可选, 默认 20)*

**返回：统一格式 + 分页对象**
`items[]`（UniversityOptionCNDTO）

- `id` *(uint64)*
- `name_cn` *(string)*

**curl**

```bash
curl -i "http://127.0.0.1:8080/api/v1/universities/options-u-name-cn?page=1&size=20&q=加州"
```

---

## 4. Users 模块

路由：`POST /api/v1/users`

### 4.1 POST `/api/v1/users`

**描述**：创建用户（注册/后台创建用户），密码会 bcrypt 哈希后入库（表：`user_center.users`）。

**Request Body（JSON）**

- `username` *(string, 必填, 3-50)*
- `email` *(string, 必填, email 格式)*
- `password` *(string, 必填, 8-72)*：明文，仅用于创建时哈希
- `role` *(string, 可选, 默认 "user")*
- `permission_level` *(int, 可选, 默认 1)*

**成功返回：统一格式 + CreateUserResponse**
`data` 字段：

- `id` *(uint64)*
- `username` *(string)*
- `email` *(string)*
- `role` *(string)*
- `permission_level` *(int)*
- `status` *(string)*：通常为 `"active"`
- `created_at` *(time string)*

**失败返回（常见）**

- `code=400, message="username or email already exists"`：唯一键冲突（username/email 已存在）
- `code=400`：参数校验失败（缺字段、email 格式不对、密码太短等）
- `code=500`：数据库或内部错误

**curl**

```bash
curl -i -X POST "http://127.0.0.1:8080/api/v1/users" \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser02_20251227",
    "email":"test02_20251227@example.com",
    "password":"Aa12345678!",
    "role":"admin",
    "permission_level":9
  }'
```

---

## 5. Auth 模块（登录 & 当前用户）

路由前缀：`/api/v1/auth`

### 5.1 POST `/api/v1/auth/login`

**描述**：登录，支持用 `username` 或 `email` 作为 identifier。  
密码使用 bcrypt 校验；成功后生成 JWT（HS256），并更新：

- `failed_login_count`（失败次数）
- `locked_until`（达到阈值后锁定一段时间）
- 成功时写入 `last_login_at / last_login_ip`

**前置要求**

- 必须配置环境变量：`JWT_SECRET`  
  （推荐写入 `/etc/dceducation-backend.env` 并 systemd 读取）

**Request Body（JSON）**

- `identifier` *(string, 必填)*：用户名或邮箱
- `password` *(string, 必填)*

**成功返回：统一格式 + LoginResponse**
`data` 字段：

- `token` *(string)*：JWT token
- `expires_at` *(time string)*：过期时间
- `user` *(object)*：
  - `id` *(uint64)*
  - `username` *(string)*
  - `email` *(string)*
  - `role` *(string)*
  - `permission_level` *(int)*

**失败返回（常见）**

- `401 invalid credentials`：账号或密码错误（不会泄露账号是否存在）
- `423 account locked, try later`：账户锁定中
- `403 account inactive`：账号状态不可用（如果你启用了此检查）
- `500 JWT_SECRET not set`：未配置密钥

**curl**

```bash
curl -i -X POST "http://127.0.0.1:8080/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "identifier":"test01@example.com",
    "password":"Aa12345678!"
  }'
```

---

### 5.2 GET `/api/v1/auth/me`

**描述**：获取当前登录用户（需要 Bearer Token）。

**Header**

- `Authorization: Bearer <TOKEN>` *(必填)*

**成功返回**
`data` 字段：

- `id` *(uint64)*
- `username` *(string)*
- `role` *(string)*
- `permission_level` *(int)*

**失败返回（常见）**

- `401 missing bearer token`：没带 token
- `401 invalid token`：token 无效/过期/签名不对
- `500 JWT_SECRET not set`：服务端未配置密钥

**curl**

```bash
curl -i "http://127.0.0.1:8080/api/v1/auth/me" \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 6. 环境变量清单（和接口相关）

建议放在 `/etc/dceducation-backend.env`（systemd EnvironmentFile）：

- `JWT_SECRET`：JWT 签名密钥（必须）
- 你现有 DB 相关变量（或 `MYSQL_DSN`）按项目实现配置

**生成 JWT_SECRET（推荐）**

```bash
openssl rand -hex 32
```

---

## 7. 返回码速查

- `200`：成功（`code=0`）
- `400`：参数错误/重复（`code=400`）
- `401`：未登录 / token 无效
- `403`：无权限 / 账号不可用
- `404`：路由或资源不存在
- `423`：账号锁定
- `500`：服务内部错误（配置/DB/代码异常）

---