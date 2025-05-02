
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';
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

// Пример данных записей
const initialAppointments = [
  {
    id: 1,
    client: {
      id: 1,
      name: 'Анна Иванова',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 123-45-67',
    },
    service: 'Стрижка женская',
    specialist: 'Екатерина',
    date: '2025-05-10',
    time: '14:00',
    duration: 60,
    status: 'upcoming',
  },
  {
    id: 2,
    client: {
      id: 2,
      name: 'Михаил Петров',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 234-56-78',
    },
    service: 'Стрижка мужская',
    specialist: 'Алексей',
    date: '2025-05-15',
    time: '11:30',
    duration: 45,
    status: 'upcoming',
  },
  {
    id: 3,
    client: {
      id: 3,
      name: 'Елена Сидорова',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 345-67-89',
    },
    service: 'Окрашивание',
    specialist: 'Екатерина',
    date: '2025-05-05',
    time: '15:00',
    duration: 120,
    status: 'completed',
  },
  {
    id: 4,
    client: {
      id: 5,
      name: 'Ольга Кузнецова',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 567-89-01',
    },
    service: 'Маникюр классический',
    specialist: 'Мария',
    date: '2025-05-02',
    time: '12:00',
    duration: 60,
    status: 'cancelled',
  },
  {
    id: 5,
    client: {
      id: 1,
      name: 'Анна Иванова',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+7 (999) 123-45-67',
    },
    service: 'Педикюр',
    specialist: 'Мария',
    date: '2025-05-20',
    time: '16:30',
    duration: 90,
    status: 'upcoming',
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
  { id: 1, name: 'Стрижка женская', duration: 60 },
  { id: 2, name: 'Стрижка мужская', duration: 45 },
  { id: 3, name: 'Окрашивание', duration: 120 },
  { id: 4, name: 'Маникюр классический', duration: 60 },
  { id: 5, name: 'Педикюр', duration: 90 },
];

interface Client {
  id: number;
  name: string;
  image: string;
  phone: string;
}

interface Appointment {
  id: number;
  client: Client;
  service: string;
  specialist: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

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
    
    return searchMatch && statusMatch;
  });

  // Изменение статуса записи
  const updateAppointmentStatus = (id: number, status: 'upcoming' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status } : appointment
    ));
  };

  // Просмотр деталей записи
  const viewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-salon-accent hover:bg-salon-accent/90">
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Новая запись
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Создание новой записи</DialogTitle>
                <DialogDescription>
                  Заполните данные для создания новой записи
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Клиент</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите клиента" />
                    </SelectTrigger>
                    <SelectContent>
                      {initialAppointments.map(a => (
                        <SelectItem key={a.client.id} value={a.client.id.toString()}>
                          {a.client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Услуга</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} ({service.duration} мин)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Специалист</label>
                  <Select>
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
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Время</label>
                    <Input type="time" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-salon-accent hover:bg-salon-accent/90">
                  Создать запись
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список записей</CardTitle>
          <CardDescription>
            Управление записями клиентов салона
          </CardDescription>
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
                          <img src={appointment.client.image} alt={appointment.client.name} />
                        </Avatar>
                        <div>
                          <div className="font-medium">{appointment.client.name}</div>
                          <div className="text-sm text-muted-foreground">{appointment.client.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.service}</div>
                      <div className="text-sm text-muted-foreground">{appointment.duration} мин</div>
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
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                className="flex items-center gap-2"
                              >
                                <Icon name="CheckCircle" size={14} className="text-green-500" />
                                <span className="text-green-500">Отметить как выполненную</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                className="flex items-center gap-2"
                              >
                                <Icon name="XCircle" size={14} className="text-red-500" />
                                <span className="text-red-500">Отменить</span>
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* Диалог для просмотра деталей записи */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>Детали записи</DialogTitle>
                <DialogDescription>
                  Информация о записи №{selectedAppointment.id}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <img src={selectedAppointment.client.image} alt={selectedAppointment.client.name} />
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold">{selectedAppointment.client.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedAppointment.client.phone}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Услуга</div>
                    <div className="mt-1">{selectedAppointment.service}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Специалист</div>
                    <div className="mt-1">{selectedAppointment.specialist}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Дата</div>
                    <div className="mt-1">{formatDate(selectedAppointment.date)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Время</div>
                    <div className="mt-1">{selectedAppointment.time}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Продолжительность</div>
                    <div className="mt-1">{selectedAppointment.duration} минут</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Статус</div>
                    <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => setIsDetailsDialogOpen(false)}
                  className="sm:order-last"
                >
                  Закрыть
                </Button>
                {selectedAppointment.status === 'upcoming' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="text-green-500 hover:text-green-700 hover:bg-green-50"
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'completed');
                        setIsDetailsDialogOpen(false);
                      }}
                    >
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Отметить как выполненную
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'cancelled');
                        setIsDetailsDialogOpen(false);
                      }}
                    >
                      <Icon name="XCircle" size={16} className="mr-2" />
                      Отменить
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAppointments;
