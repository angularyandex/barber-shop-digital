
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

// Пример данных услуг
const initialServices = [
  {
    id: 1,
    name: 'Стрижка женская',
    description: 'Стрижка любой сложности с учетом особенностей волос',
    duration: 60,
    price: 1500,
    category: 'Стрижки',
    specialists: [1, 2],
    popularity: 87,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Стрижка мужская',
    description: 'Классическая или модельная стрижка',
    duration: 45,
    price: 1000,
    category: 'Стрижки',
    specialists: [2],
    popularity: 92,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Окрашивание',
    description: 'Окрашивание волос профессиональными красителями',
    duration: 120,
    price: 3500,
    category: 'Окрашивание',
    specialists: [1],
    popularity: 76,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1554519515-242161756769?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Маникюр классический',
    description: 'Обработка ногтевой пластины и кутикулы',
    duration: 60,
    price: 1100,
    category: 'Маникюр',
    specialists: [3],
    popularity: 89,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b960?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    name: 'Педикюр',
    description: 'Комплексный уход за ногтями и кожей стоп',
    duration: 90,
    price: 1800,
    category: 'Педикюр',
    specialists: [3],
    popularity: 64,
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  }
];

// Пример данных категорий
const initialCategories = [
  { id: 1, name: 'Стрижки', description: 'Все виды стрижек для мужчин и женщин', count: 2, status: 'active' },
  { id: 2, name: 'Окрашивание', description: 'Окрашивание и колорирование волос', count: 1, status: 'active' },
  { id: 3, name: 'Маникюр', description: 'Уход за ногтями и кожей рук', count: 1, status: 'active' },
  { id: 4, name: 'Педикюр', description: 'Уход за ногтями и кожей ног', count: 1, status: 'active' },
  { id: 5, name: 'СПА-процедуры', description: 'Расслабляющие и оздоровительные процедуры', count: 0, status: 'inactive' },
];

// Пример данных специалистов
const initialSpecialists = [
  { 
    id: 1, 
    name: 'Екатерина', 
    position: 'Стилист-колорист',
    experience: '5 лет',
    photo: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    services: [1, 3],
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Алексей', 
    position: 'Ведущий стилист',
    experience: '7 лет',
    photo: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    services: [1, 2],
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Мария', 
    position: 'Мастер маникюра и педикюра',
    experience: '4 года',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    services: [4, 5],
    status: 'active'
  },
];

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  specialists: number[];
  popularity: number;
  status: 'active' | 'inactive';
  image: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  count: number;
  status: 'active' | 'inactive';
}

interface Specialist {
  id: number;
  name: string;
  position: string;
  experience: string;
  photo: string;
  services: number[];
  status: 'active' | 'inactive';
}

const AdminServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState<Service[]>(initialServices);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [specialists, setSpecialists] = useState<Specialist[]>(initialSpecialists);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  
  const [isAssignSpecialistsDialogOpen, setIsAssignSpecialistsDialogOpen] = useState(false);
  const [serviceForSpecialistAssignment, setServiceForSpecialistAssignment] = useState<Service | null>(null);
  const [selectedSpecialists, setSelectedSpecialists] = useState<number[]>([]);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState<'service' | 'category'>('service');
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  
  const [newService, setNewService] = useState<Omit<Service, 'id' | 'specialists' | 'popularity'>>({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: '',
    status: 'active',
    image: '',
  });
  
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'count'>>({
    name: '',
    description: '',
    status: 'active',
  });

  // Фильтрация услуг
  const filteredServices = services.filter(service => {
    // Фильтр по поиску
    const searchMatch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтр по категории
    const categoryMatch = categoryFilter === 'all' || service.category === categoryFilter;
    
    // Фильтр по статусу
    const statusMatch = statusFilter === 'all' || service.status === statusFilter;
    
    return searchMatch && categoryMatch && statusMatch;
  });

  // Фильтрация категорий
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Обработчики для формы добавления услуги
  const handleAddServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleAddServiceSelectChange = (name: string, value: string) => {
    setNewService(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = () => {
    const id = Math.max(0, ...services.map(s => s.id)) + 1;
    const newServiceComplete: Service = { 
      id, 
      ...newService, 
      specialists: [],
      popularity: 0,
    };
    
    setServices([...services, newServiceComplete]);
    toast({
      title: "Услуга добавлена",
      description: `Услуга "${newService.name}" успешно добавлена.`,
    });
    
    // Обновить счетчик в категории
    const categoryName = newService.category;
    setCategories(categories.map(category => 
      category.name === categoryName 
        ? { ...category, count: category.count + 1 } 
        : category
    ));
    
    resetNewServiceForm();
    setIsAddServiceDialogOpen(false);
  };

  const resetNewServiceForm = () => {
    setNewService({
      name: '',
      description: '',
      duration: 60,
      price: 0,
      category: '',
      status: 'active',
      image: '',
    });
  };

  // Обработчики для формы редактирования услуги
  const handleEditServiceClick = (service: Service) => {
    setCurrentService(service);
    setIsEditServiceDialogOpen(true);
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

  const handleEditServiceSelectChange = (name: string, value: string) => {
    if (!currentService) return;
    
    setCurrentService(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateService = () => {
    if (!currentService) return;
    
    const oldCategory = services.find(s => s.id === currentService.id)?.category;
    const newCategory = currentService.category;
    
    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ));
    
    toast({
      title: "Услуга обновлена",
      description: `Услуга "${currentService.name}" успешно обновлена.`,
    });
    
    // Обновить счетчики категорий, если категория изменилась
    if (oldCategory !== newCategory) {
      setCategories(categories.map(category => {
        if (category.name === oldCategory) {
          return { ...category, count: Math.max(0, category.count - 1) };
        } else if (category.name === newCategory) {
          return { ...category, count: category.count + 1 };
        }
        return category;
      }));
    }
    
    setIsEditServiceDialogOpen(false);
  };

  // Обработчик изменения статуса услуги
  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' } 
        : service
    ));
  };

  // Обработчики для формы добавления категории
  const handleAddCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCategory = () => {
    const id = Math.max(0, ...categories.map(c => c.id)) + 1;
    const newCategoryComplete: Category = { 
      id, 
      ...newCategory, 
      count: 0,
    };
    
    setCategories([...categories, newCategoryComplete]);
    toast({
      title: "Категория добавлена",
      description: `Категория "${newCategory.name}" успешно добавлена.`,
    });
    
    resetNewCategoryForm();
    setIsAddCategoryDialogOpen(false);
  };

  const resetNewCategoryForm = () => {
    setNewCategory({
      name: '',
      description: '',
      status: 'active',
    });
  };

  // Обработчики для формы редактирования категории
  const handleEditCategoryClick = (category: Category) => {
    setCurrentCategory(category);
    setIsEditCategoryDialogOpen(true);
  };

  const handleEditCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCategory) return;
    
    const { name, value } = e.target;
    setCurrentCategory(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEditCategorySelectChange = (value: 'active' | 'inactive') => {
    if (!currentCategory) return;
    
    setCurrentCategory(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: value,
      };
    });
  };

  const handleUpdateCategory = () => {
    if (!currentCategory) return;
    
    const oldName = categories.find(c => c.id === currentCategory.id)?.name;
    const newName = currentCategory.name;
    
    setCategories(categories.map(category => 
      category.id === currentCategory.id ? currentCategory : category
    ));
    
    toast({
      title: "Категория обновлена",
      description: `Категория "${currentCategory.name}" успешно обновлена.`,
    });
    
    // Обновить категорию в услугах, если название изменилось
    if (oldName !== newName) {
      setServices(services.map(service => 
        service.category === oldName 
          ? { ...service, category: newName } 
          : service
      ));
    }
    
    setIsEditCategoryDialogOpen(false);
  };

  // Обработчик изменения статуса категории
  const toggleCategoryStatus = (id: number) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' } 
        : category
    ));
  };

  // Обработчики для назначения специалистов
  const handleAssignSpecialistsClick = (service: Service) => {
    setServiceForSpecialistAssignment(service);
    setSelectedSpecialists(service.specialists);
    setIsAssignSpecialistsDialogOpen(true);
  };

  const handleSpecialistSelectionChange = (specialistId: number) => {
    setSelectedSpecialists(prev => {
      if (prev.includes(specialistId)) {
        return prev.filter(id => id !== specialistId);
      } else {
        return [...prev, specialistId];
      }
    });
  };

  const handleSaveSpecialistAssignments = () => {
    if (!serviceForSpecialistAssignment) return;
    
    // Обновить список специалистов в услуге
    setServices(services.map(service => 
      service.id === serviceForSpecialistAssignment.id 
        ? { ...service, specialists: selectedSpecialists } 
        : service
    ));
    
    // Обновить список услуг у специалистов
    setSpecialists(specialists.map(specialist => {
      if (selectedSpecialists.includes(specialist.id)) {
        if (!specialist.services.includes(serviceForSpecialistAssignment.id)) {
          return { 
            ...specialist, 
            services: [...specialist.services, serviceForSpecialistAssignment.id] 
          };
        }
      } else {
        return { 
          ...specialist, 
          services: specialist.services.filter(id => id !== serviceForSpecialistAssignment.id) 
        };
      }
      return specialist;
    }));
    
    toast({
      title: "Специалисты назначены",
      description: `Специалисты успешно назначены на услугу "${serviceForSpecialistAssignment.name}".`,
    });
    
    setIsAssignSpecialistsDialogOpen(false);
  };

  // Обработчик удаления 
  const handleDeleteClick = (type: 'service' | 'category', id: number) => {
    setDeleteItemType(type);
    setDeleteItemId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteItemId) return;
    
    if (deleteItemType === 'service') {
      const serviceToDelete = services.find(s => s.id === deleteItemId);
      if (serviceToDelete) {
        // Удалить услугу
        setServices(services.filter(service => service.id !== deleteItemId));
        
        // Обновить счетчик в категории
        const categoryName = serviceToDelete.category;
        setCategories(categories.map(category => 
          category.name === categoryName 
            ? { ...category, count: Math.max(0, category.count - 1) } 
            : category
        ));
        
        // Удалить услугу из списка услуг специалистов
        setSpecialists(specialists.map(specialist => ({
          ...specialist,
          services: specialist.services.filter(id => id !== deleteItemId)
        })));
        
        toast({
          title: "Услуга удалена",
          description: `Услуга "${serviceToDelete.name}" успешно удалена.`,
        });
      }
    } else if (deleteItemType === 'category') {
      const categoryToDelete = categories.find(c => c.id === deleteItemId);
      if (categoryToDelete) {
        if (categoryToDelete.count > 0) {
          toast({
            title: "Ошибка удаления",
            description: "Невозможно удалить категорию, содержащую услуги. Сначала переместите или удалите услуги из этой категории.",
            variant: "destructive",
          });
        } else {
          setCategories(categories.filter(category => category.id !== deleteItemId));
          
          toast({
            title: "Категория удалена",
            description: `Категория "${categoryToDelete.name}" успешно удалена.`,
          });
        }
      }
    }
    
    setIsDeleteDialogOpen(false);
  };

  // Получение имен специалистов по их идентификаторам
  const getSpecialistNames = (specialistIds: number[]) => {
    if (!specialistIds.length) return 'Не назначены';
    
    return specialistIds.map(id => {
      const specialist = specialists.find(s => s.id === id);
      return specialist ? specialist.name : '';
    }).join(', ');
  };

  const getStatusBadge = (status: 'active' | 'inactive') => {
    return (
      <Badge 
        className={`${
          status === 'active' 
            ? 'bg-green-500' 
            : 'bg-gray-500'
        }`}
      >
        {status === 'active' ? 'Активна' : 'Неактивна'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Управление услугами</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="services" className="px-6">Услуги</TabsTrigger>
            <TabsTrigger value="categories" className="px-6">Категории</TabsTrigger>
            <TabsTrigger value="specialists" className="px-6">Специалисты</TabsTrigger>
          </TabsList>
          
          {activeTab === "services" && (
            <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-salon-accent hover:bg-salon-accent/90">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить услугу
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
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
                    <Select 
                      onValueChange={(value) => handleAddServiceSelectChange('category', value)} 
                      value={newService.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter(category => category.status === 'active')
                          .map(category => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ссылка на изображение</label>
                    <Input 
                      name="image" 
                      value={newService.image} 
                      onChange={handleAddServiceChange} 
                      placeholder="URL изображения" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Статус</label>
                    <Select 
                      onValueChange={(value: 'active' | 'inactive') => handleAddServiceSelectChange('status', value)} 
                      value={newService.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активна</SelectItem>
                        <SelectItem value="inactive">Неактивна</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button 
                    className="bg-salon-accent hover:bg-salon-accent/90" 
                    onClick={handleAddService}
                    disabled={!newService.name || !newService.category}
                  >
                    Сохранить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          {activeTab === "categories" && (
            <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-salon-accent hover:bg-salon-accent/90">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить категорию
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавление новой категории</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новой категории услуг
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Название категории</label>
                    <Input 
                      name="name" 
                      value={newCategory.name} 
                      onChange={handleAddCategoryChange} 
                      placeholder="Введите название категории" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Описание</label>
                    <Input 
                      name="description" 
                      value={newCategory.description} 
                      onChange={handleAddCategoryChange} 
                      placeholder="Краткое описание категории" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Статус</label>
                    <Select 
                      onValueChange={(value: 'active' | 'inactive') => setNewCategory(prev => ({ ...prev, status: value }))} 
                      value={newCategory.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активна</SelectItem>
                        <SelectItem value="inactive">Неактивна</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button 
                    className="bg-salon-accent hover:bg-salon-accent/90" 
                    onClick={handleAddCategory}
                    disabled={!newCategory.name}
                  >
                    Сохранить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <CardTitle>Список услуг</CardTitle>
                  <CardDescription>
                    Управляйте услугами, предоставляемыми в салоне
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Все категории" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="inactive">Неактивные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredServices.length === 0 ? (
                  <div className="md:col-span-2 xl:col-span-3 text-center py-8 text-muted-foreground">
                    Услуги не найдены
                  </div>
                ) : (
                  filteredServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden border hover:border-salon-accent transition-colors">
                      <div className="relative h-36 overflow-hidden">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Icon name="ImageOff" className="text-gray-400" size={24} />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          {getStatusBadge(service.status)}
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{service.name}</h3>
                              <Badge variant="outline" className="mt-1">
                                {service.category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">{service.price} ₽</div>
                              <div className="text-sm text-muted-foreground">{service.duration} мин</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {service.description}
                          </p>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Специалисты: </span>
                            <span className="font-medium">{getSpecialistNames(service.specialists)}</span>
                          </div>
                          {service.popularity > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Icon name="TrendingUp" size={14} />
                              <span>Популярность: {service.popularity}%</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 pt-0 pb-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAssignSpecialistsClick(service)}
                          className="text-salon-accent"
                        >
                          Специалисты
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditServiceClick(service)}>
                              <Icon name="Edit" size={14} className="mr-2" />
                              <span>Редактировать</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleServiceStatus(service.id)}>
                              {service.status === 'active' ? (
                                <>
                                  <Icon name="EyeOff" size={14} className="mr-2 text-orange-500" />
                                  <span className="text-orange-500">Деактивировать</span>
                                </>
                              ) : (
                                <>
                                  <Icon name="Eye" size={14} className="mr-2 text-green-500" />
                                  <span className="text-green-500">Активировать</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick('service', service.id)}
                              className="text-red-500"
                            >
                              <Icon name="Trash" size={14} className="mr-2" />
                              <span>Удалить</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Категории услуг</CardTitle>
              <CardDescription>
                Управляйте категориями услуг салона
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead className="text-center">Кол-во услуг</TableHead>
                    <TableHead className="text-center">Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Категории не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="font-medium">{category.name}</div>
                        </TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell className="text-center">{category.count}</TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(category.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditCategoryClick(category)}
                            >
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleCategoryStatus(category.id)}
                            >
                              {category.status === 'active' ? (
                                <Icon name="EyeOff" size={16} className="text-red-500" />
                              ) : (
                                <Icon name="Eye" size={16} className="text-green-500" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteClick('category', category.id)}
                              disabled={category.count > 0}
                            >
                              <Icon name="Trash" size={16} className="text-red-500" />
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
        </TabsContent>

        <TabsContent value="specialists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Специалисты и их услуги</CardTitle>
              <CardDescription>
                Просмотр специалистов и назначенных им услуг
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialists.map((specialist) => {
                  const specialistServices = services.filter(service => 
                    specialist.services.includes(service.id)
                  );
                  
                  return (
                    <Card key={specialist.id} className="overflow-hidden">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={specialist.photo} alt={specialist.name} />
                            <AvatarFallback>{specialist.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{specialist.name}</h3>
                            <div className="text-sm text-muted-foreground">{specialist.position}</div>
                            <div className="text-xs text-muted-foreground">Опыт: {specialist.experience}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Услуги специалиста:</h4>
                          {specialistServices.length === 0 ? (
                            <div className="text-sm italic text-muted-foreground">
                              Нет назначенных услуг
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {specialistServices.map(service => (
                                <div 
                                  key={service.id} 
                                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-sm"
                                >
                                  <span>{service.name}</span>
                                  <span className="text-muted-foreground">{service.price} ₽</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог редактирования услуги */}
      <Dialog open={isEditServiceDialogOpen} onOpenChange={setIsEditServiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
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
                <Select 
                  onValueChange={(value) => handleEditServiceSelectChange('category', value)} 
                  value={currentService.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter(category => category.status === 'active')
                      .map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ссылка на изображение</label>
                <Input 
                  name="image" 
                  value={currentService.image} 
                  onChange={handleEditServiceChange} 
                  placeholder="URL изображения" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Статус</label>
                <Select 
                  onValueChange={(value: 'active' | 'inactive') => handleEditServiceSelectChange('status', value)} 
                  value={currentService.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Активна</SelectItem>
                    <SelectItem value="inactive">Неактивна</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditServiceDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleUpdateService}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования категории */}
      <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование категории</DialogTitle>
            <DialogDescription>
              Измените информацию о категории услуг
            </DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название категории</label>
                <Input 
                  name="name" 
                  value={currentCategory.name} 
                  onChange={handleEditCategoryChange} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Описание</label>
                <Input 
                  name="description" 
                  value={currentCategory.description} 
                  onChange={handleEditCategoryChange} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Статус</label>
                <Select 
                  onValueChange={(value: 'active' | 'inactive') => handleEditCategorySelectChange(value)} 
                  value={currentCategory.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Активна</SelectItem>
                    <SelectItem value="inactive">Неактивна</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Количество услуг в категории: {currentCategory.count}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCategoryDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleUpdateCategory}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог назначения специалистов */}
      <Dialog open={isAssignSpecialistsDialogOpen} onOpenChange={setIsAssignSpecialistsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Назначение специалистов</DialogTitle>
            <DialogDescription>
              {serviceForSpecialistAssignment ? (
                <>Выберите специалистов для услуги "{serviceForSpecialistAssignment.name}"</>
              ) : (
                <>Выберите специалистов для услуги</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {specialists.filter(s => s.status === 'active').map(specialist => (
              <div key={specialist.id} className="flex items-center space-x-3 rounded-md border p-3">
                <Checkbox 
                  id={`specialist-${specialist.id}`}
                  checked={selectedSpecialists.includes(specialist.id)}
                  onCheckedChange={() => handleSpecialistSelectionChange(specialist.id)}
                />
                <div className="flex flex-1 items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={specialist.photo} alt={specialist.name} />
                    <AvatarFallback>{specialist.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-0.5">
                    <label
                      htmlFor={`specialist-${specialist.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {specialist.name}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {specialist.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignSpecialistsDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleSaveSpecialistAssignments}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deleteItemType === 'service' ? 'Удаление услуги' : 'Удаление категории'}
            </DialogTitle>
            <DialogDescription>
              {deleteItemType === 'service' 
                ? 'Вы уверены, что хотите удалить эту услугу? Это действие невозможно отменить.'
                : 'Вы уверены, что хотите удалить эту категорию? Это действие невозможно отменить.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
