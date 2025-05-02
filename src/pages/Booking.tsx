
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  serviceCategory: z.string({ required_error: 'Выберите категорию услуги' }),
  service: z.string({ required_error: 'Выберите услугу' }),
  specialist: z.string({ required_error: 'Выберите специалиста' }),
  date: z.date({ required_error: 'Выберите дату' }),
  time: z.string({ required_error: 'Выберите время' }),
});

type BookingFormValues = z.infer<typeof formSchema>;

// Примеры данных для формы
const serviceCategories = [
  { id: '1', name: 'Стрижки' },
  { id: '2', name: 'Окрашивание' },
  { id: '3', name: 'Уход за волосами' },
  { id: '4', name: 'Маникюр и педикюр' },
];

const services = {
  '1': [
    { id: '101', name: 'Стрижка женская', duration: 60, price: 1500 },
    { id: '102', name: 'Стрижка мужская', duration: 45, price: 1000 },
    { id: '103', name: 'Детская стрижка', duration: 30, price: 800 },
  ],
  '2': [
    { id: '201', name: 'Окрашивание корней', duration: 90, price: 2500 },
    { id: '202', name: 'Полное окрашивание', duration: 120, price: 3500 },
    { id: '203', name: 'Мелирование', duration: 150, price: 4000 },
  ],
  '3': [
    { id: '301', name: 'Глубокое увлажнение', duration: 45, price: 1800 },
    { id: '302', name: 'Кератиновое выпрямление', duration: 120, price: 6000 },
    { id: '303', name: 'Восстанавливающая маска', duration: 30, price: 1200 },
  ],
  '4': [
    { id: '401', name: 'Классический маникюр', duration: 60, price: 1100 },
    { id: '402', name: 'Педикюр', duration: 90, price: 1800 },
    { id: '403', name: 'Маникюр с гель-лаком', duration: 90, price: 2000 },
  ],
};

const specialists = [
  { 
    id: '1', 
    name: 'Екатерина', 
    position: 'Стилист-колорист',
    photo: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    services: ['101', '102', '201', '202', '203', '301'] 
  },
  { 
    id: '2', 
    name: 'Алексей', 
    position: 'Ведущий стилист',
    photo: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    services: ['101', '102', '103', '301', '302', '303'] 
  },
  { 
    id: '3', 
    name: 'Мария', 
    position: 'Мастер маникюра',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    services: ['401', '402', '403'] 
  },
];

// Примеры доступного времени
const timeSlots = {
  '1': ['10:00', '11:00', '13:00', '14:00', '16:00'],
  '2': ['09:30', '12:00', '14:30', '16:30', '17:30'],
  '3': ['10:00', '11:30', '13:30', '15:00', '17:00'],
}

const Booking: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [availableSpecialists, setAvailableSpecialists] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { watch, setValue } = form;
  const watchServiceCategory = watch('serviceCategory');
  const watchService = watch('service');
  const watchSpecialist = watch('specialist');
  const watchDate = watch('date');

  // Обновить список услуг при изменении категории
  React.useEffect(() => {
    if (watchServiceCategory) {
      // Сбросить выбранную услугу
      setValue('service', '', { shouldValidate: true });
    }
  }, [watchServiceCategory, setValue]);

  // Обновить список специалистов при изменении услуги
  React.useEffect(() => {
    if (watchService) {
      // Найти выбранную услугу
      const serviceObj = Object.values(services)
        .flat()
        .find(service => service.id === watchService);
      
      if (serviceObj) {
        setSelectedService(serviceObj);
        
        // Найти специалистов, которые выполняют выбранную услугу
        const availableSpecialists = specialists.filter(specialist => 
          specialist.services.includes(watchService)
        );
        
        setAvailableSpecialists(availableSpecialists);
        
        // Сбросить выбранного специалиста
        setValue('specialist', '', { shouldValidate: true });
      }
    }
  }, [watchService, setValue]);

  // Обновить доступное время при изменении специалиста и даты
  React.useEffect(() => {
    if (watchSpecialist && watchDate) {
      // В реальном приложении здесь был бы запрос к API для получения доступного времени
      // Для демонстрации используем заглушку
      setSelectedDate(watchDate);
      setAvailableTimes(timeSlots[watchSpecialist] || []);
      setValue('time', '', { shouldValidate: true });
    }
  }, [watchSpecialist, watchDate, setValue]);

  const onSubmit = (data: BookingFormValues) => {
    // В реальном приложении здесь был бы запрос к API для создания записи
    console.log('Booking data:', data);
    
    // Сохраняем данные в localStorage для использования на странице подтверждения
    const bookingData = {
      ...data,
      serviceName: selectedService?.name,
      servicePrice: selectedService?.price,
      serviceDuration: selectedService?.duration,
      specialistName: availableSpecialists.find(s => s.id === data.specialist)?.name,
      dateFormatted: format(data.date, 'dd MMMM yyyy', { locale: ru }),
    };
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    toast({
      title: 'Запись успешно создана!',
      description: 'Вы будете перенаправлены на страницу подтверждения.',
    });
    
    navigate('/booking/confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold">Онлайн-запись</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Запишитесь на услуги нашего салона онлайн.
              Выберите услугу, мастера, дату и время, удобные для вас.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Шаг 1: Выбор услуги */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent font-medium">
                        1
                      </div>
                      <h2 className="text-xl font-semibold">Выберите услугу</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="serviceCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Категория услуги</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceCategories.map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Услуга</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!watchServiceCategory}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите услугу" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {watchServiceCategory && services[watchServiceCategory]?.map(service => (
                                  <SelectItem key={service.id} value={service.id}>
                                    {service.name} ({service.price} ₽, {service.duration} мин)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Шаг 2: Выбор специалиста */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent font-medium">
                        2
                      </div>
                      <h2 className="text-xl font-semibold">Выберите специалиста</h2>
                    </div>

                    <FormField
                      control={form.control}
                      name="specialist"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                              disabled={!watchService || availableSpecialists.length === 0}
                            >
                              {availableSpecialists.map(specialist => (
                                <div key={specialist.id} className="relative">
                                  <RadioGroupItem
                                    value={specialist.id}
                                    id={specialist.id}
                                    className="peer sr-only"
                                  />
                                  <label
                                    htmlFor={specialist.id}
                                    className="block cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-salon-accent [&:has([data-state=checked])]:border-salon-accent"
                                  >
                                    <div className="flex flex-col items-center text-center">
                                      <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
                                        <img
                                          src={specialist.photo}
                                          alt={specialist.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div className="font-medium">{specialist.name}</div>
                                      <div className="text-sm text-muted-foreground">{specialist.position}</div>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Шаг 3: Выбор даты и времени */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-salon-accent/10 flex items-center justify-center text-salon-accent font-medium">
                        3
                      </div>
                      <h2 className="text-xl font-semibold">Выберите дату и время</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Дата</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && 'text-muted-foreground'
                                    }`}
                                    disabled={!watchSpecialist}
                                  >
                                    {field.value ? (
                                      format(field.value, 'PPP', { locale: ru })
                                    ) : (
                                      <span>Выберите дату</span>
                                    )}
                                    <Icon name="Calendar" className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    // Исключить прошедшие даты и выходные
                                    const day = date.getDay();
                                    const isWeekend = day === 0; // Воскресенье
                                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                                    return isPast || isWeekend || date > new Date(new Date().setDate(new Date().getDate() + 30));
                                  }}
                                  initialFocus
                                  locale={ru}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Время</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!watchDate || availableTimes.length === 0}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите время" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availableTimes.map(time => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Сводка и подтверждение */}
                  {selectedService && watchSpecialist && watchDate && form.watch('time') && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Ваша запись</h2>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Услуга</p>
                                <p className="font-medium">{selectedService.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Специалист</p>
                                <p className="font-medium">
                                  {availableSpecialists.find(s => s.id === watchSpecialist)?.name}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Дата и время</p>
                                <p className="font-medium">
                                  {format(watchDate, 'dd MMMM yyyy', { locale: ru })}, {form.watch('time')}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Стоимость</p>
                                <p className="font-medium">{selectedService.price} ₽</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {!user && (
                          <div className="text-sm text-muted-foreground bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Icon name="Info" className="text-amber-500 flex-shrink-0 mt-0.5" size={14} />
                              <div>
                                Для создания записи рекомендуется <a href="/login" className="text-salon-accent hover:underline">войти</a> или <a href="/register" className="text-salon-accent hover:underline">зарегистрироваться</a>. 
                                Это позволит вам отслеживать ваши записи в личном кабинете.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-salon-accent hover:bg-salon-accent/90"
                      disabled={!selectedService || !watchSpecialist || !watchDate || !form.watch('time')}
                    >
                      Забронировать
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
