#!/usr/bin/env node

/**
 * 测试 GitHub API 调用的脚本
 * Script to test GitHub API calls
 */

const https = require('https');

function fetchGitHubReleases() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/mkdir700/echolab/releases?per_page=1',
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'EchoLab-Website-Test',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const releases = JSON.parse(data);
          resolve({ status: res.statusCode, data: releases });
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testGitHubAPI() {
  console.log('🔍 Testing GitHub API connection...');
  console.log('Repository: mkdir700/echolab');
  console.log('Endpoint: /repos/mkdir700/echolab/releases?per_page=1');
  console.log('');

  try {
    const result = await fetchGitHubReleases();
    
    console.log(`✅ API Response Status: ${result.status}`);
    
    if (result.status === 200 && Array.isArray(result.data) && result.data.length > 0) {
      const release = result.data[0];
      console.log('📦 Latest Release Found:');
      console.log(`   Version: ${release.tag_name}`);
      console.log(`   Name: ${release.name || 'N/A'}`);
      console.log(`   Prerelease: ${release.prerelease ? 'Yes' : 'No'}`);
      console.log(`   Published: ${release.published_at}`);
      console.log(`   Assets: ${release.assets ? release.assets.length : 0} files`);
      
      if (release.assets && release.assets.length > 0) {
        console.log('📁 Available Assets:');
        release.assets.forEach((asset, index) => {
          const sizeMB = (asset.size / 1024 / 1024).toFixed(1);
          console.log(`   ${index + 1}. ${asset.name} (${sizeMB} MB)`);
        });
      }
      
      console.log('');
      console.log('✅ GitHub API test successful!');
      console.log('The website should be able to fetch release data.');
    } else if (result.status === 200 && Array.isArray(result.data) && result.data.length === 0) {
      console.log('⚠️  No releases found in the repository');
    } else {
      console.log(`❌ Unexpected response: ${JSON.stringify(result.data, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ GitHub API test failed:');
    console.log(`   Error: ${error.message}`);
    console.log('');
    console.log('🔧 Possible solutions:');
    console.log('   1. Check your internet connection');
    console.log('   2. Verify the repository exists: https://github.com/mkdir700/echolab');
    console.log('   3. Check if there are any releases in the repository');
    console.log('   4. Consider adding a GitHub token for higher rate limits');
  }
}

// 运行测试
// Run the test
testGitHubAPI();
