
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный e-mail' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { adminLogin, isLoading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Для демо можно добавить подсказку с данными администратора
  const fillDemoData = () => {
    form.setValue('email', 'admin@example.com');
    form.setValue('password', 'password123');
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await adminLogin(data.email, data.password);
      toast({
        title: 'Вход выполнен успешно',
        description: 'Добро пожаловать в админ-панель!',
      });
      navigate('/admin');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка входа',
        description: error instanceof Error ? error.message : 'Произошла ошибка при входе',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-salon-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Scissors" className="h-6 w-6 text-salon-accent" />
              </div>
            </div>
            <h1 className="text-2xl font-playfair font-bold mb-2">Панель администратора</h1>
            <p className="text-gray-600">Вход в систему управления</p>
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
                      <Input placeholder="admin@example.com" {...field} />
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

          <div className="mt-6">
            <p className="text-sm text-gray-500 text-center">
              Для демо-версии:
            </p>
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={fillDemoData}
            >
              Заполнить демо-данными
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
