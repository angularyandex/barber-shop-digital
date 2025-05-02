
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Стрижка',
    description: 'Профессиональная стрижка от наших мастеров с учетом всех ваших пожеланий',
    icon: 'Scissors',
    price: 'от 1500₽'
  },
  {
    id: 2,
    title: 'Окрашивание',
    description: 'Современные техники окрашивания с использованием профессиональных красителей',
    icon: 'Palette',
    price: 'от 3500₽'
  },
  {
    id: 3,
    title: 'Укладка',
    description: 'Стильная укладка для любого события: от повседневной до вечерней',
    icon: 'Wind',
    price: 'от 1000₽'
  }
];

const stylists = [
  {
    id: 1,
    name: 'Екатерина',
    position: 'Стилист-колорист',
    photo: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    experience: '8 лет'
  },
  {
    id: 2,
    name: 'Алексей',
    position: 'Ведущий стилист',
    photo: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    experience: '10 лет'
  },
  {
    id: 3,
    name: 'Мария',
    position: 'Мастер маникюра',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    experience: '6 лет'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Услуги */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Наши услуги</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Мы предлагаем широкий спектр услуг для создания идеального образа</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button asChild className="px-6">
                <Link to="/services">Все услуги</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Мастера */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Наши мастера</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Команда профессионалов с многолетним опытом работы</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stylists.map(stylist => (
                <div key={stylist.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={stylist.photo} 
                      alt={stylist.name} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{stylist.name}</h3>
                    <p className="text-gray-600 mb-2">{stylist.position}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Icon name="Clock" size={16} className="mr-1" />
                      <span>Опыт работы: {stylist.experience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Запись */}
        <section className="py-16 bg-salon-dark text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">Запишитесь на приём</h2>
              <p className="text-gray-300 mb-8">Запланируйте свой визит прямо сейчас и наши мастера помогут создать ваш идеальный образ</p>
              <Button asChild size="lg" className="bg-salon-accent hover:bg-salon-accent/90 px-8">
                <Link to="/booking">Записаться онлайн</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Преимущества */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Почему выбирают нас</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Мы стремимся к совершенству во всем</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-salon-accent/10 text-salon-accent mb-4">
                  <Icon name="Award" size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Профессионализм</h3>
                <p className="text-gray-600">Все наши мастера имеют высокую квалификацию и регулярно повышают свои навыки</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-salon-accent/10 text-salon-accent mb-4">
                  <Icon name="Sparkles" size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Качество</h3>
                <p className="text-gray-600">Мы используем только профессиональную косметику премиум-класса</p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-salon-accent/10 text-salon-accent mb-4">
                  <Icon name="Heart" size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Атмосфера</h3>
                <p className="text-gray-600">Уютная обстановка и внимательное отношение к каждому клиенту</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
