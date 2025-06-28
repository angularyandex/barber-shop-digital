import nodemailer from 'nodemailer';

// Создание транспорта для отправки email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Отправка email подтверждения записи
export const sendAppointmentConfirmation = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"БьютиСалон" <${process.env.EMAIL_USER}>`,
      to: appointment.client.email,
      subject: 'Подтверждение записи в БьютиСалон',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9b87f5;">Ваша запись подтверждена!</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Детали записи:</h3>
            <p><strong>Услуга:</strong> ${appointment.service.name}</p>
            <p><strong>Специалист:</strong> ${appointment.specialist.name}</p>
            <p><strong>Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
            <p><strong>Время:</strong> ${appointment.startTime} - ${appointment.endTime}</p>
            <p><strong>Стоимость:</strong> ${appointment.price} ₽</p>
          </div>
          
          <p>Пожалуйста, приходите за 5-10 минут до начала записи.</p>
          
          <p>Если вам необходимо отменить или перенести запись, сделайте это не менее чем за 3 часа до назначенного времени.</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            С уважением,<br>
            Команда БьютиСалон<br>
            Телефон: +7 (999) 123-45-67<br>
            Email: info@beautysalon.ru
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email подтверждения записи отправлен:', appointment.client.email);
  } catch (error) {
    console.error('Ошибка отправки email:', error);
  }
};

// Отправка напоминания о записи
export const sendAppointmentReminder = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"БьютиСалон" <${process.env.EMAIL_USER}>`,
      to: appointment.client.email,
      subject: 'Напоминание о записи в БьютиСалон',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9b87f5;">Напоминание о записи</h2>
          
          <p>Напоминаем, что завтра у вас запись в нашем салоне:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Услуга:</strong> ${appointment.service.name}</p>
            <p><strong>Специалист:</strong> ${appointment.specialist.name}</p>
            <p><strong>Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
            <p><strong>Время:</strong> ${appointment.startTime}</p>
          </div>
          
          <p>Ждем вас в назначенное время!</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            С уважением,<br>
            Команда БьютиСалон
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Напоминание о записи отправлено:', appointment.client.email);
  } catch (error) {
    console.error('Ошибка отправки напоминания:', error);
  }
};

// Отправка уведомления о заказе
export const sendOrderConfirmation = async (order) => {
  try {
    const transporter = createTransporter();

    const itemsList = order.items.map(item => 
      `<li>${item.product.name} - ${item.quantity} шт. × ${item.price} ₽ = ${item.quantity * item.price} ₽</li>`
    ).join('');

    const mailOptions = {
      from: `"БьютиСалон" <${process.env.EMAIL_USER}>`,
      to: order.customer.email,
      subject: `Подтверждение заказа №${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9b87f5;">Ваш заказ принят!</h2>
          
          <p>Спасибо за ваш заказ. Мы получили его и начали обработку.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Заказ №${order.orderNumber}</h3>
            <p><strong>Дата заказа:</strong> ${new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
            
            <h4>Товары:</h4>
            <ul style="list-style-type: none; padding: 0;">
              ${itemsList}
            </ul>
            
            <p style="font-size: 18px; font-weight: bold; margin-top: 20px;">
              <strong>Итого: ${order.totalAmount} ₽</strong>
            </p>
          </div>
          
          <p>Мы свяжемся с вами в ближайшее время для уточнения деталей доставки.</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            С уважением,<br>
            Команда БьютиСалон
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email подтверждения заказа отправлен:', order.customer.email);
  } catch (error) {
    console.error('Ошибка отправки email заказа:', error);
  }
};