
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';

const promotionsData = [
  {
    id: 1,
    title: 'Скидка 20% на окрашивание',
    description: 'Специальное предложение на все виды окрашивания волос при записи онлайн',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    validUntil: '2025-05-31',
    category: 'hair',
    isNew: true,
    couponCode: 'COLOR20',
    conditions: 'Действует при записи через сайт или приложение. Скидка не суммируется с другими акциями.'
  },
  {
    id: 2,
    title: 'Комплекс "Стрижка + Укладка"',
    description: 'Сделайте стрижку и получите укладку с 30% скидкой',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    validUntil: '2025-05-15',
    category: 'hair',
    isNew: false,
    couponCode: 'STYLE30',
    conditions: 'Предложение действительно с понедельника по четверг. Необходима предварительная запись.'
  },
  {
    id: 3,
    title: 'Маникюр + Педикюр со скидкой 25%',
    description: 'Комплексный уход за ногтями по выгодной цене',
    image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    validUntil: '2025-05-20',
    category: 'nails',
    isNew: true,
    couponCode: 'NAILS25',
    conditions: 'Акция распространяется на классический маникюр и педикюр. Дополнительные услуги оплачиваются отдельно.'
  },
  {
    id: 4,
    title: 'Счастливые часы: -15% на все услуги',
    description: 'Скидка на любые услуги салона в будние дни с 10:00 до 13:00',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    validUntil: '2025-06-30',
    category: 'special',
    isNew: false,
    couponCode: 'HAPPY15',
    conditions: 'Предложение действует только в указанные часы при наличии свободных мастеров. Требуется предварительная запись.'
  },
  {
    id: 5,
    title: '1+1=3: Купи 2 продукта, получи 3-й в подарок',
    description: 'При покупке двух любых средств для волос, третье (с наименьшей стоимостью) — бесплатно',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    validUntil: '2025-05-25',
    category: 'products',
    isNew: true,
    couponCode: 'GIFT4YOU',
    conditions: 'Акция распространяется на определенные бренды. Подробности уточняйте у администратора салона.'
  },
  {
    id: 6,
    title: 'Программа лояльности: до 20% кэшбэка',
    description: 'Возвращаем до 20% от суммы ваших покупок и услуг в виде бонусов',
    image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    validUntil: '2025-12-31',
    category: 'special',
    isNew: false,
    couponCode: 'LOYALTY',
    conditions: 'Программа действует для зарегистрированных пользователей. 1 бонус = 1 рубль. Бонусами можно оплатить до 50% стоимости.'
  },
];

const Promotions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [savedPromotions, setSavedPromotions] = useState<number[]>([]);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const filteredPromotions = promotionsData.filter(promo => 
    activeTab === 'all' || promo.category === activeTab || 
    (activeTab === 'saved' && savedPromotions.includes(promo.id))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const toggleSavePromotion = (id: number) => {
    if (savedPromotions.includes(id)) {
      setSavedPromotions(savedPromotions.filter(promoId => promoId !== id));
    } else {
      setSavedPromotions([...savedPromotions, id]);
    }
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
          Акции и специальные предложения
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Воспользуйтесь нашими специальными предложениями и акциями для экономии при посещении нашего салона красоты
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex justify-center">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger value="all" className="px-4">Все акции</TabsTrigger>
            <TabsTrigger value="hair" className="px-4">Волосы</TabsTrigger>
            <TabsTrigger value="nails" className="px-4">Ногти</TabsTrigger>
            <TabsTrigger value="products" className="px-4">Товары</TabsTrigger>
            <TabsTrigger value="special" className="px-4">Особые</TabsTrigger>
            {user && (
              <TabsTrigger value="saved" className="px-4">
                Сохраненные
                {savedPromotions.length > 0 && (
                  <Badge className="ml-2 bg-salon-accent">{savedPromotions.length}</Badge>
                )}
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {filteredPromotions.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="FileSearch" size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нет доступных акций</h3>
              <p className="text-gray-500">
                {activeTab === 'saved' 
                  ? 'У вас пока нет сохраненных акций' 
                  : 'В данной категории пока нет активных акций'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPromotions.map((promotion) => (
                <Card key={promotion.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={promotion.image} 
                      alt={promotion.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {promotion.isNew && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500">Новое</Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <button
                        className={`rounded-full p-2 bg-white bg-opacity-80 ${
                          savedPromotions.includes(promotion.id) 
                            ? 'text-red-500' 
                            : 'text-gray-500 hover:text-red-500'
                        }`}
                        onClick={() => toggleSavePromotion(promotion.id)}
                      >
                        <Icon 
                          name={savedPromotions.includes(promotion.id) ? 'Heart' : 'Heart'} 
                          size={16} 
                          fill={savedPromotions.includes(promotion.id) ? 'currentColor' : 'none'} 
                        />
                      </button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{promotion.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Действует до {formatDate(promotion.validUntil)}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${promotion.category === 'hair' ? 'border-blue-500 text-blue-500' : 
                            promotion.category === 'nails' ? 'border-pink-500 text-pink-500' : 
                            promotion.category === 'products' ? 'border-purple-500 text-purple-500' : 
                            'border-green-500 text-green-500'}
                        `}
                      >
                        {promotion.category === 'hair' ? 'Волосы' : 
                         promotion.category === 'nails' ? 'Ногти' : 
                         promotion.category === 'products' ? 'Товары' : 
                         'Особое'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{promotion.description}</p>
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center text-sm mb-2">
                        <Icon name="Ticket" size={16} className="mr-2 text-salon-accent" />
                        <span className="font-medium">Промокод:</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="bg-white px-3 py-1 rounded border font-mono text-lg">
                          {promotion.couponCode}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            navigator.clipboard.writeText(promotion.couponCode);
                            alert('Промокод скопирован!');
                          }}
                        >
                          <Icon name="Copy" size={14} className="mr-1" />
                          Копировать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex flex-col items-start">
                    <p className="text-xs text-gray-500 mb-4">
                      <Icon name="Info" size={12} className="inline-block mr-1" />
                      {promotion.conditions}
                    </p>
                    <Button className="w-full bg-salon-accent hover:bg-salon-accent/90">
                      <Icon name="CalendarPlus" size={16} className="mr-2" />
                      Забронировать со скидкой
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-gray-50 rounded-lg p-6 md:p-8 text-center">
        <h2 className="font-playfair text-2xl font-bold mb-4">Присоединяйтесь к нашей программе лояльности</h2>
        <p className="text-gray-600 mx-auto max-w-2xl mb-6">
          Зарегистрируйтесь на нашем сайте и получайте доступ к эксклюзивным акциям, 
          скидкам и персональным предложениям. Каждое посещение приносит вам бонусы, 
          которые можно использовать для оплаты услуг и товаров.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-salon-primary hover:bg-salon-primary/90" size={isMobile ? "default" : "lg"}>
            <Icon name="UserPlus" size={16} className="mr-2" />
            Зарегистрироваться
          </Button>
          <Button variant="outline" size={isMobile ? "default" : "lg"}>
            <Icon name="Info" size={16} className="mr-2" />
            Узнать больше о программе
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
