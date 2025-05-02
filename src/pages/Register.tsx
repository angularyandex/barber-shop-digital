
import React from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  email: z.string().email({ message: 'Введите корректный e-mail' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'Необходимо согласиться с условиями',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data.name, data.email, data.password);
      toast({
        title: 'Регистрация выполнена успешно',
        description: 'Добро пожаловать в личный кабинет!',
      });
      navigate('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка регистрации',
        description: error instanceof Error ? error.message : 'Произошла ошибка при регистрации',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-playfair font-bold mb-2">Создание аккаунта</h1>
              <p className="text-gray-600">Заполните форму для регистрации</p>
            </div>

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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Введите пароль" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Повторите пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Повторите пароль" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Я согласен с <Link to="/terms" className="text-salon-accent hover:underline">условиями использования</Link> и <Link to="/privacy" className="text-salon-accent hover:underline">политикой конфиденциальности</Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full mt-2 bg-salon-accent hover:bg-salon-accent/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Регистрация...
                    </>
                  ) : (
                    'Зарегистрироваться'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Уже есть аккаунт?{' '}
                <Link to="/login" className="text-salon-accent hover:underline">
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
