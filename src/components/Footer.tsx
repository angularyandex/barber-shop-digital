
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-salon-dark text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
              <span className="font-playfair text-xl font-medium">БьютиСалон</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Профессиональные услуги для создания вашего идеального образа.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Telegram" size={20} fallback="Send" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Phone" size={20} />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="font-medium text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Магазин
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Учетная запись */}
          <div>
            <h3 className="font-medium text-lg mb-4">Личный кабинет</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Вход
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  Мой профиль
                </Link>
              </li>
              <li>
                <Link to="/profile/appointments" className="text-gray-400 hover:text-white transition-colors">
                  Мои записи
                </Link>
              </li>
              <li>
                <Link to="/profile/orders" className="text-gray-400 hover:text-white transition-colors">
                  Мои заказы
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-medium text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex">
                <Icon name="MapPin" size={20} className="text-salon-accent mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  ул. Пушкина, д. 10,<br />г. Москва, 123456
                </span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" size={20} className="text-salon-accent mr-3 flex-shrink-0" />
                <span className="text-gray-400">+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center">
                <Icon name="Mail" size={20} className="text-salon-accent mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@beautysalon.ru</span>
              </li>
              <li className="flex items-center">
                <Icon name="Clock" size={20} className="text-salon-accent mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  Пн-Сб: 10:00 - 20:00<br />Вс: выходной
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 БьютиСалон. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
