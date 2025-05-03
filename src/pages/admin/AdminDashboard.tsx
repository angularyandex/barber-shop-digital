
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

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

const weeklyAppointmentsData = [
  { name: 'Пн', value: 12 },
  { name: 'Вт', value: 18 },
  { name: 'Ср', value: 15 },
  { name: 'Чт', value: 20 },
  { name: 'Пт', value: 25 },
  { name: 'Сб', value: 22 },
  { name: 'Вс', value: 0 },
];

const monthlyAppointmentsData = [
  { name: 'Неделя 1', value: 42 },
  { name: 'Неделя 2', value: 38 },
  { name: 'Неделя 3', value: 47 },
  { name: 'Неделя 4', value: 53 },
];

const categoryData = [
  { name: 'Стрижки', value: 35 },
  { name: 'Окрашивание', value: 25 },
  { name: 'Маникюр', value: 20 },
  { name: 'Педикюр', value: 10 },
  { name: 'Другое', value: 10 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#F2FCE2'];

const topServices = [
  { name: 'Стрижка женская', count: 156, revenue: 234000 },
  { name: 'Окрашивание', count: 89, revenue: 356000 },
  { name: 'Маникюр', count: 104, revenue: 114400 },
  { name: 'Стрижка мужская', count: 78, revenue: 78000 },
];

const recentActivities = [
  { id: 1, type: 'appointment', user: { name: 'Анна К.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, action: 'записалась на стрижку', time: '2 часа назад' },
  { id: 2, type: 'order', user: { name: 'Михаил С.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, action: 'оформил заказ #12345', time: '3 часа назад' },
  { id: 3, type: 'feedback', user: { name: 'Елена Д.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, action: 'оставила отзыв (5★)', time: '5 часов назад' },
  { id: 4, type: 'appointment', user: { name: 'Виктор А.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, action: 'отменил запись', time: '1 день назад' },
];

const todayAppointments = [
  { 
    id: 1, 
    client: 'Анна Иванова',
    clientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    service: 'Стрижка женская',
    specialist: 'Екатерина',
    time: '10:00',
    status: 'completed'
  },
  { 
    id: 2, 
    client: 'Михаил Петров',
    clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    service: 'Стрижка мужская',
    specialist: 'Алексей',
    time: '11:30',
    status: 'ongoing'
  },
  { 
    id: 3, 
    client: 'Елена Сидорова',
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    service: 'Окрашивание',
    specialist: 'Екатерина',
    time: '14:00',
    status: 'upcoming'
  },
  { 
    id: 4, 
    client: 'Ольга Кузнецова',
    clientImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    service: 'Маникюр',
    specialist: 'Мария',
    time: '16:30',
    status: 'upcoming'
  },
];

const lowStockItems = [
  { id: 1, name: 'Масло для волос', stock: 3, category: 'Маски и масла' },
  { id: 2, name: 'Шампунь для окрашенных волос', stock: 5, category: 'Шампуни' },
  { id: 3, name: 'Гель-лак красный', stock: 2, category: 'Маникюр' },
];

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');
  const [appointmentsView, setAppointmentsView] = useState<'day' | 'week'>('week');

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

  const getAppointmentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Выполнена</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-500">В процессе</Badge>;
      case 'upcoming':
        return <Badge className="bg-salon-accent">Предстоит</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Отменена</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Панель управления</h1>
          <p className="text-muted-foreground">
            Аналитика и ключевые метрики вашего салона
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={(value: 'week' | 'month' | 'year') => setDateRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Последняя неделя</SelectItem>
              <SelectItem value="month">Последний месяц</SelectItem>
              <SelectItem value="year">Последний год</SelectItem>
            </SelectContent>
          </Select>
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
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Icon name="TrendingUp" className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 mr-1">+20.1%</span>
              <span>к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новых клиентов</CardTitle>
            <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+48</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Icon name="TrendingUp" className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 mr-1">+12.2%</span>
              <span>к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Записей</CardTitle>
            <Icon name="Calendar" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Icon name="TrendingUp" className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 mr-1">+5.0%</span>
              <span>к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Продаж</CardTitle>
            <Icon name="ShoppingCart" className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Icon name="TrendingUp" className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 mr-1">+10.5%</span>
              <span>к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной дашборд */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка */}
        <div className="col-span-2 space-y-6">
          {/* График доходов */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Доход за период</CardTitle>
              <CardDescription>
                Динамика дохода салона
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Доход']}
                    labelFormatter={(label) => `Период: ${label}`}
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

          {/* Записи и распределение услуг */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* График записей */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Записи</CardTitle>
                  <div className="flex">
                    <Button 
                      variant={appointmentsView === 'day' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setAppointmentsView('day')}
                      className={appointmentsView === 'day' ? 'bg-salon-accent hover:bg-salon-accent/90' : ''}
                    >
                      День
                    </Button>
                    <Button 
                      variant={appointmentsView === 'week' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setAppointmentsView('week')}
                      className={appointmentsView === 'week' ? 'bg-salon-accent hover:bg-salon-accent/90' : ''}
                    >
                      Неделя
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {appointmentsView === 'day' ? 'Записи по дням недели' : 'Записи по неделям'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={appointmentsView === 'day' ? weeklyAppointmentsData : monthlyAppointmentsData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${value} записей`, 'Количество']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Распределение услуг */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Распределение услуг</CardTitle>
                <CardDescription>
                  Соотношение категорий услуг
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Доля']}
                    />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Записи на сегодня */}
          <Card>
            <CardHeader>
              <CardTitle>Записи на сегодня</CardTitle>
              <CardDescription>
                Список записей на текущий день
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayAppointments.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  На сегодня нет записей
                </div>
              ) : (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={appointment.clientImage} alt={appointment.client} />
                          <AvatarFallback>{appointment.client[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{appointment.client}</div>
                          <div className="text-sm text-muted-foreground">{appointment.service}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{appointment.time}</div>
                          <div className="text-xs text-muted-foreground">{appointment.specialist}</div>
                        </div>
                        {getAppointmentStatusBadge(appointment.status)}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Все записи
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка */}
        <div className="space-y-6">
          {/* Популярные услуги */}
          <Card>
            <CardHeader>
              <CardTitle>Популярные услуги</CardTitle>
              <CardDescription>Топ услуг по количеству записей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, i) => (
                  <div key={i} className="flex items-center justify-between border-b last:border-none pb-3 last:pb-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent font-medium text-sm">
                        {i + 1}
                      </div>
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

          {/* Последние активности */}
          <Card>
            <CardHeader>
              <CardTitle>Последние активности</CardTitle>
              <CardDescription>Недавние действия клиентов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 border-b last:border-none pb-3 last:pb-0">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.image} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        <span className="text-salon-accent">{activity.user.name}</span> {activity.action}
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Товары с низким остатком */}
          <Card>
            <CardHeader>
              <CardTitle>Низкий остаток товаров</CardTitle>
              <CardDescription>Товары, требующие пополнения</CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockItems.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  Нет товаров с низким остатком
                </div>
              ) : (
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.category}</div>
                      </div>
                      <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                        Остаток: {item.stock}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Управление товарами
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
