
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

interface BookingData {
  service: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  specialist: string;
  specialistName: string;
  date: string;
  dateFormatted: string;
  time: string;
}

const BookingConfirmation: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const bookingDataString = localStorage.getItem('bookingData');
    if (bookingDataString) {
      try {
        const parsedData = JSON.parse(bookingDataString);
        setBookingData(parsedData);
      } catch (error) {
        console.error('Error parsing booking data:', error);
        navigate('/booking');
      }
    } else {
      navigate('/booking');
    }
  }, [navigate]);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center p-8">
            <Icon name="Loader2" className="h-10 w-10 animate-spin text-salon-accent mb-4" />
            <p className="text-gray-600">Загрузка данных бронирования...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Icon name="CheckCircle" className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">Запись подтверждена!</h1>
            <p className="text-gray-600 max-w-md">
              Ваша запись успешно создана. Мы с нетерпением ждем встречи с вами!
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="text-xl font-semibold">Детали записи</h2>
                  {user && (
                    <Link 
                      to="/profile/appointments"
                      className="text-salon-accent hover:text-salon-accent/80 text-sm flex items-center"
                    >
                      <span>Перейти к моим записям</span>
                      <Icon name="ChevronRight" className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Услуга</p>
                    <p className="font-medium">{bookingData.serviceName}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Длительность: {bookingData.serviceDuration} мин
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Специалист</p>
                    <p className="font-medium">{bookingData.specialistName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Дата и время</p>
                    <p className="font-medium">{bookingData.dateFormatted}</p>
                    <p className="text-sm text-muted-foreground mt-1">{bookingData.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                    <p className="font-medium text-lg">{bookingData.servicePrice} ₽</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="text-salon-accent flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-medium mb-1">Информация</p>
                      <p className="text-sm text-gray-600">
                        Пожалуйста, приходите за 5-10 минут до начала записи. 
                        Если вам необходимо отменить или перенести запись, сделайте это не менее 
                        чем за 3 часа до назначенного времени по телефону или в личном кабинете.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <Icon name="Home" className="mr-2 h-4 w-4" />
                На главную
              </Link>
            </Button>
            
            {!user ? (
              <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                <Link to="/login">
                  <Icon name="LogIn" className="mr-2 h-4 w-4" />
                  Войти в личный кабинет
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-salon-accent hover:bg-salon-accent/90">
                <Link to="/profile/appointments">
                  <Icon name="Calendar" className="mr-2 h-4 w-4" />
                  Мои записи
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
