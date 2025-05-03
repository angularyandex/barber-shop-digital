
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const [period, setPeriod] = useState('week');
  const [notificationsCount] = useState(5);

  // Генерация данных для графиков в зависимости от выбранного периода
  const generateChartData = (period: string) => {
    if (period === 'week') {
      return [
        { day: 'Пн', appointments: 12, sales: 5800, revenue: 8400 },
        { day: 'Вт', appointments: 19, sales: 4200, revenue: 12300 },
        { day: 'Ср', appointments: 15, sales: 6100, revenue: 9800 },
        { day: 'Чт', appointments: 11, sales: 3800, revenue: 7600 },
        { day: 'Пт', appointments: 23, sales: 7900, revenue: 15200 },
        { day: 'Сб', appointments:  28, sales: 9200, revenue: 18400 },
        { day: 'Вс', appointments: 21, sales: 6500, revenue: 14300 },
      ];
    } else if (period === 'month') {
      return [
        { day: '1 нед', appointments: 65, sales: 24000, revenue: 48000 },
        { day: '2 нед', appointments: 72, sales: 26500, revenue: 52000 },
        { day: '3 нед', appointments: 58, sales: 21800, revenue: 43500 },
        { day: '4 нед', appointments: 69, sales: 25200, revenue: 50100 },
      ];
    } else {
      return [
        { day: 'Янв', appointments: 210, sales: 87000, revenue: 187000 },
        { day: 'Фев', appointments: 185, sales: 76000, revenue: 165000 },
        { day: 'Мар', appointments: 222, sales: 92000, revenue: 195000 },
        { day: 'Апр', appointments: 198, sales: 81000, revenue: 172000 },
        { day: 'Май', appointments: 243, sales: 102000, revenue: 210000 },
        { day: 'Июн', appointments: 264, sales: 112000, revenue: 226000 },
        { day: 'Июл', appointments: 287, sales: 124000, revenue: 245000 },
        { day: 'Авг', appointments: 258, sales: 105000, revenue: 218000 },
        { day: 'Сен', appointments: 230, sales: 96000, revenue: 203000 },
        { day: 'Окт', appointments: 245, sales: 103000, revenue: 215000 },
        { day: 'Ноя', appointments: 213, sales: 91000, revenue: 190000 },
        { day: 'Дек', appointments: 280, sales: 118000, revenue: 238000 },
      ];
    }
  };

  const chartData = generateChartData(period);

  // Данные для графика услуг
  const serviceData = [
    { name: 'Стрижки', value: 35 },
    { name: 'Окрашивание', value: 25 },
    { name: 'Маникюр', value: 15 },
    { name: 'Педикюр', value: 10 },
    { name: 'Массаж', value: 8 },
    { name: 'Другие', value: 7 },
  ];

  // Цвета для графика услуг
  const COLORS = ['#8884d8', '#9b87f5', '#82ca9d', '#ffc658', '#ff8042', '#A0AEC0'];

  // Данные о продажах по категориям
  const categoryData = [
    { name: 'Шампуни', sales: 22600 },
    { name: 'Средства для укладки', sales: 18400 },
    { name: 'Маски', sales: 15800 },
    { name: 'Масла', sales: 12300 },
    { name: 'Лаки', sales: 9500 },
  ];

  // Уведомления для дашборда
  const notifications = [
    {
      id: 1,
      title: 'Клиент отменил запись',
      description: 'Анна Иванова отменила запись на 15:00',
      time: '10 минут назад',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Заканчивается товар',
      description: 'Шампунь для окрашенных волос (5 шт)',
      time: '1 час назад',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Новая запись',
      description: 'Михаил Петров записался на окрашивание в 14:00 завтра',
      time: '2 часа назад',
      type: 'success'
    },
    {
      id: 4,
      title: 'Новый заказ в магазине',
      description: 'Заказ #1072 на сумму 3800₽',
      time: '4 часа назад',
      type: 'success'
    },
    {
      id: 5,
      title: 'Новое сообщение',
      description: 'Елена Сидорова написала в чат',
      time: '6 часов назад',
      type: 'info'
    },
  ];

  // Данные о ближайших записях
  const upcomingAppointments = [
    {
      id: 1,
      client: 'Анна Иванова',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80',
      service: 'Окрашивание волос',
      time: '13:00',
      specialist: 'Мария Соколова',
    },
    {
      id: 2,
      client: 'Петр Смирнов',
      service: 'Мужская стрижка',
      time: '14:30',
      specialist: 'Алексей Петров',
    },
    {
      id: 3,
      client: 'Елена Козлова',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80',
      service: 'Маникюр',
      time: '16:00',
      specialist: 'Ольга Смирнова',
    },
  ];

  // Данные о недавних заказах
  const recentOrders = [
    {
      id: 1,
      number: 'ORD-2025-0023',
      client: 'Анна Иванова',
      date: '03.05.2025',
      total: 3540,
      status: 'completed',
    },
    {
      id: 2,
      number: 'ORD-2025-0022',
      client: 'Михаил Федоров',
      date: '02.05.2025',
      total: 1850,
      status: 'processing',
    },
    {
      id: 3,
      number: 'ORD-2025-0021',
      client: 'Елена Козлова',
      date: '01.05.2025',
      total: 4200,
      status: 'completed',
    },
  ];

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Выполнен</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">В обработке</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Отменен</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Панель управления</h1>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-1">
            <Icon name="Download" size={16} />
            <span className="hidden sm:inline">Экспорт</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Записи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chartData.reduce((sum, item) => sum + item.appointments, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+12%</span> по сравнению с предыдущим периодом
            </p>
            <div className="mt-4 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#9b87f5" 
                    fillOpacity={1} 
                    fill="url(#appointmentsGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Продажи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chartData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()} ₽
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+8%</span> по сравнению с предыдущим периодом
            </p>
            <div className="mt-4 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#4ade80" 
                    fillOpacity={1} 
                    fill="url(#salesGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Выручка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chartData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()} ₽
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+14%</span> по сравнению с предыдущим периодом
            </p>
            <div className="mt-4 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#revenueGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {notificationsCount}
              <Badge className="ml-2 bg-red-500">{notificationsCount} новых</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Требуют внимания администратора
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="/admin/chat">
                  <Icon name="Bell" className="mr-2 h-4 w-4" />
                  Просмотреть все
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Анализ продаж и записей</CardTitle>
            <CardDescription>
              Динамика показателей за выбранный период
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'appointments') return [value, 'Записи'];
                    if (name === 'sales') return [`${value} ₽`, 'Продажи'];
                    return [value, name];
                  }} />
                  <Bar
                    yAxisId="left"
                    dataKey="appointments"
                    fill="#9b87f5"
                    name="Записи"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="sales"
                    fill="#4ade80"
                    name="Продажи"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Популярные услуги</CardTitle>
            <CardDescription>
              Распределение по категориям услуг
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Доля']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Продажи по категориям</CardTitle>
            <CardDescription>
              Топ категорий товаров по продажам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} ₽`, 'Продажи']} />
                  <Bar dataKey="sales" fill="#9b87f5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <Tabs defaultValue="notifications">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Активность</CardTitle>
                  <TabsList>
                    <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                    <TabsTrigger value="appointments">Записи</TabsTrigger>
                    <TabsTrigger value="orders">Заказы</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="notifications" className="m-0">
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${
                          notification.type === 'success' ? 'bg-green-100 text-green-600' :
                          notification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon 
                            name={
                              notification.type === 'success' ? 'CheckCircle' :
                              notification.type === 'warning' ? 'AlertTriangle' :
                              'Info'
                            } 
                            size={16} 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="appointments" className="m-0">
                  <div className="space-y-4">
                    {upcomingAppointments.map(appointment => (
                      <div key={appointment.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-salon-accent/10 flex items-center justify-center">
                            {appointment.clientAvatar ? (
                              <img 
                                src={appointment.clientAvatar} 
                                alt={appointment.client} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-salon-accent font-medium">
                                {appointment.client.charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{appointment.client}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{appointment.service}</span>
                            <span>•</span>
                            <span>{appointment.specialist}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-lg">{appointment.time}</span>
                          <div className="text-xs text-gray-500">Сегодня</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="m-0">
                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                        <div>
                          <p className="font-medium">{order.number}</p>
                          <div className="text-sm text-gray-500 mt-1">
                            <span>{order.client}</span>
                            <span className="mx-1">•</span>
                            <span>{order.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total.toLocaleString()} ₽</p>
                          <div className="mt-1">
                            {getOrderStatusBadge(order.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
