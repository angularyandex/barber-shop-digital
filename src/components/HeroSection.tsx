
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-salon-dark to-salon-dark/90 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
          alt="Салон красоты" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="container relative py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
            Создаем красоту и стиль
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Профессиональная забота о ваших волосах, идеальный стиль и безупречный образ
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-salon-accent hover:bg-salon-accent/90 text-white">
              <Link to="/booking">Записаться онлайн</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/services">Наши услуги</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
