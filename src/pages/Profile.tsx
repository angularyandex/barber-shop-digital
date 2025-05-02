
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  email: z.string().email({ message: 'Введите корректный e-mail' }),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface SidebarLinkProps {
  to: string;
  icon: string;
  active?: boolean;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, active, children }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-salon-accent/10 text-salon-accent font-medium'
        : 'hover:bg-gray-100 text-gray-700'
    }`}
  >
    <Icon name={icon} size={18} />
    <span>{children}</span>
  </Link>
);

const Profile: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, updateProfile, isLoading, logout } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Если пользователь не авторизован, перенаправляем на страницу входа
  React.useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
    values: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile(data);
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно сохранены',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка обновления',
        description: error instanceof Error ? error.message : 'Произошла ошибка при обновлении профиля',
      });
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center p-8">
            <Icon name="Loader2" className="h-10 w-10 animate-spin text-salon-accent mb-4" />
            <p className="text-gray-600">Загрузка профиля...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-8">Личный кабинет</h1>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Боковое меню */}
            <div className="space-y-1 bg-white rounded-lg shadow-sm p-3">
              <SidebarLink to="/profile" icon="User" active={true}>
                Мой профиль
              </SidebarLink>
              <SidebarLink to="/profile/appointments" icon="Calendar">
                Мои записи
              </SidebarLink>
              <SidebarLink to="/profile/orders" icon="ShoppingBag">
                Мои заказы
              </SidebarLink>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <Icon name="LogOut" size={18} />
                <span>Выйти</span>
              </div>
            </div>

            {/* Основной контент */}
            <div>
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Мои данные</TabsTrigger>
                  <TabsTrigger value="password">Пароль</TabsTrigger>
                </TabsList>

                {/* Вкладка с персональными данными */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Персональные данные</CardTitle>
                      <CardDescription>
                        Обновите ваши личные данные для учётной записи
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                  <Input placeholder="Иван Иванов" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Телефон</FormLabel>
                                <FormControl>
                                  <Input placeholder="+7 (999) 123-45-67" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="mt-2 bg-salon-accent hover:bg-salon-accent/90"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                                Сохранение...
                              </>
                            ) : (
                              'Сохранить изменения'
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Вкладка с изменением пароля */}
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Изменение пароля</CardTitle>
                      <CardDescription>
                        Измените пароль для обеспечения безопасности вашей учётной записи
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Текущий пароль</label>
                          <Input type="password" placeholder="Введите текущий пароль" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Новый пароль</label>
                          <Input type="password" placeholder="Введите новый пароль" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Подтверждение пароля</label>
                          <Input type="password" placeholder="Повторите новый пароль" />
                        </div>

                        <Button className="mt-2 bg-salon-accent hover:bg-salon-accent/90">
                          Изменить пароль
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
