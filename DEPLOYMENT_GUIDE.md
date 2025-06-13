# EchoLab 网站部署指南

## 问题解决状态 ✅

**问题**：下载页面显示"版本信息暂时不可用，请稍后再试"  
**状态**：已修复  
**解决方案**：优化 GitHub API 调用逻辑，直接获取预发布版本

## 立即部署步骤

### 1. 提交代码更改
```bash
git add .
git commit -m "fix: 修复下载页面版本信息获取问题

- 优化 GitHub API 调用逻辑，直接使用 /releases?per_page=1
- 改进错误处理和日志记录
- 支持预发布版本显示
- 增强 Vercel 环境兼容性"
git push origin main
```

### 2. Vercel 环境变量配置

在 Vercel 项目设置 → Environment Variables 中添加：

**必需变量：**
```
GITHUB_OWNER=mkdir700
GITHUB_REPO=echolab
```

**可选变量（提高 API 限制）：**
```
GITHUB_TOKEN=your_github_personal_access_token
```

### 3. 触发重新部署

代码推送后，Vercel 会自动触发重新部署。您也可以在 Vercel 控制台手动触发。

## 预期结果

部署成功后，下载页面将显示：

### 版本信息
- **当前版本**：v0.2.0-alpha.3
- **版本类型**：Alpha 版（橙色标签）
- **发布时间**：2025年6月12日

### 下载选项
- **Windows**：
  - setup.exe (96.0 MB) - x64 架构
  - x64.zip (119.5 MB) - 便携版
  - arm64.zip (115.4 MB) - ARM64 架构

- **macOS**：
  - .dmg (123.9 MB) - Universal (Intel & Apple Silicon)

- **Linux**：
  - .AppImage (127.2 MB) - x64 架构
  - .deb (81.4 MB) - Debian 包

## 验证步骤

### 1. 检查部署状态
- 访问 Vercel 控制台查看部署日志
- 确认没有构建错误

### 2. 功能测试
- 访问网站下载页面
- 验证版本信息正确显示
- 测试平台切换功能
- 检查下载链接是否有效

### 3. 日志监控
- 检查 Vercel Functions 日志
- 确认 GitHub API 调用成功
- 验证数据处理正常

## 故障排除

### 如果仍显示错误信息：

1. **检查环境变量**
   ```bash
   # 在 Vercel 控制台验证环境变量设置
   GITHUB_OWNER=mkdir700
   GITHUB_REPO=echolab
   ```

2. **查看函数日志**
   - 进入 Vercel 控制台 → Functions 标签
   - 查看 `/api/releases/latest` 的执行日志
   - 检查是否有 API 调用错误

3. **手动测试 API**
   ```bash
   # 测试 GitHub API 连接
   curl "https://api.github.com/repos/mkdir700/echolab/releases?per_page=1"
   ```

4. **清除缓存**
   - 在 Vercel 控制台触发新的部署
   - 或等待 5 分钟让缓存自动过期

### 常见问题

**Q: 为什么显示 Alpha 版而不是正式版？**  
A: 因为 GitHub 仓库中目前只有预发布版本，没有正式稳定版本。当发布正式版本时，系统会自动显示。

**Q: 如何添加 GitHub Token？**  
A: 在 GitHub 创建 Personal Access Token（不需要特殊权限），然后在 Vercel 环境变量中添加 `GITHUB_TOKEN`。

**Q: API 调用频率限制怎么办？**  
A: 添加 GitHub Token 可以将限制从每小时 60 次提高到 5000 次。

## 技术细节

### 修复内容
1. **API 调用优化**：直接使用 `/releases?per_page=1` 获取最新版本
2. **错误处理改进**：添加详细日志和错误信息
3. **环境兼容性**：优化 Vercel 部署环境的数据获取
4. **缓存策略**：设置合适的缓存时间和策略

### 数据流程
```
GitHub API → lib/github-api.ts → app/page.tsx → DownloadSection.tsx
```

### 缓存机制
- **ISR 缓存**：5 分钟服务端缓存
- **API 缓存**：5 分钟公共缓存 + 10 分钟 stale-while-revalidate
- **浏览器缓存**：自动管理

## 联系支持

如果遇到问题，请：
1. 检查 Vercel 部署日志
2. 验证环境变量配置
3. 运行本地测试脚本：`node scripts/test-github-api.js`
4. 联系开发团队：mkdir700@gmail.com

---

**部署完成后，EchoLab 网站的下载页面将正常工作，用户可以看到最新的版本信息和下载选项。** 🚀
