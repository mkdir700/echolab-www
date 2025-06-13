#!/bin/bash

# EchoLab 静态站点部署脚本
# EchoLab Static Site Deployment Script

set -e

echo "🚀 开始构建 EchoLab 静态站点..."
echo "🚀 Starting EchoLab static site build..."

# 清理之前的构建文件
# Clean previous build files
echo "🧹 清理之前的构建文件..."
echo "🧹 Cleaning previous build files..."
rm -rf .next out

# 安装依赖（如果需要）
# Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    echo "📦 Installing dependencies..."
    npm install
fi

# 构建静态站点
# Build static site
echo "🔨 构建静态站点..."
echo "🔨 Building static site..."
npm run build

# 检查构建是否成功
# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ 构建失败：未找到 out 目录"
    echo "❌ Build failed: out directory not found"
    exit 1
fi

echo "✅ 静态站点构建成功！"
echo "✅ Static site build successful!"
echo ""
echo "📁 构建文件位于: ./out"
echo "📁 Build files located at: ./out"
echo ""
echo "🌐 本地预览命令:"
echo "🌐 Local preview command:"
echo "   npx serve out"
echo ""
echo "📤 部署选项:"
echo "📤 Deployment options:"
echo "   - GitHub Pages: 将 out 目录内容推送到 gh-pages 分支"
echo "   - GitHub Pages: Push out directory contents to gh-pages branch"
echo "   - Vercel: vercel --prod"
echo "   - Netlify: 拖拽 out 目录到 Netlify"
echo "   - Netlify: Drag out directory to Netlify"
