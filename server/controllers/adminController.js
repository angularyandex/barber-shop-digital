import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import moment from 'moment';

// @desc    Получить статистику дашборда
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate, endDate;
    const now = moment();

    switch (period) {
      case 'week':
        startDate = now.clone().startOf('week');
        endDate = now.clone().endOf('week');
        break;
      case 'month':
        startDate = now.clone().startOf('month');
        endDate = now.clone().endOf('month');
        break;
      case 'year':
        startDate = now.clone().startOf('year');
        endDate = now.clone().endOf('year');
        break;
      default:
        startDate = now.clone().startOf('week');
        endDate = now.clone().endOf('week');
    }

    // Статистика записей
    const appointmentsStats = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$price' }
        }
      }
    ]);

    // Статистика заказов
    const ordersStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    // Общая статистика
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalServices = await Service.countDocuments({ isActive: true });
    const totalProducts = await Product.countDocuments({ isActive: true });

    // Популярные услуги
    const popularServices = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
          status: { $in: ['completed', 'confirmed'] }
        }
      },
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
          revenue: { $sum: '$price' }
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: '_id',
          as: 'serviceInfo'
        }
      },
      {
        $unwind: '$serviceInfo'
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Динамика по дням
    const dailyStats = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          appointments: { $sum: 1 },
          revenue: { $sum: '$price' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        period,
        dateRange: {
          start: startDate.format('YYYY-MM-DD'),
          end: endDate.format('YYYY-MM-DD')
        },
        totals: {
          users: totalUsers,
          services: totalServices,
          products: totalProducts
        },
        appointments: appointmentsStats,
        orders: ordersStats,
        popularServices,
        dailyStats
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получить все записи (для админа)
// @route   GET /api/admin/appointments
// @access  Private (Admin)
export const getAllAppointments = async (req, res, next) => {
  try {
    const {
      status,
      specialist,
      date,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (specialist) filter.specialist = specialist;
    if (date) {
      const startDate = moment(date).startOf('day');
      const endDate = moment(date).endOf('day');
      filter.date = { $gte: startDate.toDate(), $lte: endDate.toDate() };
    }

    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(filter)
      .populate('client', 'name email phone')
      .populate('service', 'name duration price')
      .populate('specialist', 'name')
      .sort(sort)
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

// @desc    Получить всех пользователей
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const {
      role,
      isActive,
      search,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    let filter = {};

    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    // Добавляем статистику для каждого пользователя
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const userObj = user.toObject();
        
        if (user.role === 'user') {
          const appointmentsCount = await Appointment.countDocuments({ client: user._id });
          const ordersCount = await Order.countDocuments({ customer: user._id });
          
          userObj.stats = {
            totalAppointments: appointmentsCount,
            totalOrders: ordersCount
          };
        }
        
        return userObj;
      })
    );

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: usersWithStats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Обновить статус пользователя
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
export const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Обновить статус записи
// @route   PUT /api/admin/appointments/:id/status
// @access  Private (Admin)
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('client', 'name email')
     .populate('service', 'name')
     .populate('specialist', 'name');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Запись не найдена'
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

// @desc    Получить отчеты
// @route   GET /api/admin/reports
// @access  Private (Admin)
export const getReports = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Необходимо указать период отчета'
      });
    }

    const start = moment(startDate).startOf('day');
    const end = moment(endDate).endOf('day');

    let reportData = {};

    switch (type) {
      case 'revenue':
        reportData = await generateRevenueReport(start, end);
        break;
      case 'services':
        reportData = await generateServicesReport(start, end);
        break;
      case 'specialists':
        reportData = await generateSpecialistsReport(start, end);
        break;
      default:
        reportData = await generateGeneralReport(start, end);
    }

    res.status(200).json({
      success: true,
      data: reportData
    });
  } catch (error) {
    next(error);
  }
};

// Вспомогательные функции для отчетов
const generateRevenueReport = async (startDate, endDate) => {
  const appointmentsRevenue = await Appointment.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$price' },
        count: { $sum: 1 }
      }
    }
  ]);

  const ordersRevenue = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        status: 'delivered'
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$totalAmount' },
        count: { $sum: 1 }
      }
    }
  ]);

  return {
    appointments: appointmentsRevenue[0] || { total: 0, count: 0 },
    orders: ordersRevenue[0] || { total: 0, count: 0 }
  };
};

const generateServicesReport = async (startDate, endDate) => {
  return await Appointment.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: '$service',
        count: { $sum: 1 },
        revenue: { $sum: '$price' }
      }
    },
    {
      $lookup: {
        from: 'services',
        localField: '_id',
        foreignField: '_id',
        as: 'serviceInfo'
      }
    },
    {
      $unwind: '$serviceInfo'
    },
    {
      $sort: { revenue: -1 }
    }
  ]);
};

const generateSpecialistsReport = async (startDate, endDate) => {
  return await Appointment.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: '$specialist',
        count: { $sum: 1 },
        revenue: { $sum: '$price' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'specialistInfo'
      }
    },
    {
      $unwind: '$specialistInfo'
    },
    {
      $sort: { revenue: -1 }
    }
  ]);
};

const generateGeneralReport = async (startDate, endDate) => {
  const [revenue, services, specialists] = await Promise.all([
    generateRevenueReport(startDate, endDate),
    generateServicesReport(startDate, endDate),
    generateSpecialistsReport(startDate, endDate)
  ]);

  return { revenue, services, specialists };
};