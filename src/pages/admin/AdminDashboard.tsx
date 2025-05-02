
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Пример данных для графиков и статистики
const revenueData = [
  { name: 'Янв', value: 45000 },
  { name: 'Фев', value: 52000 },
  { name: 'Мар', value: 48000 },
  { name: 'Апр', value: 61000 },
  { name: 'Май', value: 55000 },
  { name: 'Июн', value: 67000 },
  { name: 'Июл', value: 72000 },
];

const appointmentsData = [
  { name: 'Пн', value: 12 },
  { name: 'Вт', value: 18 },
  { name: 'Ср', value: 15 },
  { name: 'Чт', value: 20 },
  { name: 'Пт', value: 25 },
  { name: 'Сб', value: 22 },
  { name: 'Вс', value: 8 },
];

const topServices = [
  { name: 'Стрижка женская', count: 156, revenue: 234000 },
  { name: 'Окрашивание', count: 89, revenue: 356000 },
  { name: 'Маникюр', count: 104, revenue: 114400 },
  { name: 'Стрижка мужская', count: 78, revenue: 78000 },
];

const recentActivities = [
  { id: 1, type: 'appointment', user: 'Анна К.', action: 'записалась на стрижку', time: '2 часа назад' },
  { id: 2, type: 'order', user: 'Михаил С.', action: 'оформил заказ #12345', time: '3 часа назад' },
  { id: 3, type: 'feedback', user: 'Елена Д.', action: 'оставила отзыв (5★)', time: '5 часов назад' },
  { id: 4, type: 'appointment', user: 'Виктор А.', action: 'отменил запись', time: '1 день назад' },
];

const AdminDashboard: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Icon name="Calendar" className="text-blue-500" size={18} />;
      case 'order':
        return <Icon name="ShoppingBag" className="text-green-500" size={18} />;
      case 'feedback':
        return <Icon name="Star" className="text-yellow-500" size={18} />;
      default:
        return <Icon name="Activity" className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Обзор салона</h1>
        <div className="text-sm text-muted-foreground">
          Обновлено: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
            <Icon name="DollarSign" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(400000)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% по сравнению с предыдущим месяцем
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новых клиентов</CardTitle>
            <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+48</div>
            <p className="text-xs text-muted-foreground">
              +12.2% по сравнению с предыдущим месяцем
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Записей</CardTitle>
            <Icon name="Calendar" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              +5% по сравнению с предыдущим месяцем
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Продаж</CardTitle>
            <Icon name="ShoppingCart" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              +10.5% по сравнению с предыдущим месяцем
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Графики */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Доход</CardTitle>
            <CardDescription>
              Динамика дохода за последние 7 месяцев
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value / 1000}K`} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Доход']}
                  labelFormatter={(label) => `Месяц: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Записи</CardTitle>
            <CardDescription>
              Количество записей по дням недели
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appointmentsData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value} записей`, 'Количество']}
                  labelFormatter={(label) => `День: ${label}`}
                />
                <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Топ услуг и последние активности */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Популярные услуги</CardTitle>
            <CardDescription>Топ услуг по количеству записей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{i + 1}.</div>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.count} записей</div>
                    </div>
                  </div>
                  <div className="font-medium text-right">{formatCurrency(service.revenue)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Последние активности</CardTitle>
            <CardDescription>Недавние действия клиентов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      <span className="text-salon-accent">{activity.user}</span> {activity.action}
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
