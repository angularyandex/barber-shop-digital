
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
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

// Пример данных товаров
const initialProducts = [
  {
    id: 1,
    name: 'Шампунь для окрашенных волос',
    description: 'Бережно очищает и сохраняет цвет окрашенных волос',
    price: 850,
    stock: 15,
    category: 'Шампуни',
    brand: 'L\'Oréal Professionnel',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Восстанавливающая маска',
    description: 'Глубокое восстановление поврежденных волос',
    price: 1200,
    stock: 8,
    category: 'Маски и кондиционеры',
    brand: 'Kérastase',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Масло для волос',
    description: 'Питательное масло для блеска и защиты волос',
    price: 1500,
    stock: 3,
    category: 'Масла и сыворотки',
    brand: 'Moroccanoil',
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1631730273291-b8279857601b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Лак для волос сильной фиксации',
    description: 'Надежная фиксация прически на весь день',
    price: 650,
    stock: 20,
    category: 'Стайлинг',
    brand: 'Taft',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    name: 'Гель-лак красный',
    description: 'Стойкий гель-лак насыщенного красного оттенка',
    price: 850,
    stock: 2,
    category: 'Маникюр',
    brand: 'OPI',
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b960?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    name: 'Расческа массажная',
    description: 'Деревянная массажная расческа для бережного расчесывания',
    price: 950,
    stock: 0,
    category: 'Аксессуары',
    brand: 'Aveda',
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1621607151242-57292a880166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

// Пример данных категорий товаров
const initialProductCategories = [
  { id: 1, name: 'Шампуни', count: 1 },
  { id: 2, name: 'Маски и кондиционеры', count: 1 },
  { id: 3, name: 'Масла и сыворотки', count: 1 },
  { id: 4, name: 'Стайлинг', count: 1 },
  { id: 5, name: 'Маникюр', count: 1 },
  { id: 6, name: 'Аксессуары', count: 1 },
];

// Пример данных брендов
const initialBrands = [
  { id: 1, name: 'L\'Oréal Professionnel', count: 1 },
  { id: 2, name: 'Kérastase', count: 1 },
  { id: 3, name: 'Moroccanoil', count: 1 },
  { id: 4, name: 'Taft', count: 1 },
  { id: 5, name: 'OPI', count: 1 },
  { id: 6, name: 'Aveda', count: 1 },
];

// Пример данных заказов
const initialOrders = [
  {
    id: 1,
    number: 'ORD-2025-0001',
    customer: 'Анна Иванова',
    date: '2025-05-01',
    total: 2050,
    status: 'completed',
    items: [
      { productId: 1, name: 'Шампунь для окрашенных волос', quantity: 1, price: 850 },
      { productId: 2, name: 'Восстанавливающая маска', quantity: 1, price: 1200 },
    ],
  },
  {
    id: 2,
    number: 'ORD-2025-0002',
    customer: 'Михаил Петров',
    date: '2025-05-02',
    total: 1300,
    status: 'processing',
    items: [
      { productId: 4, name: 'Лак для волос сильной фиксации', quantity: 2, price: 650 },
    ],
  },
  {
    id: 3,
    number: 'ORD-2025-0003',
    customer: 'Елена Сидорова',
    date: '2025-05-03',
    total: 3000,
    status: 'processing',
    items: [
      { productId: 3, name: 'Масло для волос', quantity: 2, price: 1500 },
    ],
  },
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
}

interface ProductCategory {
  id: number;
  name: string;
  count: number;
}

interface Brand {
  id: number;
  name: string;
  count: number;
}

interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  number: string;
  customer: string;
  date: string;
  total: number;
  status: 'completed' | 'processing' | 'cancelled';
  items: OrderItem[];
}

const AdminProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(initialProductCategories);
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [isAddBrandDialogOpen, setIsAddBrandDialogOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  
  const [isOrderDetailsDialogOpen, setIsOrderDetailsDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState<'product' | 'category' | 'brand'>('product');
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'status'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
    image: '',
  });

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Фильтр по поиску
    const searchMatch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтр по категории
    const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
    
    // Фильтр по наличию
    const stockMatch = 
      stockFilter === 'all' || 
      (stockFilter === 'in_stock' && product.status === 'in_stock') ||
      (stockFilter === 'low_stock' && product.status === 'low_stock') ||
      (stockFilter === 'out_of_stock' && product.status === 'out_of_stock');
    
    return searchMatch && categoryMatch && stockMatch;
  });

  // Фильтрация категорий товаров
  const filteredCategories = productCategories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Фильтрация брендов
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => 
    order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Обработчики для формы добавления товара
  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleAddProductSelectChange = (name: string, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const id = Math.max(0, ...products.map(p => p.id)) + 1;
    
    // Определение статуса на основе количества товара
    let status: 'in_stock' | 'low_stock' | 'out_of_stock';
    if (newProduct.stock <= 0) {
      status = 'out_of_stock';
    } else if (newProduct.stock <= 5) {
      status = 'low_stock';
    } else {
      status = 'in_stock';
    }
    
    const newProductComplete: Product = { 
      id, 
      ...newProduct, 
      status,
    };
    
    setProducts([...products, newProductComplete]);
    
    // Обновить счетчик в категории
    const categoryName = newProduct.category;
    const existingCategory = productCategories.find(c => c.name === categoryName);
    
    if (existingCategory) {
      setProductCategories(productCategories.map(category => 
        category.name === categoryName 
          ? { ...category, count: category.count + 1 } 
          : category
      ));
    }
    
    // Обновить счетчик у бренда
    const brandName = newProduct.brand;
    const existingBrand = brands.find(b => b.name === brandName);
    
    if (existingBrand) {
      setBrands(brands.map(brand => 
        brand.name === brandName 
          ? { ...brand, count: brand.count + 1 } 
          : brand
      ));
    }
    
    toast({
      title: "Товар добавлен",
      description: `Товар "${newProduct.name}" успешно добавлен.`,
    });
    
    resetNewProductForm();
    setIsAddProductDialogOpen(false);
  };

  const resetNewProductForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      brand: '',
      image: '',
    });
  };

  // Обработчики для формы редактирования товара
  const handleEditProductClick = (product: Product) => {
    setCurrentProduct(product);
    setIsEditProductDialogOpen(true);
  };

  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentProduct) return;
    
    const { name, value } = e.target;
    setCurrentProduct(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: name === 'price' || name === 'stock' ? Number(value) : value,
      };
    });
  };

  const handleEditProductSelectChange = (name: string, value: string) => {
    if (!currentProduct) return;
    
    setCurrentProduct(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateProduct = () => {
    if (!currentProduct) return;
    
    const oldCategory = products.find(p => p.id === currentProduct.id)?.category;
    const newCategory = currentProduct.category;
    
    const oldBrand = products.find(p => p.id === currentProduct.id)?.brand;
    const newBrand = currentProduct.brand;
    
    // Обновление статуса товара в зависимости от остатка
    let updatedProduct = { ...currentProduct };
    if (updatedProduct.stock <= 0) {
      updatedProduct.status = 'out_of_stock';
    } else if (updatedProduct.stock <= 5) {
      updatedProduct.status = 'low_stock';
    } else {
      updatedProduct.status = 'in_stock';
    }
    
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    
    // Обновить счетчики категорий, если категория изменилась
    if (oldCategory !== newCategory) {
      setProductCategories(productCategories.map(category => {
        if (category.name === oldCategory) {
          return { ...category, count: Math.max(0, category.count - 1) };
        } else if (category.name === newCategory) {
          return { ...category, count: category.count + 1 };
        }
        return category;
      }));
    }
    
    // Обновить счетчики брендов, если бренд изменился
    if (oldBrand !== newBrand) {
      setBrands(brands.map(brand => {
        if (brand.name === oldBrand) {
          return { ...brand, count: Math.max(0, brand.count - 1) };
        } else if (brand.name === newBrand) {
          return { ...brand, count: brand.count + 1 };
        }
        return brand;
      }));
    }
    
    toast({
      title: "Товар обновлен",
      description: `Товар "${currentProduct.name}" успешно обновлен.`,
    });
    
    setIsEditProductDialogOpen(false);
  };

  // Обработчики для добавления категории
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const id = Math.max(0, ...productCategories.map(c => c.id)) + 1;
    const newCategory: ProductCategory = { 
      id, 
      name: newCategoryName,
      count: 0,
    };
    
    setProductCategories([...productCategories, newCategory]);
    
    toast({
      title: "Категория добавлена",
      description: `Категория "${newCategoryName}" успешно добавлена.`,
    });
    
    setNewCategoryName('');
    setIsAddCategoryDialogOpen(false);
  };

  // Обработчики для добавления бренда
  const handleAddBrand = () => {
    if (!newBrandName.trim()) return;
    
    const id = Math.max(0, ...brands.map(b => b.id)) + 1;
    const newBrand: Brand = { 
      id, 
      name: newBrandName,
      count: 0,
    };
    
    setBrands([...brands, newBrand]);
    
    toast({
      title: "Бренд добавлен",
      description: `Бренд "${newBrandName}" успешно добавлен.`,
    });
    
    setNewBrandName('');
    setIsAddBrandDialogOpen(false);
  };

  // Обработчик для просмотра деталей заказа
  const handleViewOrderDetails = (order: Order) => {
    setCurrentOrder(order);
    setIsOrderDetailsDialogOpen(true);
  };

  // Обработчик изменения статуса заказа
  const handleUpdateOrderStatus = (orderId: number, newStatus: 'completed' | 'processing' | 'cancelled') => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
    
    toast({
      title: "Статус заказа обновлен",
      description: `Статус заказа успешно изменен на "${
        newStatus === 'completed' ? 'Выполнен' : 
        newStatus === 'processing' ? 'В обработке' : 'Отменен'
      }".`,
    });
    
    setIsOrderDetailsDialogOpen(false);
  };

  // Обработчик удаления 
  const handleDeleteClick = (type: 'product' | 'category' | 'brand', id: number) => {
    setDeleteItemType(type);
    setDeleteItemId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteItemId) return;
    
    if (deleteItemType === 'product') {
      const productToDelete = products.find(p => p.id === deleteItemId);
      if (productToDelete) {
        // Удалить товар
        setProducts(products.filter(product => product.id !== deleteItemId));
        
        // Обновить счетчик в категории
        const categoryName = productToDelete.category;
        setProductCategories(productCategories.map(category => 
          category.name === categoryName 
            ? { ...category, count: Math.max(0, category.count - 1) } 
            : category
        ));
        
        // Обновить счетчик у бренда
        const brandName = productToDelete.brand;
        setBrands(brands.map(brand => 
          brand.name === brandName 
            ? { ...brand, count: Math.max(0, brand.count - 1) } 
            : brand
        ));
        
        toast({
          title: "Товар удален",
          description: `Товар "${productToDelete.name}" успешно удален.`,
        });
      }
    } else if (deleteItemType === 'category') {
      const categoryToDelete = productCategories.find(c => c.id === deleteItemId);
      if (categoryToDelete) {
        if (categoryToDelete.count > 0) {
          toast({
            title: "Ошибка удаления",
            description: "Невозможно удалить категорию, содержащую товары. Сначала переместите или удалите товары из этой категории.",
            variant: "destructive",
          });
        } else {
          setProductCategories(productCategories.filter(category => category.id !== deleteItemId));
          
          toast({
            title: "Категория удалена",
            description: `Категория "${categoryToDelete.name}" успешно удалена.`,
          });
        }
      }
    } else if (deleteItemType === 'brand') {
      const brandToDelete = brands.find(b => b.id === deleteItemId);
      if (brandToDelete) {
        if (brandToDelete.count > 0) {
          toast({
            title: "Ошибка удаления",
            description: "Невозможно удалить бренд, содержащий товары. Сначала переместите или удалите товары этого бренда.",
            variant: "destructive",
          });
        } else {
          setBrands(brands.filter(brand => brand.id !== deleteItemId));
          
          toast({
            title: "Бренд удален",
            description: `Бренд "${brandToDelete.name}" успешно удален.`,
          });
        }
      }
    }
    
    setIsDeleteDialogOpen(false);
  };

  // Отображение статуса товара
  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge className="bg-green-500">В наличии</Badge>;
      case 'low_stock':
        return <Badge className="bg-amber-500">Мало на складе</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-500">Нет в наличии</Badge>;
      default:
        return null;
    }
  };

  // Отображение статуса заказа
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

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Управление товарами</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="products" className="px-6">Товары</TabsTrigger>
            <TabsTrigger value="categories" className="px-6">Категории</TabsTrigger>
            <TabsTrigger value="brands" className="px-6">Бренды</TabsTrigger>
            <TabsTrigger value="orders" className="px-6">Заказы</TabsTrigger>
          </TabsList>
          
          {activeTab === "products" && (
            <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-salon-accent hover:bg-salon-accent/90">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Добавление нового товара</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новом товаре
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Название товара</label>
                    <Input 
                      name="name" 
                      value={newProduct.name} 
                      onChange={handleAddProductChange} 
                      placeholder="Введите название товара" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Описание</label>
                    <Input 
                      name="description" 
                      value={newProduct.description} 
                      onChange={handleAddProductChange} 
                      placeholder="Краткое описание товара" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Цена (₽)</label>
                      <Input 
                        name="price" 
                        type="number" 
                        value={newProduct.price} 
                        onChange={handleAddProductChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Количество на складе</label>
                      <Input 
                        name="stock" 
                        type="number" 
                        value={newProduct.stock} 
                        onChange={handleAddProductChange} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Категория</label>
                    <Select 
                      onValueChange={(value) => handleAddProductSelectChange('category', value)} 
                      value={newProduct.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Бренд</label>
                    <Select 
                      onValueChange={(value) => handleAddProductSelectChange('brand', value)} 
                      value={newProduct.brand}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите бренд" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map(brand => (
                          <SelectItem key={brand.id} value={brand.name}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ссылка на изображение</label>
                    <Input 
                      name="image" 
                      value={newProduct.image} 
                      onChange={handleAddProductChange} 
                      placeholder="URL изображения" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button 
                    className="bg-salon-accent hover:bg-salon-accent/90" 
                    onClick={handleAddProduct}
                    disabled={!newProduct.name || !newProduct.category || !newProduct.brand}
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
                    Укажите название для новой категории товаров
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Название категории</label>
                    <Input 
                      value={newCategoryName} 
                      onChange={(e) => setNewCategoryName(e.target.value)} 
                      placeholder="Введите название категории" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button 
                    className="bg-salon-accent hover:bg-salon-accent/90" 
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                  >
                    Сохранить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          {activeTab === "brands" && (
            <Dialog open={isAddBrandDialogOpen} onOpenChange={setIsAddBrandDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-salon-accent hover:bg-salon-accent/90">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить бренд
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавление нового бренда</DialogTitle>
                  <DialogDescription>
                    Укажите название для нового бренда
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Название бренда</label>
                    <Input 
                      value={newBrandName} 
                      onChange={(e) => setNewBrandName(e.target.value)} 
                      placeholder="Введите название бренда" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBrandDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button 
                    className="bg-salon-accent hover:bg-salon-accent/90" 
                    onClick={handleAddBrand}
                    disabled={!newBrandName.trim()}
                  >
                    Сохранить
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <CardTitle>Список товаров</CardTitle>
                  <CardDescription>
                    Управляйте товарами, доступными в магазине салона
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Все категории" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {productCategories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Все статусы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="in_stock">В наличии</SelectItem>
                      <SelectItem value="low_stock">Мало на складе</SelectItem>
                      <SelectItem value="out_of_stock">Нет в наличии</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.length === 0 ? (
                  <div className="md:col-span-2 xl:col-span-3 text-center py-8 text-muted-foreground">
                    Товары не найдены
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden border hover:border-salon-accent transition-colors">
                      <div className="relative h-36 overflow-hidden">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Icon name="ImageOff" className="text-gray-400" size={24} />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          {getStockStatusBadge(product.status)}
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <Badge variant="outline" className="mt-1">
                                {product.category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">{product.price} ₽</div>
                              <div className="text-sm text-muted-foreground">
                                Остаток: {product.stock} шт.
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Бренд: </span>
                            <span className="font-medium">{product.brand}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 pt-0 pb-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditProductClick(product)}>
                              <Icon name="Edit" size={14} className="mr-2" />
                              <span>Редактировать</span>
                            </DropdownMenuItem>
                            {product.stock === 0 && (
                              <DropdownMenuItem onClick={() => {
                                setCurrentProduct(product);
                                setCurrentProduct(prev => {
                                  if (!prev) return null;
                                  return { ...prev, stock: 10 };
                                });
                              }}>
                                <Icon name="RefreshCw" size={14} className="mr-2 text-green-500" />
                                <span className="text-green-500">Пополнить запас</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick('product', product.id)}
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
              <CardTitle>Категории товаров</CardTitle>
              <CardDescription>
                Управляйте категориями товаров магазина
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead className="text-center">Количество товаров</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        Категории не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="font-medium">{category.name}</div>
                        </TableCell>
                        <TableCell className="text-center">{category.count}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClick('category', category.id)}
                            disabled={category.count > 0}
                          >
                            <Icon name="Trash" size={16} className="text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Бренды товаров</CardTitle>
              <CardDescription>
                Управляйте брендами товаров магазина
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead className="text-center">Количество товаров</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBrands.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        Бренды не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <div className="font-medium">{brand.name}</div>
                        </TableCell>
                        <TableCell className="text-center">{brand.count}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClick('brand', brand.id)}
                            disabled={brand.count > 0}
                          >
                            <Icon name="Trash" size={16} className="text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Заказы клиентов</CardTitle>
              <CardDescription>
                Управляйте заказами из магазина салона
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Номер заказа</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                    <TableHead className="text-center">Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Заказы не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">{order.number}</div>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell className="text-right">{order.total} ₽</TableCell>
                        <TableCell className="text-center">
                          {getOrderStatusBadge(order.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewOrderDetails(order)}
                          >
                            <Icon name="Eye" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог редактирования товара */}
      <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Редактирование товара</DialogTitle>
            <DialogDescription>
              Измените информацию о товаре
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название товара</label>
                <Input 
                  name="name" 
                  value={currentProduct.name} 
                  onChange={handleEditProductChange} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Описание</label>
                <Input 
                  name="description" 
                  value={currentProduct.description} 
                  onChange={handleEditProductChange} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Цена (₽)</label>
                  <Input 
                    name="price" 
                    type="number" 
                    value={currentProduct.price} 
                    onChange={handleEditProductChange} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Количество на складе</label>
                  <Input 
                    name="stock" 
                    type="number" 
                    value={currentProduct.stock} 
                    onChange={handleEditProductChange} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Категория</label>
                <Select 
                  onValueChange={(value) => handleEditProductSelectChange('category', value)} 
                  value={currentProduct.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Бренд</label>
                <Select 
                  onValueChange={(value) => handleEditProductSelectChange('brand', value)} 
                  value={currentProduct.brand}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите бренд" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ссылка на изображение</label>
                <Input 
                  name="image" 
                  value={currentProduct.image} 
                  onChange={handleEditProductChange} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Статус</label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {getStockStatusBadge(currentProduct.status)}
                  <div className="text-sm text-muted-foreground mt-2">
                    Статус определяется автоматически в зависимости от количества товара на складе
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleUpdateProduct}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог просмотра деталей заказа */}
      <Dialog open={isOrderDetailsDialogOpen} onOpenChange={setIsOrderDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Заказ #{currentOrder?.number}</DialogTitle>
              {currentOrder && getOrderStatusBadge(currentOrder.status)}
            </div>
            <DialogDescription>
              Детали заказа клиента
            </DialogDescription>
          </DialogHeader>
          {currentOrder && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Клиент</h3>
                  <p className="font-medium">{currentOrder.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Дата заказа</h3>
                  <p className="font-medium">{formatDate(currentOrder.date)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Товары в заказе</h3>
                <div className="space-y-2">
                  {currentOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} шт. × {item.price} ₽
                        </div>
                      </div>
                      <div className="font-medium">{item.quantity * item.price} ₽</div>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 px-3 font-medium">
                    <span>Итого:</span>
                    <span>{currentOrder.total} ₽</span>
                  </div>
                </div>
              </div>
              
              {currentOrder.status === 'processing' && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Действия с заказом</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 text-green-500 hover:text-green-700 hover:bg-green-50 border-green-200"
                      onClick={() => handleUpdateOrderStatus(currentOrder.id, 'completed')}
                    >
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Выполнен
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={() => handleUpdateOrderStatus(currentOrder.id, 'cancelled')}
                    >
                      <Icon name="XCircle" size={16} className="mr-2" />
                      Отменить
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsOrderDetailsDialogOpen(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deleteItemType === 'product' ? 'Удаление товара' : 
               deleteItemType === 'category' ? 'Удаление категории' : 'Удаление бренда'}
            </DialogTitle>
            <DialogDescription>
              {deleteItemType === 'product' 
                ? 'Вы уверены, что хотите удалить этот товар? Это действие невозможно отменить.'
                : deleteItemType === 'category'
                ? 'Вы уверены, что хотите удалить эту категорию? Это действие невозможно отменить.'
                : 'Вы уверены, что хотите удалить этот бренд? Это действие невозможно отменить.'}
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

export default AdminProducts;
