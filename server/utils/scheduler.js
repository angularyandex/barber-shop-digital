import cron from 'node-cron';
import Appointment from '../models/Appointment.js';
import { sendAppointmentReminder } from './emailService.js';
import moment from 'moment';

// Запуск планировщика задач
export const startScheduler = () => {
  console.log('Планировщик задач запущен');

  // Отправка напоминаний о записях (каждый день в 18:00)
  cron.schedule('0 18 * * *', async () => {
    console.log('Запуск отправки напоминаний о записях');
    await sendAppointmentReminders();
  });

  // Обновление статусов просроченных записей (каждый час)
  cron.schedule('0 * * * *', async () => {
    console.log('Проверка просроченных записей');
    await updateOverdueAppointments();
  });

  // Очистка старых данных (каждый день в 02:00)
  cron.schedule('0 2 * * *', async () => {
    console.log('Очистка старых данных');
    await cleanupOldData();
  });
};

// Отправка напоминаний о записях на завтра
const sendAppointmentReminders = async () => {
  try {
    const tomorrow = moment().add(1, 'day').startOf('day');
    const endOfTomorrow = moment().add(1, 'day').endOf('day');

    const appointments = await Appointment.find({
      date: {
        $gte: tomorrow.toDate(),
        $lte: endOfTomorrow.toDate()
      },
      status: 'confirmed',
      reminderSent: false
    })
    .populate('client', 'name email')
    .populate('service', 'name')
    .populate('specialist', 'name');

    for (const appointment of appointments) {
      await sendAppointmentReminder(appointment);
      
      // Отмечаем, что напоминание отправлено
      appointment.reminderSent = true;
      await appointment.save();
    }

    console.log(`Отправлено ${appointments.length} напоминаний о записях`);
  } catch (error) {
    console.error('Ошибка при отправке напоминаний:', error);
  }
};

// Обновление статусов просроченных записей
const updateOverdueAppointments = async () => {
  try {
    const now = moment();
    
    // Находим записи, которые должны были начаться, но клиент не пришел
    const overdueAppointments = await Appointment.find({
      status: 'confirmed',
      date: { $lt: now.subtract(30, 'minutes').toDate() } // 30 минут после назначенного времени
    });

    for (const appointment of overdueAppointments) {
      const appointmentDateTime = moment(`${appointment.date} ${appointment.startTime}`, 'YYYY-MM-DD HH:mm');
      
      if (now.isAfter(appointmentDateTime.add(30, 'minutes'))) {
        appointment.status = 'no-show';
        await appointment.save();
      }
    }

    console.log(`Обновлено ${overdueAppointments.length} просроченных записей`);
  } catch (error) {
    console.error('Ошибка при обновлении просроченных записей:', error);
  }
};

// Очистка старых данных
const cleanupOldData = async () => {
  try {
    const sixMonthsAgo = moment().subtract(6, 'months').toDate();

    // Удаление старых отмененных записей
    const deletedAppointments = await Appointment.deleteMany({
      status: { $in: ['cancelled', 'no-show'] },
      createdAt: { $lt: sixMonthsAgo }
    });

    console.log(`Удалено ${deletedAppointments.deletedCount} старых записей`);
  } catch (error) {
    console.error('Ошибка при очистке старых данных:', error);
  }
};