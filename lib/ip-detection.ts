// IP检测工具，用于确定用户是否来自中国
// IP detection utility to determine if user is from China

interface IPInfo {
  country: string;
  countryCode: string;
  isChina: boolean;
}

// 检测用户IP是否来自中国
// Detect if user IP is from China
export async function detectUserLocation(): Promise<IPInfo> {
  try {
    // 使用多个IP检测服务来提高可靠性
    // Use multiple IP detection services for better reliability
    const services = [
      {
        url: 'https://ipapi.co/json/',
        parse: (data: { country_name?: string; country_code?: string }) => ({
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'Unknown',
          isChina: data.country_code === 'CN'
        })
      },
      {
        url: 'https://api.ipify.org?format=json',
        parse: async (data: { ip: string }) => {
          // 如果是ipify，需要再次查询地理位置
          // If using ipify, need to query geolocation separately
          const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
          const geoData = await geoResponse.json() as { country_name?: string; country_code?: string };
          return {
            country: geoData.country_name || 'Unknown',
            countryCode: geoData.country_code || 'Unknown',
            isChina: geoData.country_code === 'CN'
          };
        }
      }
    ];

    // 尝试第一个服务
    // Try the first service
    try {
      const response = await fetch(services[0].url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // 设置超时时间
        signal: AbortSignal.timeout(5000) // 5秒超时
      });

      if (response.ok) {
        const data = await response.json();
        return services[0].parse(data);
      }
    } catch (error) {
      console.warn('First IP detection service failed:', error);
    }

    // 如果第一个服务失败，尝试第二个
    // If first service fails, try the second one
    try {
      const response = await fetch(services[1].url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const data = await response.json();
        return await services[1].parse(data);
      }
    } catch (error) {
      console.warn('Second IP detection service failed:', error);
    }

    // 所有服务都失败时的默认值
    // Default value when all services fail
    return {
      country: 'Unknown',
      countryCode: 'Unknown',
      isChina: false
    };

  } catch (error) {
    console.error('IP detection failed:', error);
    return {
      country: 'Unknown',
      countryCode: 'Unknown',
      isChina: false
    };
  }
}

// 服务端检测用户位置（基于请求头）
// Server-side location detection (based on request headers)
export function detectLocationFromHeaders(request: Request): IPInfo {
  // 检查常见的地理位置头
  // Check common geolocation headers
  const cfCountry = request.headers.get('cf-ipcountry'); // Cloudflare
  const xCountryCode = request.headers.get('x-country-code'); // 其他CDN
  
  // 如果有Cloudflare的国家代码
  // If Cloudflare country code is available
  if (cfCountry) {
    return {
      country: cfCountry === 'CN' ? 'China' : 'Other',
      countryCode: cfCountry,
      isChina: cfCountry === 'CN'
    };
  }

  // 如果有其他CDN的国家代码
  // If other CDN country code is available
  if (xCountryCode) {
    return {
      country: xCountryCode === 'CN' ? 'China' : 'Other',
      countryCode: xCountryCode,
      isChina: xCountryCode === 'CN'
    };
  }

  // 检查Accept-Language头中是否包含中文
  // Check if Accept-Language header contains Chinese
  const acceptLanguage = request.headers.get('accept-language');
  const hasChineseLanguage = acceptLanguage?.includes('zh') || false;

  // 基于用户代理字符串的简单检测（不太可靠）
  // Simple detection based on user agent string (not very reliable)
  const userAgent = request.headers.get('user-agent') || '';
  const hasChineseUA = /[\u4e00-\u9fff]/.test(userAgent);

  // 如果检测到中文相关信息，假设可能是中国用户
  // If Chinese-related info is detected, assume possibly Chinese user
  if (hasChineseLanguage || hasChineseUA) {
    return {
      country: 'Possibly China',
      countryCode: 'CN',
      isChina: true
    };
  }

  // 默认非中国用户
  // Default to non-China user
  return {
    country: 'Unknown',
    countryCode: 'Unknown',
    isChina: false
  };
}

// 导出接口供客户端使用
// Export interface for client-side usage
export type { IPInfo };