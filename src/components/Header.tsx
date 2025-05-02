
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/services' },
    { name: 'Магазин', href: '/shop' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center space-x-2">
          <Icon name="Scissors" className="h-8 w-8 text-salon-accent" />
          <span className="font-playfair text-xl font-bold">БьютиСалон</span>
        </Link>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-base hover:text-salon-accent transition-colors ${
                location.pathname === item.href
                  ? 'text-salon-accent font-medium'
                  : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Кнопки авторизации для десктопа */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent">
                    <span className="font-medium text-sm">{user.name.charAt(0)}</span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    <span>Мой профиль</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/appointments" className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>Мои записи</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/orders" className="flex items-center gap-2">
                    <Icon name="ShoppingBag" size={16} />
                    <span>Мои заказы</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
                  <Icon name="LogOut" size={16} />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link to="/login">Войти</Link>
              </Button>
              <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                <Link to="/register">Регистрация</Link>
              </Button>
            </>
          )}
        </div>

        {/* Мобильное меню */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <div className="flex items-center pb-4 mb-4 border-b">
              <Icon name="Scissors" className="h-6 w-6 text-salon-accent mr-2" />
              <span className="font-playfair text-lg font-bold">БьютиСалон</span>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base hover:text-salon-accent transition-colors ${
                    location.pathname === item.href
                      ? 'text-salon-accent font-medium'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent">
                      <span className="font-medium text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button asChild variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                      <Link to="/profile" className="flex items-center gap-2">
                        <Icon name="User" size={16} />
                        <span>Мой профиль</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                      <Link to="/profile/appointments" className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        <span>Мои записи</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                      <Link to="/profile/orders" className="flex items-center gap-2">
                        <Icon name="ShoppingBag" size={16} />
                        <span>Мои заказы</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { logout(); setIsOpen(false); }}>
                      <Icon name="LogOut" size={16} className="mr-2" />
                      <span>Выйти</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                    <Link to="/login">Войти</Link>
                  </Button>
                  <Button asChild className="w-full bg-salon-accent hover:bg-salon-accent/90" onClick={() => setIsOpen(false)}>
                    <Link to="/register">Регистрация</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
