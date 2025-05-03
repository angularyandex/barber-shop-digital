
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Пример данных записей
const initialAppointments = [
  {
    id: 1,
    client: {
      id: 1,
      name: 'Анна Иванова',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 123-45-67',
      email: 'anna@example.com',
    },
    service: 'Стрижка женская',
    specialist: 'Екатерина',
    date: '2025-05-10',
    time: '14:00',
    duration: 60,
    price: 1500,
    status: 'upcoming',
    notes: '',
  },
  {
    id: 2,
    client: {
      id: 2,
      name: 'Михаил Петров',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 234-56-78',
      email: 'mikhail@example.com',
    },
    service: 'Стрижка мужская',
    specialist: 'Алексей',
    date: '2025-05-15',
    time: '11:30',
    duration: 45,
    price: 1000,
    status: 'upcoming',
    notes: 'Клиент предпочитает короткую стрижку',
  },
  {
    id: 3,
    client: {
      id: 3,
      name: 'Елена Сидорова',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 345-67-89',
      email: 'elena@example.com',
    },
    service: 'Окрашивание',
    specialist: 'Екатерина',
    date: '2025-05-05',
    time: '15:00',
    duration: 120,
    price: 3500,
    status: 'completed',
    notes: 'Использовать оттенок 7.4',
  },
  {
    id: 4,
    client: {
      id: 5,
      name: 'Ольга Кузнецова',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 567-89-01',
      email: 'olga@example.com',
    },
    service: 'Маникюр классический',
    specialist: 'Мария',
    date: '2025-05-02',
    time: '12:00',
    duration: 60,
    price: 1100,
    status: 'cancelled',
    notes: 'Отменено по просьбе клиента',
  },
  {
    id: 5,
    client: {
      id: 1,
      name: 'Анна Иванова',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 123-45-67',
      email: 'anna@example.com',
    },
    service: 'Педикюр',
    specialist: 'Мария',
    date: '2025-05-20',
    time: '16:30',
    duration: 90,
    price: 1800,
    status: 'upcoming',
    notes: '',
  },
];

// Пример данных специалистов
const specialists = [
  { id: 1, name: 'Екатерина', specialization: 'Стилист-колорист' },
  { id: 2, name: 'Алексей', specialization: 'Ведущий стилист' },
  { id: 3, name: 'Мария', specialization: 'Мастер маникюра' },
];

// Пример данных услуг
const services = [
  { id: 1, name: 'Стрижка женская', duration: 60, price: 1500 },
  { id: 2, name: 'Стрижка мужская', duration: 45, price: 1000 },
  { id: 3, name: 'Окрашивание', duration: 120, price: 3500 },
  { id: 4, name: 'Маникюр классический', duration: 60, price: 1100 },
  { id: 5, name: 'Педикюр', duration: 90, price: 1800 },
];

// Пример данных клиентов
const clients = [
  {
    id: 1,
    name: 'Анна Иванова',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+7 (999) 123-45-67',
    email: 'anna@example.com',
  },
  {
    id: 2,
    name: 'Михаил Петров',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+7 (999) 234-56-78',
    email: 'mikhail@example.com',
  },
  {
    id: 3,
    name: 'Елена Сидорова',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+7 (999) 345-67-89',
    email: 'elena@example.com',
  },
];

// Примеры доступного времени
const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

interface Client {
  id: number;
  name: string;
  image: string;
  phone: string;
  email: string;
}

interface Appointment {
  id: number;
  client: Client;
  service: string;
  specialist: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  client: string;
  service: string;
  specialist: string;
  status: string;
  color: string;
}

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specialistFilter, setSpecialistFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: string; id: number | null }>({ type: '', id: null });
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Обработчик поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Фильтрация записей
  const filteredAppointments = appointments.filter(appointment => {
    // Фильтр по поиску
    const searchMatch = 
      appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтр по статусу
    const statusMatch = statusFilter === 'all' || appointment.status === statusFilter;
    
    // Фильтр по специалисту
    const specialistMatch = specialistFilter === 'all' || appointment.specialist === specialistFilter;
    
    return searchMatch && statusMatch && specialistMatch;
  });

  // Изменение статуса записи
  const updateAppointmentStatus = (id: number, status: 'upcoming' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status } : appointment
    ));
  };

  // Удаление записи
  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  // Просмотр деталей записи
  const viewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  // Обработчик для создания новой записи
  const handleAddAppointment = () => {
    const client = clients.find(c => c.id.toString() === selectedClient);
    
    if (!client || !selectedService || !selectedSpecialist || !selectedDate || !selectedTime) {
      return;
    }
    
    const service = services.find(s => s.id.toString() === selectedService);
    
    const newAppointment: Appointment = {
      id: Math.max(...appointments.map(a => a.id)) + 1,
      client,
      service: service ? service.name : '',
      specialist: specialists.find(s => s.id.toString() === selectedSpecialist)?.name || '',
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      duration: service ? service.duration : 60,
      price: service ? service.price : 0,
      status: 'upcoming',
      notes,
    };
    
    setAppointments([...appointments, newAppointment]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  // Сброс формы
  const resetForm = () => {
    setSelectedClient('');
    setSelectedService('');
    setSelectedSpecialist('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setNotes('');
  };

  // Подтверждение действия
  const confirmActionHandler = () => {
    if (confirmAction.type === 'delete' && confirmAction.id) {
      deleteAppointment(confirmAction.id);
    } else if (confirmAction.type === 'cancel' && confirmAction.id) {
      updateAppointmentStatus(confirmAction.id, 'cancelled');
    } else if (confirmAction.type === 'complete' && confirmAction.id) {
      updateAppointmentStatus(confirmAction.id, 'completed');
    }
    
    setIsConfirmDialogOpen(false);
    setConfirmAction({ type: '', id: null });
    setIsDetailsDialogOpen(false);
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
  };

  // Получение цвета статуса
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-500">Предстоит</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Выполнена</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Отменена</Badge>;
      default:
        return null;
    }
  };

  // Получение цвета для события календаря
  const getEventColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Преобразование записей в события календаря
  const calendarEvents: CalendarEvent[] = appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.client.name} - ${appointment.service}`,
    date: appointment.date,
    time: appointment.time,
    client: appointment.client.name,
    service: appointment.service,
    specialist: appointment.specialist,
    status: appointment.status,
    color: getEventColor(appointment.status),
  }));

  // Фильтрация событий для выбранного дня
  const selectedDayEvents = calendarEvents.filter(event => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  }).sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  // Сортировка записей по дате и времени
  const sortedAppointments = React.useMemo(() => {
    return [...filteredAppointments].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [filteredAppointments]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Управление записями</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-salon-accent hover:bg-salon-accent/90' : ''}
          >
            <Icon name="List" size={16} className="mr-1" />
            Список
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
            className={viewMode === 'calendar' ? 'bg-salon-accent hover:bg-salon-accent/90' : ''}
          >
            <Icon name="Calendar" size={16} className="mr-1" />
            Календарь
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-salon-accent hover:bg-salon-accent/90">
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Новая запись
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Создание новой записи</DialogTitle>
                <DialogDescription>
                  Заполните данные для создания новой записи
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Клиент</label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите клиента" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={client.image} alt={client.name} />
                              <AvatarFallback>{client.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{client.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Услуга</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrig ger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} ({service.duration} мин, {service.price} ₽)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Специалист</label>
                  <Select value={selectedSpecialist} onValueChange={setSelectedSpecialist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите специалиста" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialists.map(specialist => (
                        <SelectItem key={specialist.id} value={specialist.id.toString()}>
                          {specialist.name} ({specialist.specialization})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Дата</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {selectedDate ? (
                            format(selectedDate, 'PPP', { locale: ru })
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <Icon name="Calendar" className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          locale={ru}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Время</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Примечания</label>
                  <textarea 
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                    placeholder="Дополнительная информация"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleAddAppointment}>
                  Создать запись
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Список записей</CardTitle>
                <CardDescription>
                  Управление записями клиентов салона
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Input
                  placeholder="Поиск записей..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="max-w-xs"
                />
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="upcoming">Предстоящие</SelectItem>
                    <SelectItem value="completed">Выполненные</SelectItem>
                    <SelectItem value="cancelled">Отмененные</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={specialistFilter}
                  onValueChange={setSpecialistFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Специалист" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все специалисты</SelectItem>
                    {specialists.map(specialist => (
                      <SelectItem key={specialist.id} value={specialist.name}>
                        {specialist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Услуга</TableHead>
                  <TableHead>Специалист</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead className="text-center">Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Записи не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={appointment.client.image} alt={appointment.client.name} />
                            <AvatarFallback>{appointment.client.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{appointment.client.name}</div>
                            <div className="text-sm text-muted-foreground">{appointment.client.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{appointment.service}</div>
                        <div className="text-sm text-muted-foreground">{appointment.duration} мин, {appointment.price} ₽</div>
                      </TableCell>
                      <TableCell>{appointment.specialist}</TableCell>
                      <TableCell>
                        <div className="font-medium">{formatDate(appointment.date)}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => viewAppointmentDetails(appointment)}
                              className="flex items-center gap-2"
                            >
                              <Icon name="Eye" size={14} />
                              <span>Подробности</span>
                            </DropdownMenuItem>
                            
                            {appointment.status === 'upcoming' && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setConfirmAction({ type: 'complete', id: appointment.id });
                                    setIsConfirmDialogOpen(true);
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Icon name="CheckCircle" size={14} className="text-green-500" />
                                  <span className="text-green-500">Отметить как выполненную</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setConfirmAction({ type: 'cancel', id: appointment.id });
                                    setIsConfirmDialogOpen(true);
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Icon name="XCircle" size={14} className="text-red-500" />
                                  <span className="text-red-500">Отменить</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem
                              onClick={() => {
                                setConfirmAction({ type: 'delete', id: appointment.id });
                                setIsConfirmDialogOpen(true);
                              }}
                              className="flex items-center gap-2"
                            >
                              <Icon name="Trash" size={14} className="text-red-500" />
                              <span className="text-red-500">Удалить</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span>Календарь</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date())}>
                      <Icon name="CalendarClock" size={16} />
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                Выберите дату для просмотра записей
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ru}
                  className="mx-auto"
                />
              </div>
              
              <div className="p-4 border-t">
                <h3 className="text-sm font-medium mb-2">Фильтры</h3>
                <div className="space-y-2">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="upcoming">Предстоящие</SelectItem>
                      <SelectItem value="completed">Выполненные</SelectItem>
                      <SelectItem value="cancelled">Отмененные</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={specialistFilter}
                    onValueChange={setSpecialistFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Специалист" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все специалисты</SelectItem>
                      {specialists.map(specialist => (
                        <SelectItem key={specialist.id} value={specialist.name}>
                          {specialist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <h3 className="text-sm font-medium mb-2">Обозначения</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm">Предстоит</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm">Выполнена</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm">Отменена</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                Записи на {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: ru }) : 'сегодня'}
              </CardTitle>
              <CardDescription>
                {selectedDayEvents.length} 
                {selectedDayEvents.length === 1 ? ' запись' : 
                 selectedDayEvents.length > 1 && selectedDayEvents.length < 5 ? ' записи' : ' записей'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDayEvents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
                  <Icon name="Calendar" className="mb-2 h-8 w-8 text-gray-300" />
                  <p>Нет записей на выбранную дату</p>
                  <Button 
                    className="mt-4 bg-salon-accent hover:bg-salon-accent/90"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Создать запись
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDayEvents.map((event) => {
                    const appointmentData = appointments.find(a => a.id === event.id);
                    if (!appointmentData) return null;
                    
                    return (
                      <div 
                        key={event.id} 
                        className="flex items-center justify-between p-4 rounded-lg border hover:border-salon-accent transition-colors cursor-pointer"
                        onClick={() => viewAppointmentDetails(appointmentData)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-full w-1 self-stretch rounded-full ${event.color}`}></div>
                          <div>
                            <div className="font-medium text-lg">{event.time}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointmentData.duration} мин, {appointmentData.price} ₽
                            </div>
                          </div>
                          <div className="ml-6">
                            <div className="font-medium">{event.client}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span>{event.service}</span>
                              <span>•</span>
                              <span>{event.specialist}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(event.status)}
                          <Button variant="ghost" size="icon">
                            <Icon name="ChevronRight" size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Диалог для просмотра деталей записи */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>Детали записи #{selectedAppointment.id}</DialogTitle>
                  <Badge className={`
                    ${selectedAppointment.status === 'upcoming' ? 'bg-blue-500' : 
                      selectedAppointment.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}
                  `}>
                    {selectedAppointment.status === 'upcoming' ? 'Предстоит' : 
                     selectedAppointment.status === 'completed' ? 'Выполнена' : 'Отменена'}
                  </Badge>
                </div>
                <DialogDescription>
                  Полная информация о записи
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Детали</TabsTrigger>
                  <TabsTrigger value="client">Клиент</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Услуга</div>
                      <div className="mt-1 font-medium">{selectedAppointment.service}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Специалист</div>
                      <div className="mt-1 font-medium">{selectedAppointment.specialist}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Дата</div>
                      <div className="mt-1 font-medium">{formatDate(selectedAppointment.date)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Время</div>
                      <div className="mt-1 font-medium">{selectedAppointment.time}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Продолжительность</div>
                      <div className="mt-1 font-medium">{selectedAppointment.duration} минут</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Стоимость</div>
                      <div className="mt-1 font-medium">{selectedAppointment.price} ₽</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Примечания</div>
                    <div className="p-3 bg-gray-50 rounded-md min-h-16">
                      {selectedAppointment.notes || 'Нет примечаний'}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="client" className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedAppointment.client.image} alt={selectedAppointment.client.name} />
                      <AvatarFallback>{selectedAppointment.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xl font-semibold">{selectedAppointment.client.name}</div>
                      <div className="text-muted-foreground">ID: {selectedAppointment.client.id}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Телефон</div>
                      <div className="mt-1 font-medium flex items-center gap-2">
                        <Icon name="Phone" size={14} />
                        {selectedAppointment.client.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Email</div>
                      <div className="mt-1 font-medium flex items-center gap-2">
                        <Icon name="Mail" size={14} />
                        {selectedAppointment.client.email}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Перейти к профилю клиента
                  </Button>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedAppointment.status === 'upcoming' ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="text-green-500 hover:text-green-700 hover:bg-green-50"
                      onClick={() => {
                        setConfirmAction({ type: 'complete', id: selectedAppointment.id });
                        setIsConfirmDialogOpen(true);
                      }}
                    >
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Выполнена
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        setConfirmAction({ type: 'cancel', id: selectedAppointment.id });
                        setIsConfirmDialogOpen(true);
                      }}
                    >
                      <Icon name="XCircle" size={16} className="mr-2" />
                      Отменить
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      setConfirmAction({ type: 'delete', id: selectedAppointment.id });
                      setIsConfirmDialogOpen(true);
                    }}
                  >
                    <Icon name="Trash" size={16} className="mr-2" />
                    Удалить
                  </Button>
                )}
                <Button onClick={() => setIsDetailsDialogOpen(false)}>
                  Закрыть
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог подтверждения действия */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {confirmAction.type === 'delete' ? 'Удаление записи' : 
               confirmAction.type === 'cancel' ? 'Отмена записи' : 'Подтверждение записи'}
            </DialogTitle>
            <DialogDescription>
              {confirmAction.type === 'delete' ? 'Вы уверены, что хотите удалить эту запись? Это действие невозможно отменить.' : 
               confirmAction.type === 'cancel' ? 'Вы уверены, что хотите отменить эту запись?' : 
               'Вы уверены, что хотите отметить запись как выполненную?'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Отмена
            </Button>
            <Button 
              onClick={confirmActionHandler}
              className={
                confirmAction.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 
                confirmAction.type === 'cancel' ? 'bg-orange-500 hover:bg-orange-600' : 
                'bg-green-500 hover:bg-green-600'
              }
            >
              {confirmAction.type === 'delete' ? 'Удалить' : 
               confirmAction.type === 'cancel' ? 'Отменить запись' : 'Подтвердить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAppointments;
