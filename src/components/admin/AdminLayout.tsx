
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
} from '@/components/ui/sidebar';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const menuItems = [
    { path: '/admin', icon: 'LayoutDashboard', label: 'Дашборд' },
    { path: '/admin/services', icon: 'Scissors', label: 'Услуги' },
    { path: '/admin/appointments', icon: 'Calendar', label: 'Записи' },
    { path: '/admin/users', icon: 'Users', label: 'Пользователи' },
    { path: '/admin/products', icon: 'ShoppingBag', label: 'Товары' },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-svh">
        {/* Боковое меню для больших экранов */}
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
              <span className="font-bold text-lg">АдминПанель</span>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent">
                  <span className="font-medium text-sm">{user.name[0]}</span>
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
              >
                <Icon name="LogOut" size={18} />
              </Button>
            </div>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>

        {/* Основной контент */}
        <SidebarInset className="bg-gray-50 overflow-auto">
          {/* Верхняя панель для мобильных устройств */}
          <div className="sticky top-0 z-40 bg-background border-b md:hidden">
            <div className="flex h-16 items-center gap-2 px-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="Menu" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
                  <div className="border-b p-4 flex items-center gap-2">
                    <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
                    <span className="font-bold text-lg">АдминПанель</span>
                  </div>
                  <div className="py-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 ${
                          location.pathname === item.path ? 'bg-salon-accent/10 text-salon-accent font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name={item.icon} size={20} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t mt-auto p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent">
                          <span className="font-medium text-sm">{user.name[0]}</span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          logout();
                          navigate('/admin/login');
                        }}
                      >
                        <Icon name="LogOut" size={18} />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
                <span className="font-bold">АдминПанель</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ml-auto">
                  <Button variant="ghost" size="icon">
                    <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent">
                      <span className="font-medium text-sm">{user.name[0]}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      navigate('/admin/login');
                    }}
                    className="flex items-center gap-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
