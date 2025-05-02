
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
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный e-mail' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      toast({
        title: 'Вход выполнен успешно',
        description: 'Добро пожаловать в личный кабинет!',
      });
      navigate('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка входа',
        description: error instanceof Error ? error.message : 'Произошла ошибка при входе',
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
              <h1 className="text-2xl font-playfair font-bold mb-2">Вход в личный кабинет</h1>
              <p className="text-gray-600">Введите данные для входа</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

                <Button 
                  type="submit" 
                  className="w-full bg-salon-accent hover:bg-salon-accent/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    'Войти'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Еще нет аккаунта?{' '}
                <Link to="/register" className="text-salon-accent hover:underline">
                  Зарегистрироваться
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

export default Login;
