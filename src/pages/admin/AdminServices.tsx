
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

// Пример данных услуг
const initialServices = [
  {
    id: 1,
    name: 'Стрижка женская',
    description: 'Стрижка любой сложности с учетом особенностей волос',
    duration: 60,
    price: 1500,
    category: 'Стрижки',
    status: 'active',
  },
  {
    id: 2,
    name: 'Стрижка мужская',
    description: 'Классическая или модельная стрижка',
    duration: 45,
    price: 1000,
    category: 'Стрижки',
    status: 'active',
  },
  {
    id: 3,
    name: 'Окрашивание',
    description: 'Окрашивание волос профессиональными красителями',
    duration: 120,
    price: 3500,
    category: 'Окрашивание',
    status: 'active',
  },
  {
    id: 4,
    name: 'Маникюр классический',
    description: 'Обработка ногтевой пластины и кутикулы',
    duration: 60,
    price: 1100,
    category: 'Маникюр',
    status: 'active',
  },
  {
    id: 5,
    name: 'Педикюр',
    description: 'Комплексный уход за ногтями и кожей стоп',
    duration: 90,
    price: 1800,
    category: 'Педикюр',
    status: 'inactive',
  }
];

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  status: 'active' | 'inactive';
}

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: '',
    status: 'active',
  });

  // Фильтрация услуг по поиску
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Обработчики для формы добавления услуги
  const handleAddServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleAddService = () => {
    const id = Math.max(0, ...services.map(s => s.id)) + 1;
    setServices([...services, { id, ...newService }]);
    setNewService({
      name: '',
      description: '',
      duration: 60,
      price: 0,
      category: '',
      status: 'active',
    });
    setIsAddDialogOpen(false);
  };

  // Обработчики для формы редактирования услуги
  const handleEditClick = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  const handleEditServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentService) return;
    
    const { name, value } = e.target;
    setCurrentService(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === 'duration' || name === 'price' ? Number(value) : value,
      };
    });
  };

  const handleUpdateService = () => {
    if (!currentService) return;
    
    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ));
    setIsEditDialogOpen(false);
  };

  // Обработчик изменения статуса услуги
  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' } 
        : service
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Управление услугами</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Поиск услуг..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-salon-accent hover:bg-salon-accent/90">
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Добавить услугу
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавление новой услуги</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новой услуге салона
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Название услуги</label>
                  <Input 
                    name="name" 
                    value={newService.name} 
                    onChange={handleAddServiceChange} 
                    placeholder="Введите название услуги" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Описание</label>
                  <Input 
                    name="description" 
                    value={newService.description} 
                    onChange={handleAddServiceChange} 
                    placeholder="Краткое описание услуги" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Длительность (мин)</label>
                    <Input 
                      name="duration" 
                      type="number" 
                      value={newService.duration} 
                      onChange={handleAddServiceChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Цена (₽)</label>
                    <Input 
                      name="price" 
                      type="number" 
                      value={newService.price} 
                      onChange={handleAddServiceChange} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Категория</label>
                  <Input 
                    name="category" 
                    value={newService.category} 
                    onChange={handleAddServiceChange} 
                    placeholder="Категория услуги" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleAddService}>
                  Сохранить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список услуг</CardTitle>
          <CardDescription>
            Управляйте услугами, предоставляемыми в салоне
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">Длительность</TableHead>
                <TableHead className="text-right">Цена</TableHead>
                <TableHead className="text-center">Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Услуги не найдены
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {service.description}
                      </div>
                    </TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell className="text-right">{service.duration} мин</TableCell>
                    <TableCell className="text-right">{service.price} ₽</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`${
                          service.status === 'active' 
                            ? 'bg-green-500' 
                            : 'bg-gray-500'
                        }`}
                      >
                        {service.status === 'active' ? 'Активна' : 'Неактивна'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(service)}
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleServiceStatus(service.id)}
                        >
                          {service.status === 'active' ? (
                            <Icon name="EyeOff" size={16} className="text-red-500" />
                          ) : (
                            <Icon name="Eye" size={16} className="text-green-500" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Диалог редактирования услуги */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование услуги</DialogTitle>
            <DialogDescription>
              Измените информацию об услуге
            </DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название услуги</label>
                <Input 
                  name="name" 
                  value={currentService.name} 
                  onChange={handleEditServiceChange} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Описание</label>
                <Input 
                  name="description" 
                  value={currentService.description} 
                  onChange={handleEditServiceChange} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Длительность (мин)</label>
                  <Input 
                    name="duration" 
                    type="number" 
                    value={currentService.duration} 
                    onChange={handleEditServiceChange} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Цена (₽)</label>
                  <Input 
                    name="price" 
                    type="number" 
                    value={currentService.price} 
                    onChange={handleEditServiceChange} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Категория</label>
                <Input 
                  name="category" 
                  value={currentService.category} 
                  onChange={handleEditServiceChange} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleUpdateService}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
