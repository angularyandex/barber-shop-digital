
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';

interface SidebarLinkProps {
  to: string;
  icon: string;
  active?: boolean;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, active, children }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-salon-accent/10 text-salon-accent font-medium'
        : 'hover:bg-gray-100 text-gray-700'
    }`}
  >
    <Icon name={icon} size={18} />
    <span>{children}</span>
  </Link>
);

// Пример данных для демонстрации
const orders = [
  {
    id: '123456',
    date: '5 мая 2025',
    status: 'processing', // processing, shipped, delivered, cancelled
    total: '3200 ₽',
    products: [
      {
        id: '1',
        name: 'Шампунь для окрашенных волос',
        price: '1200 ₽',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594995846645-d58328c3ffa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      },
      {
        id: '2',
        name: 'Масло для волос',
        price: '2000 ₽',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1573575155376-b5010099301a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: '123455',
    date: '25 апреля 2025',
    status: 'delivered',
    total: '5600 ₽',
    products: [
      {
        id: '3',
        name: 'Кондиционер для волос',
        price: '1400 ₽',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      },
      {
        id: '4',
        name: 'Набор косметики для ухода',
        price: '4200 ₽',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

const ProfileOrders: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();

  // Если пользователь не авторизован, перенаправляем на страницу входа
  React.useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center p-8">
            <Icon name="Loader2" className="h-10 w-10 animate-spin text-salon-accent mb-4" />
            <p className="text-gray-600">Загрузка данных...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500">Обработка</Badge>;
      case 'shipped':
        return <Badge className="bg-orange-500">Отправлен</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Доставлен</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Отменен</Badge>;
      default:
        return null;
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Заказ обрабатывается';
      case 'shipped':
        return 'Заказ отправлен';
      case 'delivered':
        return 'Заказ доставлен';
      case 'cancelled':
        return 'Заказ отменен';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-8">Личный кабинет</h1>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Боковое меню */}
            <div className="space-y-1 bg-white rounded-lg shadow-sm p-3">
              <SidebarLink to="/profile" icon="User">
                Мой профиль
              </SidebarLink>
              <SidebarLink to="/profile/appointments" icon="Calendar">
                Мои записи
              </SidebarLink>
              <SidebarLink to="/profile/orders" icon="ShoppingBag" active={true}>
                Мои заказы
              </SidebarLink>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <Icon name="LogOut" size={18} />
                <span>Выйти</span>
              </div>
            </div>

            {/* Основной контент */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Мои заказы</CardTitle>
                      <CardDescription>
                        История и статус ваших заказов
                      </CardDescription>
                    </div>
                    <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                      <Link to="/shop">В магазин</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Icon name="ShoppingBag" size={30} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-4">У вас пока нет заказов</p>
                      <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                        <Link to="/shop">Перейти в магазин</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-gray-50 rounded-lg p-5">
                          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">Заказ #{order.id}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <div className="text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {order.date}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{order.total}</div>
                              <div className="text-sm text-gray-500">{getOrderStatusText(order.status)}</div>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="space-y-4">
                            {order.products.map((product) => (
                              <div key={product.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-gray-500">
                                    Количество: {product.quantity}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">{product.price}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-end mt-4 gap-2">
                            {order.status === 'delivered' && (
                              <Button size="sm" variant="outline">
                                Повторить
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileOrders;
