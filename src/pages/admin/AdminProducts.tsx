
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

// Пример данных товаров
const initialProducts = [
  {
    id: 1,
    name: 'Шампунь для окрашенных волос',
    description: 'Профессиональный шампунь для ухода за окрашенными волосами',
    price: 1200,
    stock: 15,
    category: 'Шампуни',
    image: 'https://images.unsplash.com/photo-1594995846645-d58328c3ffa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    status: 'in_stock'
  },
  {
    id: 2,
    name: 'Масло для волос',
    description: 'Восстанавливающее масло для сухих и поврежденных волос',
    price: 2000,
    stock: 8,
    category: 'Маски и масла',
    image: 'https://images.unsplash.com/photo-1573575155376-b5010099301a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    status: 'in_stock'
  },
  {
    id: 3,
    name: 'Кондиционер для волос',
    description: 'Увлажняющий кондиционер для всех типов волос',
    price: 1400,
    stock: 10,
    category: 'Кондиционеры',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    status: 'in_stock'
  },
  {
    id: 4,
    name: 'Набор косметики для ухода',
    description: 'Комплексный набор для ухода за волосами и кожей',
    price: 4200,
    stock: 5,
    category: 'Наборы',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    status: 'low_stock'
  },
  {
    id: 5,
    name: 'Краска для волос',
    description: 'Профессиональная стойкая краска для волос',
    price: 1800,
    stock: 0,
    category: 'Окрашивание',
    image: 'https://images.unsplash.com/photo-1585232351749-ea9a14a31b14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    status: 'out_of_stock'
  },
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'status'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
  });

  // Обработчик поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Фильтрация товаров
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Обработчики для формы добавления товара
  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleAddProduct = () => {
    const id = Math.max(0, ...products.map(p => p.id)) + 1;
    const status = newProduct.stock === 0 ? 'out_of_stock' : newProduct.stock <= 5 ? 'low_stock' : 'in_stock';
    
    setProducts([...products, { 
      id,
      ...newProduct,
      status
    }]);
    
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      image: '',
    });
    
    setIsAddDialogOpen(false);
  };

  // Обработчики для формы редактирования товара
  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    
    const { name, value } = e.target;
    setCurrentProduct(prev => {
      if (!prev) return null;
      
      const updatedValue = name === 'price' || name === 'stock' ? Number(value) : value;
      const updatedProduct = { ...prev, [name]: updatedValue };
      
      // Обновление статуса в зависимости от количества на складе
      if (name === 'stock') {
        const stockValue = Number(value);
        updatedProduct.status = stockValue === 0 ? 'out_of_stock' : stockValue <= 5 ? 'low_stock' : 'in_stock';
      }
      
      return updatedProduct;
    });
  };

  const handleUpdateProduct = () => {
    if (!currentProduct) return;
    
    setProducts(products.map(product => 
      product.id === currentProduct.id ? currentProduct : product
    ));
    setIsEditDialogOpen(false);
  };

  // Получение статуса товара
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge className="bg-green-500">В наличии</Badge>;
      case 'low_stock':
        return <Badge className="bg-yellow-500">Мало</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-500">Нет в наличии</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Управление товарами</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-xs"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                  <Textarea 
                    name="description" 
                    value={newProduct.description}
                    onChange={handleAddProductChange}
                    placeholder="Описание товара"
                    rows={3}
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
                  <Input 
                    name="category" 
                    value={newProduct.category} 
                    onChange={handleAddProductChange} 
                    placeholder="Категория товара" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL изображения</label>
                  <Input 
                    name="image" 
                    value={newProduct.image} 
                    onChange={handleAddProductChange} 
                    placeholder="https://example.com/image.jpg" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleAddProduct}>
                  Сохранить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список товаров</CardTitle>
          <CardDescription>
            Управление товарами в магазине салона
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: '300px' }}>Товар</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">Цена</TableHead>
                <TableHead className="text-center">Наличие</TableHead>
                <TableHead className="text-right">Кол-во</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Товары не найдены
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right font-medium">{product.price} ₽</TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(product.status)}
                    </TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(product)}
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            const updatedProducts = products.filter(p => p.id !== product.id);
                            setProducts(updatedProducts);
                          }}
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

      {/* Диалог редактирования товара */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                <Textarea 
                  name="description" 
                  value={currentProduct.description}
                  onChange={handleEditProductChange}
                  rows={3}
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
                <Input 
                  name="category" 
                  value={currentProduct.category} 
                  onChange={handleEditProductChange} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">URL изображения</label>
                <Input 
                  name="image" 
                  value={currentProduct.image} 
                  onChange={handleEditProductChange} 
                />
              </div>
              {currentProduct.image && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-2">Предпросмотр:</div>
                  <div className="h-40 w-full rounded overflow-hidden">
                    <img 
                      src={currentProduct.image} 
                      alt={currentProduct.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-salon-accent hover:bg-salon-accent/90" onClick={handleUpdateProduct}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
