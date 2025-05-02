
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-salon-dark text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
              <span className="font-playfair text-xl font-semibold">Стиль</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Салон красоты премиум-класса, где каждый клиент получает внимание и заботу
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-gray-300 hover:text-white">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="https://vk.com" className="text-gray-300 hover:text-white">
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Услуги</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Магазин</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">О нас</Link></li>
              <li><Link to="/contacts" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Icon name="MapPin" className="h-5 w-5 text-salon-accent mt-0.5" />
                <span className="text-gray-300">ул. Примерная, 123, Москва</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Phone" className="h-5 w-5 text-salon-accent mt-0.5" />
                <span className="text-gray-300">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Mail" className="h-5 w-5 text-salon-accent mt-0.5" />
                <span className="text-gray-300">info@salon-style.ru</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Салон красоты "Стиль". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;