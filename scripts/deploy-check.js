#!/usr/bin/env node

/**
 * 部署前检查脚本
 * Pre-deployment check script
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 EchoLab 网站部署前检查');
console.log('🔍 EchoLab Website Pre-deployment Check');
console.log('=====================================\n');

// 检查必要文件
const requiredFiles = [
  'app/page.tsx',
  'app/api/releases/latest/route.ts',
  'lib/github-api.ts',
  'components/DownloadSection.tsx',
  'package.json'
];

console.log('📁 检查必要文件...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 文件不存在`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ 部分必要文件缺失，请检查项目完整性');
  process.exit(1);
}

// 检查环境变量配置
console.log('\n🔧 检查环境变量配置...');

const envExample = '.env.example';
const envLocal = '.env.local';

if (fs.existsSync(envExample)) {
  console.log(`✅ ${envExample} 存在`);
} else {
  console.log(`⚠️  ${envExample} 不存在，建议创建示例环境变量文件`);
}

if (fs.existsSync(envLocal)) {
  console.log(`✅ ${envLocal} 存在`);
  
  // 读取环境变量
  const envContent = fs.readFileSync(envLocal, 'utf8');
  const hasGithubOwner = envContent.includes('GITHUB_OWNER');
  const hasGithubRepo = envContent.includes('GITHUB_REPO');
  
  if (hasGithubOwner && hasGithubRepo) {
    console.log('✅ GitHub 配置变量已设置');
  } else {
    console.log('⚠️  GitHub 配置变量可能缺失');
  }
} else {
  console.log(`⚠️  ${envLocal} 不存在，建议从 .env.example 复制并配置`);
}

// 检查 Vercel 配置
console.log('\n⚡ 检查 Vercel 配置...');

const vercelConfigs = ['vercel.json', 'vercel.simple.json'];
let hasVercelConfig = false;

vercelConfigs.forEach(config => {
  if (fs.existsSync(config)) {
    console.log(`✅ ${config} 存在`);
    hasVercelConfig = true;
    
    try {
      const configContent = JSON.parse(fs.readFileSync(config, 'utf8'));
      if (configContent.functions) {
        console.log('✅ API 函数配置已设置');
      }
      if (configContent.env) {
        console.log('✅ 环境变量配置已设置');
      }
    } catch (error) {
      console.log(`⚠️  ${config} 格式可能有误`);
    }
  }
});

if (!hasVercelConfig) {
  console.log('⚠️  未找到 Vercel 配置文件');
}

// 检查依赖
console.log('\n📦 检查项目依赖...');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['next', 'react', 'react-dom'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - 依赖缺失`);
    }
  });
} catch (error) {
  console.log('❌ 无法读取 package.json');
}

console.log('\n🚀 部署建议:');
console.log('1. 确保所有文件都已提交到 Git 仓库');
console.log('2. 在 Vercel 项目设置中配置环境变量：');
console.log('   - GITHUB_OWNER=mkdir700');
console.log('   - GITHUB_REPO=echolab');
console.log('3. 可选：添加 GITHUB_TOKEN 以提高 API 限制');
console.log('4. 部署后检查函数日志以确认 API 调用正常');

console.log('\n✅ 检查完成！');
