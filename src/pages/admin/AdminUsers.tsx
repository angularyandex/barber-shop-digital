
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
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

// Пример данных пользователей
const initialUsers = [
  {
    id: 1,
    name: 'Анна Иванова',
    email: 'anna@example.com',
    phone: '+7 (999) 123-45-67',
    status: 'active',
    role: 'user',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastVisit: '2025-05-01',
    totalAppointments: 5,
    totalOrders: 2,
  },
  {
    id: 2,
    name: 'Михаил Петров',
    email: 'mikhail@example.com',
    phone: '+7 (999) 234-56-78',
    status: 'active',
    role: 'user',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastVisit: '2025-04-28',
    totalAppointments: 3,
    totalOrders: 1,
  },
  {
    id: 3,
    name: 'Елена Сидорова',
    email: 'elena@example.com',
    phone: '+7 (999) 345-67-89',
    status: 'inactive',
    role: 'user',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastVisit: '2025-04-15',
    totalAppointments: 2,
    totalOrders: 0,
  },
  {
    id: 4,
    name: 'Александр Новиков',
    email: 'alex@example.com',
    phone: '+7 (999) 456-78-90',
    status: 'active',
    role: 'admin',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastVisit: '2025-05-02',
    totalAppointments: 0,
    totalOrders: 0,
  },
  {
    id: 5,
    name: 'Ольга Кузнецова',
    email: 'olga@example.com',
    phone: '+7 (999) 567-89-01',
    status: 'active',
    role: 'user',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastVisit: '2025-04-30',
    totalAppointments: 7,
    totalOrders: 3,
  },
];

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  role: 'user' | 'admin';
  image: string;
  lastVisit: string;
  totalAppointments: number;
  totalOrders: number;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Обработчик поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Фильтрация пользователей
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  // Сортировка пользователей
  const sortedUsers = React.useMemo(() => {
    if (!sortField) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [filteredUsers, sortField, sortDirection]);

  // Обработчик изменения сортировки
  const handleSort = (field: keyof User) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  // Обработчик изменения статуса пользователя
  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Пользователи</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Поиск пользователей..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-xs"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
          <CardDescription>
            Управление пользователями салона
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                  Имя
                  {sortField === 'name' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                      size={14} 
                      className="ml-1 inline" 
                    />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                  Контакты
                  {sortField === 'email' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                      size={14} 
                      className="ml-1 inline" 
                    />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort('role')} className="cursor-pointer">
                  Роль
                  {sortField === 'role' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                      size={14} 
                      className="ml-1 inline" 
                    />
                  )}
                </TableHead>
                <TableHead onClick={() => handleSort('lastVisit')} className="cursor-pointer">
                  Последний визит
                  {sortField === 'lastVisit' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                      size={14} 
                      className="ml-1 inline" 
                    />
                  )}
                </TableHead>
                <TableHead>Статистика</TableHead>
                <TableHead className="text-center">Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Пользователи не найдены
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <img src={user.image} alt={user.name} />
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{user.email}</div>
                      <div className="text-sm text-muted-foreground">{user.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.role === 'admin' ? 'bg-salon-primary' : 'bg-salon-accent/70'}>
                        {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.lastVisit)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} className="text-blue-500" />
                        <span className="text-sm">{user.totalAppointments} записей</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="ShoppingBag" size={14} className="text-green-500" />
                        <span className="text-sm">{user.totalOrders} заказов</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`${
                          user.status === 'active' 
                            ? 'bg-green-500' 
                            : 'bg-gray-500'
                        }`}
                      >
                        {user.status === 'active' ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Icon name="User" size={14} />
                            <span>Просмотр профиля</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Icon name="MessageSquare" size={14} />
                            <span>Отправить сообщение</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? (
                              <>
                                <Icon name="UserX" size={14} className="text-red-500" />
                                <span className="text-red-500">Деактивировать</span>
                              </>
                            ) : (
                              <>
                                <Icon name="UserCheck" size={14} className="text-green-500" />
                                <span className="text-green-500">Активировать</span>
                              </>
                            )}
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
    </div>
  );
};

export default AdminUsers;
