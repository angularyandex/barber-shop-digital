
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
const appointments = [
  {
    id: '1',
    service: 'Стрижка и укладка',
    specialist: 'Екатерина',
    date: '10 мая 2025',
    time: '14:00',
    status: 'upcoming', // upcoming, completed, cancelled
  },
  {
    id: '2',
    service: 'Окрашивание волос',
    specialist: 'Алексей',
    date: '25 мая 2025',
    time: '11:30',
    status: 'upcoming',
  },
  {
    id: '3',
    service: 'Маникюр',
    specialist: 'Мария',
    date: '1 мая 2025',
    time: '15:00',
    status: 'completed',
  },
  {
    id: '4',
    service: 'Уход за волосами',
    specialist: 'Екатерина',
    date: '15 апреля 2025',
    time: '10:00',
    status: 'cancelled',
  },
];

const ProfileAppointments: React.FC = () => {
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
      case 'upcoming':
        return <Badge className="bg-blue-500">Предстоит</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Завершено</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Отменено</Badge>;
      default:
        return null;
    }
  };

  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const historyAppointments = appointments.filter(app => app.status !== 'upcoming');

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
              <SidebarLink to="/profile/appointments" icon="Calendar" active={true}>
                Мои записи
              </SidebarLink>
              <SidebarLink to="/profile/orders" icon="ShoppingBag">
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
              <Card className="mb-8">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Предстоящие записи</CardTitle>
                      <CardDescription>
                        Ваши запланированные визиты в салон
                      </CardDescription>
                    </div>
                    <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                      <Link to="/booking">Новая запись</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Icon name="Calendar" size={30} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-4">У вас нет предстоящих записей</p>
                      <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                        <Link to="/booking">Записаться</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                              <div className="font-medium mb-1">{appointment.service}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Icon name="User" size={14} />
                                  {appointment.specialist}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {appointment.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {appointment.time}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(appointment.status)}
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                Отменить
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История записей</CardTitle>
                  <CardDescription>
                    Ваши прошлые визиты и отмененные записи
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {historyAppointments.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      У вас нет завершенных или отмененных записей
                    </div>
                  ) : (
                    <div className="divide-y">
                      {historyAppointments.map((appointment) => (
                        <div key={appointment.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                              <div className="font-medium mb-1">{appointment.service}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Icon name="User" size={14} />
                                  {appointment.specialist}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {appointment.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {appointment.time}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(appointment.status)}
                              {appointment.status === 'completed' && (
                                <Button variant="ghost" size="sm" className="text-salon-accent">
                                  Оставить отзыв
                                </Button>
                              )}
                            </div>
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

export default ProfileAppointments;
