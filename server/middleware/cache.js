import NodeCache from 'node-cache';

// Создание экземпляра кеша (TTL = 10 минут)
const cache = new NodeCache({ stdTTL: 600 });

// Middleware для кеширования ответов
export const cacheMiddleware = (duration = 600) => {
  return (req, res, next) => {
    // Создание ключа кеша на основе URL и query параметров
    const key = `${req.originalUrl || req.url}`;
    
    // Проверка наличия данных в кеше
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      console.log(`Cache hit for: ${key}`);
      return res.json(cachedResponse);
    }

    // Сохранение оригинального метода json
    const originalJson = res.json;
    
    // Переопределение метода json для сохранения в кеш
    res.json = function(data) {
      // Кешируем только успешные ответы
      if (data.success) {
        cache.set(key, data, duration);
        console.log(`Cached response for: ${key}`);
      }
      
      // Вызов оригинального метода
      return originalJson.call(this, data);
    };

    next();
  };
};

// Очистка кеша по паттерну
export const clearCache = (pattern) => {
  const keys = cache.keys();
  const keysToDelete = keys.filter(key => key.includes(pattern));
  
  keysToDelete.forEach(key => {
    cache.del(key);
  });
  
  console.log(`Cleared ${keysToDelete.length} cache entries matching: ${pattern}`);
};

// Очистка всего кеша
export const clearAllCache = () => {
  cache.flushAll();
  console.log('All cache cleared');
};

export default cache;