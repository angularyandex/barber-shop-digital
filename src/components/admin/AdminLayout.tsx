
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; message: string; time: string }[]>([
    { id: 1, message: 'Новая запись от клиента Анна И.', time: '2 минуты назад' },
    { id: 2, message: 'Заказ #12345 успешно оформлен', time: '15 минут назад' },
    { id: 3, message: 'Низкий остаток товара "Масло для волос"', time: '1 час назад' },
  ]);

  // Проверка авторизации администратора
  useEffect(() => {
    // В реальном приложении здесь будет проверка роли пользователя
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Будет перенаправлено в useEffect
  }

  // Проверка активности элемента меню
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };

  // Очистка уведомления
  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-svh">
        {/* Боковое меню для больших экранов */}
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 p-2">
              <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
              <span className="font-bold text-lg">БьютиСалон</span>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Основное</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin') && location.pathname === '/admin'}
                    tooltip="Дашборд"
                  >
                    <Link to="/admin" className="flex items-center gap-2">
                      <Icon name="LayoutDashboard" />
                      <span>Дашборд</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/appointments')}
                    tooltip="Записи"
                  >
                    <Link to="/admin/appointments" className="flex items-center gap-2">
                      <Icon name="Calendar" />
                      <span>Записи</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/users')}
                    tooltip="Клиенты"
                  >
                    <Link to="/admin/users" className="flex items-center gap-2">
                      <Icon name="Users" />
                      <span>Клиенты</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>Услуги и товары</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/services')}
                    tooltip="Услуги"
                  >
                    <Link to="/admin/services" className="flex items-center gap-2">
                      <Icon name="Scissors" />
                      <span>Услуги</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === '/admin/services'}
                      >
                        <Link to="/admin/services">Все услуги</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/admin/services/categories">Категории</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/admin/services/specialists">Специалисты</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin/products')}
                    tooltip="Товары"
                  >
                    <Link to="/admin/products" className="flex items-center gap-2">
                      <Icon name="ShoppingBag" />
                      <span>Товары</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === '/admin/products'}
                      >
                        <Link to="/admin/products">Все товары</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/admin/products/categories">Категории</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link to="/admin/products/orders">Заказы</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>Система</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Настройки"
                  >
                    <Link to="/admin/settings" className="flex items-center gap-2">
                      <Icon name="Settings" />
                      <span>Настройки</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Файлы"
                  >
                    <Link to="/admin/files" className="flex items-center gap-2">
                      <Icon name="FileText" />
                      <span>Файлы</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                  <AvatarFallback className="bg-salon-accent/10 text-salon-accent">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">Администратор</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/admin/profile" className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      <span>Мой профиль</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/settings" className="flex items-center gap-2">
                      <Icon name="Settings" size={14} />
                      <span>Настройки</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      navigate('/admin/login');
                    }}
                    className="flex items-center gap-2"
                  >
                    <Icon name="LogOut" size={14} />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>

        {/* Основной контент */}
        <SidebarInset className="bg-gray-50 overflow-auto">
          {/* Верхняя панель для мобильных устройств */}
          <div className="sticky top-0 z-40 bg-background border-b md:border-0">
            <div className="flex h-16 items-center gap-2 px-4 shadow-sm md:shadow-none">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Icon name="Menu" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
                  <div className="border-b p-4 flex items-center gap-2">
                    <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
                    <span className="font-bold text-lg">БьютиСалон</span>
                  </div>
                  
                  <div className="p-4 flex items-center gap-3 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                      <AvatarFallback className="bg-salon-accent/10 text-salon-accent">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">Администратор</div>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">Основное</div>
                    <div>
                      <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
                          location.pathname === '/admin' ? 'bg-salon-accent/10 text-salon-accent font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name="LayoutDashboard" size={18} />
                        <span>Дашборд</span>
                      </Link>
                      
                      <Link
                        to="/admin/appointments"
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
                          isActive('/admin/appointments') ? 'bg-salon-accent/10 text-salon-accent font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name="Calendar" size={18} />
                        <span>Записи</span>
                      </Link>
                      
                      <Link
                        to="/admin/users"
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
                          isActive('/admin/users') ? 'bg-salon-accent/10 text-salon-accent font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name="Users" size={18} />
                        <span>Клиенты</span>
                      </Link>
                    </div>
                    
                    <div className="mt-4 px-4 py-2 text-xs font-semibold text-muted-foreground">Услуги и товары</div>
                    <div>
                      <Link
                        to="/admin/services"
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
                          isActive('/admin/services') ? 'bg-salon-accent/10 text-salon-accent font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name="Scissors" size={18} />
                        <span>Услуги</span>
                      </Link>
                      
                      <Link
                        to="/admin/products"
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
                          isActive('/admin/products') ? 'bg-salon-accent/10 text-salon-accent font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name="ShoppingBag" size={18} />
                        <span>Товары</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border-t mt-auto p-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        logout();
                        navigate('/admin/login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      <span>Выйти</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center gap-2 md:hidden">
                <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
                <span className="font-bold">БьютиСалон</span>
              </div>
              
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Icon name="Bell" size={18} />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2 font-medium border-b">Уведомления</div>
                    {notifications.length > 0 ? (
                      <div className="max-h-80 overflow-auto">
                        {notifications.map(notification => (
                          <div key={notification.id} className="p-3 border-b last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => clearNotification(notification.id)}
                              >
                                <Icon name="X" size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Нет новых уведомлений
                      </div>
                    )}
                    {notifications.length > 0 && (
                      <div className="p-2 border-t text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => setNotifications([])}
                        >
                          Очистить все
                        </Button>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link to="/" className="hidden md:block">
                  <Button variant="outline" size="sm">
                    <Icon name="ExternalLink" size={14} className="mr-1" />
                    На сайт
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                        <AvatarFallback className="bg-salon-accent/10 text-salon-accent">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile" className="flex items-center gap-2">
                        <Icon name="User" size={14} />
                        <span>Мой профиль</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/" className="flex items-center gap-2">
                        <Icon name="ExternalLink" size={14} />
                        <span>На сайт</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => {
                        logout();
                        navigate('/admin/login');
                      }}
                      className="flex items-center gap-2"
                    >
                      <Icon name="LogOut" size={14} />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="container py-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
