import Promotion from '../models/Promotion.js';
import moment from 'moment';

// @desc    Получить все активные акции
// @route   GET /api/promotions
// @access  Public
export const getPromotions = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    let filter = {
      isActive: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    };

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const promotions = await Promotion.find(filter)
      .populate('applicableServices', 'name price')
      .populate('applicableProducts', 'name price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Promotion.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: promotions.length,
      total,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: promotions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получить акцию по ID
// @route   GET /api/promotions/:id
// @access  Public
export const getPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id)
      .populate('applicableServices', 'name price duration')
      .populate('applicableProducts', 'name price brand');

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Акция не найдена'
      });
    }

    res.status(200).json({
      success: true,
      data: promotion
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Проверить промокод
// @route   POST /api/promotions/validate
// @access  Public
export const validatePromoCode = async (req, res, next) => {
  try {
    const { code, serviceId, productIds, orderAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Промокод обязателен'
      });
    }

    const promotion = await Promotion.findOne({
      code: code.toUpperCase(),
      isActive: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    }).populate('applicableServices applicableProducts');

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Промокод не найден или истек'
      });
    }

    // Проверка лимита использования
    if (promotion.usageLimit && promotion.usageCount >= promotion.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'Промокод исчерпан'
      });
    }

    // Проверка минимальной суммы заказа
    if (promotion.minOrderAmount && orderAmount < promotion.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Минимальная сумма заказа для применения промокода: ${promotion.minOrderAmount} ₽`
      });
    }

    // Проверка применимости к услугам
    if (serviceId && promotion.applicableServices.length > 0) {
      const isApplicable = promotion.applicableServices.some(
        service => service._id.toString() === serviceId
      );
      
      if (!isApplicable) {
        return res.status(400).json({
          success: false,
          message: 'Промокод не применим к выбранной услуге'
        });
      }
    }

    // Проверка применимости к товарам
    if (productIds && productIds.length > 0 && promotion.applicableProducts.length > 0) {
      const applicableProductIds = promotion.applicableProducts.map(p => p._id.toString());
      const hasApplicableProducts = productIds.some(id => applicableProductIds.includes(id));
      
      if (!hasApplicableProducts) {
        return res.status(400).json({
          success: false,
          message: 'Промокод не применим к товарам в корзине'
        });
      }
    }

    // Расчет скидки
    let discount = 0;
    switch (promotion.type) {
      case 'percentage':
        discount = (orderAmount * promotion.value) / 100;
        break;
      case 'fixed':
        discount = promotion.value;
        break;
      default:
        discount = 0;
    }

    // Скидка не может быть больше суммы заказа
    discount = Math.min(discount, orderAmount);

    res.status(200).json({
      success: true,
      data: {
        promotion: {
          id: promotion._id,
          title: promotion.title,
          type: promotion.type,
          value: promotion.value,
          code: promotion.code
        },
        discount,
        finalAmount: orderAmount - discount
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Создать акцию
// @route   POST /api/promotions
// @access  Private (Admin)
export const createPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.create(req.body);

    res.status(201).json({
      success: true,
      data: promotion
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Обновить акцию
// @route   PUT /api/promotions/:id
// @access  Private (Admin)
export const updatePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Акция не найдена'
      });
    }

    res.status(200).json({
      success: true,
      data: promotion
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Удалить акцию
// @route   DELETE /api/promotions/:id
// @access  Private (Admin)
export const deletePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Акция не найдена'
      });
    }

    promotion.isActive = false;
    await promotion.save();

    res.status(200).json({
      success: true,
      message: 'Акция деактивирована'
    });
  } catch (error) {
    next(error);
  }
};