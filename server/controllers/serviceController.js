import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';

// @desc    Получить все услуги
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      sort = 'name',
      page = 1,
      limit = 10
    } = req.query;

    // Построение фильтра
    let filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // Построение сортировки
    let sortObj = {};
    switch (sort) {
      case 'price-asc':
        sortObj = { price: 1 };
        break;
      case 'price-desc':
        sortObj = { price: -1 };
        break;
      case 'duration-asc':
        sortObj = { duration: 1 };
        break;
      case 'duration-desc':
        sortObj = { duration: -1 };
        break;
      case 'popularity':
        sortObj = { popularity: -1 };
        break;
      default:
        sortObj = { name: 1 };
    }

    // Пагинация
    const skip = (page - 1) * limit;

    const services = await Service.find(filter)
      .populate('category', 'name icon')
      .populate('specialists', 'name')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await Service.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: services.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: services
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получить услугу по ID
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('category', 'name icon description')
      .populate('specialists', 'name avatar role');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Создать услугу
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Обновить услугу
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Удалить услугу
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Услуга не найдена'
      });
    }

    // Мягкое удаление - деактивация
    service.isActive = false;
    await service.save();

    res.status(200).json({
      success: true,
      message: 'Услуга деактивирована'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получить категории услуг
// @route   GET /api/services/categories
// @access  Public
export const getServiceCategories = async (req, res, next) => {
  try {
    const categories = await ServiceCategory.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Создать категорию услуг
// @route   POST /api/services/categories
// @access  Private (Admin)
export const createServiceCategory = async (req, res, next) => {
  try {
    const category = await ServiceCategory.create(req.body);

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};