# Vercel 部署指南 / Vercel Deployment Guide

## 🚀 快速部署 / Quick Deployment

### 方法一：通过 Vercel CLI（推荐）/ Method 1: Via Vercel CLI (Recommended)

1. **安装 Vercel CLI / Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel / Login to Vercel**
   ```bash
   vercel login
   ```

3. **初始化项目 / Initialize Project**
   ```bash
   vercel
   ```
   - 按照提示选择设置 / Follow the prompts to configure settings
   - 选择项目名称：`echolab-www`
   - 选择团队（如果有）/ Select team (if applicable)

4. **部署到生产环境 / Deploy to Production**
   ```bash
   npm run deploy
   # 或者 / or
   vercel --prod
   ```

### 方法二：通过 Vercel Dashboard / Method 2: Via Vercel Dashboard

1. **访问 Vercel Dashboard / Visit Vercel Dashboard**
   - 前往 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录 / Login with GitHub account

2. **导入项目 / Import Project**
   - 点击 "New Project" / Click "New Project"
   - 选择 GitHub 仓库：`mkdir700/echolab-www`
   - 点击 "Import" / Click "Import"

3. **配置项目设置 / Configure Project Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (默认 / default)
   - **Build Command**: `npm run build` (自动检测 / auto-detected)
   - **Output Directory**: `out` (自动检测 / auto-detected)
   - **Install Command**: `npm install` (自动检测 / auto-detected)

4. **环境变量（如果需要）/ Environment Variables (if needed)**
   - 在 Settings > Environment Variables 中添加
   - Add in Settings > Environment Variables

5. **部署 / Deploy**
   - 点击 "Deploy" 按钮 / Click "Deploy" button
   - 等待构建完成 / Wait for build completion

## ⚙️ 配置说明 / Configuration Details

### vercel.json 配置文件 / vercel.json Configuration

项目已包含优化的 `vercel.json` 配置文件，包含：
The project includes an optimized `vercel.json` configuration file with:

- **安全头部 / Security Headers**: 防止 XSS、点击劫持等攻击
- **缓存策略 / Caching Strategy**: 静态资源长期缓存，页面适度缓存
- **重定向规则 / Redirect Rules**: 自动处理 URL 重定向
- **区域设置 / Region Settings**: 优化亚洲地区访问速度

### Next.js 配置优化 / Next.js Configuration Optimization

`next.config.ts` 已针对 Vercel 部署进行优化：
`next.config.ts` has been optimized for Vercel deployment:

- **静态导出 / Static Export**: `output: 'export'`
- **图片优化 / Image Optimization**: 已禁用以支持静态导出
- **性能优化 / Performance Optimization**: 启用 SWC 压缩和 React 严格模式
- **安全优化 / Security Optimization**: 移除 powered-by 头部

## 🔧 本地开发 / Local Development

### 使用 Vercel CLI 本地开发 / Local Development with Vercel CLI

```bash
# 启动 Vercel 开发服务器 / Start Vercel dev server
npm run vercel:dev

# 或者使用标准 Next.js 开发服务器 / Or use standard Next.js dev server
npm run dev
```

### 本地构建测试 / Local Build Testing

```bash
# 构建项目 / Build project
npm run build

# 本地预览构建结果 / Preview build locally
npm run serve
```

## 📊 部署后检查 / Post-Deployment Checklist

### 1. 功能测试 / Functionality Testing
- [ ] 页面正常加载 / Pages load correctly
- [ ] 导航功能正常 / Navigation works
- [ ] 响应式设计正常 / Responsive design works
- [ ] 主题切换功能正常 / Theme toggle works
- [ ] 滚动到顶部按钮正常 / Scroll-to-top button works

### 2. 性能检查 / Performance Check
- [ ] 使用 Lighthouse 检查性能分数 / Check performance score with Lighthouse
- [ ] 检查 Core Web Vitals / Check Core Web Vitals
- [ ] 验证缓存策略 / Verify caching strategy

### 3. SEO 检查 / SEO Check
- [ ] 检查页面标题和描述 / Check page titles and descriptions
- [ ] 验证 Open Graph 标签 / Verify Open Graph tags
- [ ] 检查结构化数据 / Check structured data

## 🌐 自定义域名 / Custom Domain

### 添加自定义域名 / Adding Custom Domain

1. **在 Vercel Dashboard 中 / In Vercel Dashboard**
   - 进入项目设置 / Go to project settings
   - 点击 "Domains" 标签 / Click "Domains" tab
   - 添加您的域名 / Add your domain

2. **DNS 配置 / DNS Configuration**
   ```
   # A 记录 / A Record
   @ -> 76.76.19.19

   # CNAME 记录 / CNAME Record
   www -> cname.vercel-dns.com
   ```

3. **SSL 证书 / SSL Certificate**
   - Vercel 自动提供 Let's Encrypt SSL 证书
   - Vercel automatically provides Let's Encrypt SSL certificates

## 🔄 持续部署 / Continuous Deployment

### 自动部署 / Automatic Deployment

- **主分支推送 / Main Branch Push**: 自动部署到生产环境
- **PR 预览 / PR Preview**: 每个 Pull Request 自动生成预览链接
- **分支部署 / Branch Deployment**: 其他分支推送生成预览部署

### 部署钩子 / Deployment Hooks

可以在 Vercel Dashboard 中设置部署钩子：
You can set up deployment hooks in Vercel Dashboard:

- **构建成功 / Build Success**: 发送通知到 Slack/Discord
- **构建失败 / Build Failure**: 发送错误通知
- **部署完成 / Deployment Complete**: 触发其他自动化流程

## 🐛 故障排除 / Troubleshooting

### 常见问题 / Common Issues

1. **构建失败 / Build Failure**
   ```bash
   # 本地测试构建 / Test build locally
   npm run build
   
   # 检查错误日志 / Check error logs
   vercel logs
   ```

2. **静态资源 404 / Static Assets 404**
   - 检查 `public` 目录结构 / Check `public` directory structure
   - 验证 `next.config.ts` 中的 `assetPrefix` 设置

3. **环境变量问题 / Environment Variables Issues**
   - 确保在 Vercel Dashboard 中正确设置环境变量
   - 检查变量名称是否以 `NEXT_PUBLIC_` 开头（客户端变量）

### 获取帮助 / Getting Help

- **Vercel 文档 / Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js 文档 / Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **社区支持 / Community Support**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## 📈 监控和分析 / Monitoring and Analytics

### Vercel Analytics

```bash
# 安装 Vercel Analytics / Install Vercel Analytics
npm install @vercel/analytics
```

在 `app/layout.tsx` 中添加：
Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 性能监控 / Performance Monitoring

- **Real User Monitoring (RUM)**: 实时用户体验监控
- **Core Web Vitals**: 核心网页指标跟踪
- **Function Logs**: 无服务器函数日志（如果使用）

---

## 🎉 部署完成 / Deployment Complete

部署成功后，您的网站将在以下地址可用：
After successful deployment, your website will be available at:

- **生产环境 / Production**: `https://echolab-www.vercel.app`
- **自定义域名 / Custom Domain**: `https://your-domain.com` (如果配置)

享受您的 EchoLab 网站在 Vercel 上的快速、可靠的托管服务！
Enjoy your EchoLab website's fast and reliable hosting on Vercel!
