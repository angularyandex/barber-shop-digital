
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import ChatWidget from '@/components/ChatWidget';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(2);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/services' },
    { name: 'Магазин', href: '/shop' },
    { name: 'Акции', href: '/promotions' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Запись подтверждена',
      description: 'Ваша запись на стрижку завтра в 14:00 подтверждена',
      time: '10 минут назад',
      read: false,
      type: 'appointment'
    },
    {
      id: 2,
      title: 'Новая акция',
      description: '-20% на окрашивание до конца недели',
      time: '2 часа назад',
      read: false,
      type: 'promotion'
    },
    {
      id: 3,
      title: 'Заказ доставлен',
      description: 'Ваш заказ №1072 доставлен в пункт выдачи',
      time: '1 день назад',
      read: false,
      type: 'order'
    }
  ];

  const markAllAsRead = () => {
    setUnreadNotifications(0);
  };

  const markNotificationAsRead = (notificationId: number) => {
    // В реальном приложении здесь был бы запрос на сервер
    setUnreadNotifications(Math.max(0, unreadNotifications - 1));
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setUnreadMessages(0);
  };

  useEffect(() => {
    // Имитация получения новых сообщений
    const timer = setTimeout(() => {
      if (!isChatOpen && Math.random() > 0.7) {
        setUnreadMessages(prev => prev + 1);
      }
    }, 60000);
    
    return () => clearTimeout(timer);
  }, [isChatOpen, unreadMessages]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center space-x-2">
          <Icon name="Scissors" className="h-8 w-8 text-salon-accent" />
          <span className="font-playfair text-xl font-bold">БьютиСалон</span>
        </Link>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center space-x-6">
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
          <div className="flex items-center space-x-2 mr-2">
            {/* Онлайн-консультант */}
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleOpenChat}
            >
              <Icon name="MessageCircle" className="h-5 w-5 text-gray-600" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadMessages}
                </span>
              )}
            </button>

            {/* Уведомления */}
            {user && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Icon name="Bell" className="h-5 w-5 text-gray-600" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">Уведомления</h3>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Прочитать все
                    </Button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-gray-50' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`rounded-full p-2 ${
                                notification.type === 'appointment' ? 'bg-blue-100 text-blue-500' :
                                notification.type === 'promotion' ? 'bg-green-100 text-green-500' : 
                                'bg-orange-100 text-orange-500'
                              }`}>
                                <Icon 
                                  name={
                                    notification.type === 'appointment' ? 'Calendar' :
                                    notification.type === 'promotion' ? 'BadgePercent' : 
                                    'Package'
                                  } 
                                  size={16} 
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">{notification.title}</h4>
                                  {!notification.read && (
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        Нет уведомлений
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t text-center">
                    <Link to="/profile/notifications" className="text-sm text-salon-accent hover:underline">
                      Посмотреть все уведомления
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

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
                <DropdownMenuItem asChild>
                  <Link to="/profile/favorites" className="flex items-center gap-2">
                    <Icon name="Heart" size={16} />
                    <span>Избранное</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                      <Icon name="LayoutDashboard" size={16} />
                      <span>Админ-панель</span>
                    </Link>
                  </DropdownMenuItem>
                )}
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
            
            <div className="flex flex-wrap gap-3 mt-4 mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => {
                  handleOpenChat();
                  setIsOpen(false);
                }}
              >
                <Icon name="MessageCircle" size={16} />
                <span>Консультация</span>
                {unreadMessages > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
              
              {user && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to="/profile/notifications">
                    <Icon name="Bell" size={16} />
                    <span>Уведомления</span>
                    {unreadNotifications > 0 && (
                      <Badge className="bg-red-500 text-white">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}
            </div>
            
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
                    <Button asChild variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                      <Link to="/profile/favorites" className="flex items-center gap-2">
                        <Icon name="Heart" size={16} />
                        <span>Избранное</span>
                      </Link>
                    </Button>
                    {user.role === 'admin' && (
                      <Button asChild variant="ghost" className="justify-start" onClick={() => setIsOpen(false)}>
                        <Link to="/admin/dashboard" className="flex items-center gap-2">
                          <Icon name="LayoutDashboard" size={16} />
                          <span>Админ-панель</span>
                        </Link>
                      </Button>
                    )}
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

      {/* Виджет чата */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  );
};

export default Header;
