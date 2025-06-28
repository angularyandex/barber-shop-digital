import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Импорт моделей
import User from '../models/User.js';
import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';
import ProductCategory from '../models/ProductCategory.js';
import Product from '../models/Product.js';
import Promotion from '../models/Promotion.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB подключена');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Очистка существующих данных
    await User.deleteMany({});
    await ServiceCategory.deleteMany({});
    await Service.deleteMany({});
    await ProductCategory.deleteMany({});
    await Product.deleteMany({});
    await Promotion.deleteMany({});

    console.log('Данные очищены');

    // Создание администратора
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123456', 12);
    
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Администратор',
      email: process.env.ADMIN_EMAIL || 'admin@beautysalon.com',
      password: adminPassword,
      role: 'admin',
      isActive: true
    });

    // Создание специалистов
    const specialists = await User.insertMany([
      {
        name: 'Екатерина Смирнова',
        email: 'ekaterina@beautysalon.com',
        password: await bcrypt.hash('specialist123', 12),
        role: 'specialist',
        phone: '+7 (999) 111-11-11',
        isActive: true
      },
      {
        name: 'Алексей Петров',
        email: 'alexey@beautysalon.com',
        password: await bcrypt.hash('specialist123', 12),
        role: 'specialist',
        phone: '+7 (999) 222-22-22',
        isActive: true
      },
      {
        name: 'Мария Козлова',
        email: 'maria@beautysalon.com',
        password: await bcrypt.hash('specialist123', 12),
        role: 'specialist',
        phone: '+7 (999) 333-33-33',
        isActive: true
      }
    ]);

    // Создание тестовых клиентов
    const clients = await User.insertMany([
      {
        name: 'Анна Иванова',
        email: 'anna@example.com',
        password: await bcrypt.hash('user123456', 12),
        phone: '+7 (999) 123-45-67',
        role: 'user',
        isActive: true
      },
      {
        name: 'Михаил Петров',
        email: 'mikhail@example.com',
        password: await bcrypt.hash('user123456', 12),
        phone: '+7 (999) 234-56-78',
        role: 'user',
        isActive: true
      }
    ]);

    // Создание категорий услуг
    const serviceCategories = await ServiceCategory.insertMany([
      {
        name: 'Стрижки',
        description: 'Профессиональные стрижки для мужчин и женщин',
        icon: 'Scissors',
        sortOrder: 1
      },
      {
        name: 'Окрашивание',
        description: 'Окрашивание волос различными техниками',
        icon: 'Palette',
        sortOrder: 2
      },
      {
        name: 'Уход за волосами',
        description: 'Процедуры по уходу и восстановлению волос',
        icon: 'Sparkles',
        sortOrder: 3
      },
      {
        name: 'Маникюр и педикюр',
        description: 'Профессиональный уход за ногтями',
        icon: 'Hand',
        sortOrder: 4
      }
    ]);

    // Создание услуг
    const services = await Service.insertMany([
      {
        name: 'Стрижка женская',
        description: 'Профессиональная женская стрижка с укладкой',
        category: serviceCategories[0]._id,
        price: 1500,
        duration: 60,
        specialists: [specialists[0]._id, specialists[1]._id],
        tags: ['стрижка', 'женская', 'укладка']
      },
      {
        name: 'Стрижка мужская',
        description: 'Классическая мужская стрижка',
        category: serviceCategories[0]._id,
        price: 1000,
        duration: 45,
        specialists: [specialists[1]._id],
        tags: ['стрижка', 'мужская']
      },
      {
        name: 'Окрашивание корней',
        description: 'Окрашивание отросших корней волос',
        category: serviceCategories[1]._id,
        price: 2500,
        duration: 90,
        specialists: [specialists[0]._id],
        tags: ['окрашивание', 'корни']
      },
      {
        name: 'Полное окрашивание',
        description: 'Полное окрашивание волос в один тон',
        category: serviceCategories[1]._id,
        price: 3500,
        duration: 120,
        specialists: [specialists[0]._id],
        tags: ['окрашивание', 'полное']
      },
      {
        name: 'Кератиновое выпрямление',
        description: 'Процедура кератинового выпрямления волос',
        category: serviceCategories[2]._id,
        price: 6000,
        duration: 180,
        specialists: [specialists[0]._id],
        tags: ['кератин', 'выпрямление', 'уход']
      },
      {
        name: 'Классический маникюр',
        description: 'Классический маникюр с покрытием',
        category: serviceCategories[3]._id,
        price: 1100,
        duration: 60,
        specialists: [specialists[2]._id],
        tags: ['маникюр', 'классический']
      },
      {
        name: 'Педикюр',
        description: 'Профессиональный педикюр',
        category: serviceCategories[3]._id,
        price: 1800,
        duration: 90,
        specialists: [specialists[2]._id],
        tags: ['педикюр']
      }
    ]);

    // Создание категорий товаров
    const productCategories = await ProductCategory.insertMany([
      {
        name: 'Шампуни',
        description: 'Профессиональные шампуни для волос',
        sortOrder: 1
      },
      {
        name: 'Кондиционеры',
        description: 'Кондиционеры и бальзамы для волос',
        sortOrder: 2
      },
      {
        name: 'Маски для волос',
        description: 'Восстанавливающие маски для волос',
        sortOrder: 3
      },
      {
        name: 'Средства для укладки',
        description: 'Стайлинговые средства для волос',
        sortOrder: 4
      },
      {
        name: 'Уход за ногтями',
        description: 'Средства для ухода за ногтями',
        sortOrder: 5
      }
    ]);

    // Создание товаров
    const products = await Product.insertMany([
      {
        name: 'Шампунь для окрашенных волос L\'Oréal',
        description: 'Профессиональный шампунь для защиты цвета окрашенных волос',
        category: productCategories[0]._id,
        brand: 'L\'Oréal Professional',
        price: 1200,
        stock: 25,
        sku: 'LOREAL-SHAMP-COLOR-250',
        specifications: {
          volume: '250 мл',
          ingredients: ['Aqua', 'Sodium Laureth Sulfate', 'Cocamidopropyl Betaine']
        },
        tags: ['шампунь', 'окрашенные волосы', 'защита цвета']
      },
      {
        name: 'Кондиционер восстанавливающий Matrix',
        description: 'Восстанавливающий кондиционер для поврежденных волос',
        category: productCategories[1]._id,
        brand: 'Matrix',
        price: 1400,
        stock: 20,
        sku: 'MATRIX-COND-REPAIR-300',
        specifications: {
          volume: '300 мл'
        },
        tags: ['кондиционер', 'восстановление', 'поврежденные волосы']
      },
      {
        name: 'Маска для волос Wella',
        description: 'Интенсивная восстанавливающая маска для волос',
        category: productCategories[2]._id,
        brand: 'Wella Professionals',
        price: 2000,
        salePrice: 1600,
        stock: 15,
        sku: 'WELLA-MASK-REPAIR-500',
        specifications: {
          volume: '500 мл'
        },
        tags: ['маска', 'восстановление', 'интенсивный уход'],
        isFeatured: true
      },
      {
        name: 'Лак для волос сильной фиксации',
        description: 'Профессиональный лак для волос сильной фиксации',
        category: productCategories[3]._id,
        brand: 'Schwarzkopf Professional',
        price: 800,
        stock: 30,
        sku: 'SCHWARZ-SPRAY-STRONG-400',
        specifications: {
          volume: '400 мл'
        },
        tags: ['лак', 'фиксация', 'укладка']
      },
      {
        name: 'Масло для кутикулы OPI',
        description: 'Питательное масло для ухода за кутикулой',
        category: productCategories[4]._id,
        brand: 'OPI',
        price: 600,
        stock: 40,
        sku: 'OPI-CUTICLE-OIL-15',
        specifications: {
          volume: '15 мл'
        },
        tags: ['масло', 'кутикула', 'уход за ногтями']
      }
    ]);

    // Создание акций
    const promotions = await Promotion.insertMany([
      {
        title: 'Скидка 20% на окрашивание',
        description: 'Специальное предложение на все виды окрашивания волос',
        type: 'percentage',
        value: 20,
        code: 'COLOR20',
        category: 'hair',
        applicableServices: [services[2]._id, services[3]._id],
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
        conditions: 'Действует при записи через сайт'
      },
      {
        title: 'Комплекс "Стрижка + Укладка"',
        description: 'Сделайте стрижку и получите укладку с 30% скидкой',
        type: 'percentage',
        value: 30,
        code: 'STYLE30',
        category: 'hair',
        applicableServices: [services[0]._id, services[1]._id],
        startDate: new Date(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 дней
        conditions: 'Предложение действительно с понедельника по четверг'
      },
      {
        title: 'Программа лояльности',
        description: 'Возвращаем до 20% от суммы покупок в виде бонусов',
        type: 'loyalty',
        value: 20,
        code: 'LOYALTY',
        category: 'special',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 год
        conditions: 'Для зарегистрированных пользователей'
      }
    ]);

    console.log('Данные успешно загружены:');
    console.log(`- Администратор: ${admin.email}`);
    console.log(`- Специалистов: ${specialists.length}`);
    console.log(`- Клиентов: ${clients.length}`);
    console.log(`- Категорий услуг: ${serviceCategories.length}`);
    console.log(`- Услуг: ${services.length}`);
    console.log(`- Категорий товаров: ${productCategories.length}`);
    console.log(`- Товаров: ${products.length}`);
    console.log(`- Акций: ${promotions.length}`);

    console.log('\nДанные для входа:');
    console.log(`Администратор: ${admin.email} / ${process.env.ADMIN_PASSWORD || 'admin123456'}`);
    console.log(`Специалист: ${specialists[0].email} / specialist123`);
    console.log(`Клиент: ${clients[0].email} / user123456`);

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
  process.exit(0);
};

runSeed();