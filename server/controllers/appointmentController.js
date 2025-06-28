import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import moment from 'moment';

// @desc    Получить записи пользователя
// @route   GET /api/appointments
// @access  Private
export const getUserAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let filter = { client: req.user.id };

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(filter)
      .populate('service', 'name duration price')
      .populate('specialist', 'name avatar')
      .sort({ date: -1, startTime: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получить запись по ID
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('service', 'name duration price description')
      .populate('specialist', 'name avatar');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Запись не найдена'
      });
    }

    // Проверка прав доступа
    if (appointment.client._id.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'specialist') {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Создать запись
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res, next) => {
  try {
    const { service: serviceId, specialist: specialistId, date, startTime, notes } = req.body;

    // Проверка существования услуги
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    // Проверка существования специалиста
    const specialist = await User.findById(specialistId);
    if (!specialist || specialist.role !== 'specialist') {
      return res.status(404).json({
        success: false,
        message: 'Специалист не найден'
      });
    }

    // Проверка что специалист может выполнять эту услугу
    if (!service.specialists.includes(specialistId)) {
      return res.status(400).json({
        success: false,
        message: 'Специалист не может выполнять данную услугу'
      });
    }

    // Вычисление времени окончания
    const startMoment = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm');
    const endMoment = startMoment.clone().add(service.duration, 'minutes');
    const endTime = endMoment.format('HH:mm');

    // Проверка доступности времени
    const conflictingAppointment = await Appointment.findOne({
      specialist: specialistId,
      date: new Date(date),
      status: { $nin: ['cancelled', 'no-show'] },
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Выбранное время недоступно'
      });
    }

    // Создание записи
    const appointment = await Appointment.create({
      client: req.user.id,
      service: serviceId,
      specialist: specialistId,
      date: new Date(date),
      startTime,
      endTime,
      price: service.price,
      notes,
      clientNotes: req.body.clientNotes
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('service', 'name duration price')
      .populate('specialist', 'name avatar');

    res.status(201).json({
      success: true,
      data: populatedAppointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Обновить запись
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Запись не найдена'
      });
    }

    // Проверка прав доступа
    if (appointment.client.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'specialist') {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    // Ограничения для клиентов
    if (req.user.role === 'user') {
      // Клиенты могут изменять только определенные поля
      const allowedFields = ['clientNotes'];
      const updates = {};
      
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });

      appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).populate('service', 'name duration price')
       .populate('specialist', 'name avatar');
    } else {
      // Администраторы и специалисты могут изменять больше полей
      appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('service', 'name duration price')
       .populate('specialist', 'name avatar');
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Отменить запись
// @route   DELETE /api/appointments/:id
// @access  Private
export const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Запись не найдена'
      });
    }

    // Проверка прав доступа
    if (appointment.client.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен'
      });
    }

    // Проверка что запись можно отменить
    if (appointment.status === 'cancelled' || appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Запись уже отменена или завершена'
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Запись отменена'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получить доступное время для записи
// @route   GET /api/appointments/available-times
// @access  Public
export const getAvailableTimes = async (req, res, next) => {
  try {
    const { specialist, date, service } = req.query;

    if (!specialist || !date || !service) {
      return res.status(400).json({
        success: false,
        message: 'Необходимо указать специалиста, дату и услугу'
      });
    }

    // Получение информации об услуге
    const serviceInfo = await Service.findById(service);
    if (!serviceInfo) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    // Получение занятых слотов
    const bookedAppointments = await Appointment.find({
      specialist,
      date: new Date(date),
      status: { $nin: ['cancelled', 'no-show'] }
    }).select('startTime endTime');

    // Генерация доступных временных слотов
    const workingHours = {
      start: '09:00',
      end: '20:00'
    };

    const availableTimes = [];
    const startMoment = moment(`${date} ${workingHours.start}`, 'YYYY-MM-DD HH:mm');
    const endMoment = moment(`${date} ${workingHours.end}`, 'YYYY-MM-DD HH:mm');

    while (startMoment.isBefore(endMoment)) {
      const slotStart = startMoment.format('HH:mm');
      const slotEnd = startMoment.clone().add(serviceInfo.duration, 'minutes');

      // Проверка что слот не пересекается с занятыми
      const isAvailable = !bookedAppointments.some(appointment => {
        const bookedStart = moment(`${date} ${appointment.startTime}`, 'YYYY-MM-DD HH:mm');
        const bookedEnd = moment(`${date} ${appointment.endTime}`, 'YYYY-MM-DD HH:mm');
        
        return startMoment.isBefore(bookedEnd) && slotEnd.isAfter(bookedStart);
      });

      if (isAvailable && slotEnd.isSameOrBefore(endMoment)) {
        availableTimes.push(slotStart);
      }

      startMoment.add(30, 'minutes'); // Интервал 30 минут
    }

    res.status(200).json({
      success: true,
      data: availableTimes
    });
  } catch (error) {
    next(error);
  }
};