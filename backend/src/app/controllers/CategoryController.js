import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll({
      where: { user_id: req.userId },
    });

    return res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;
    const categoryExists = await Category.findOne({
      where: { name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Esta categoria já existe' });
    }
    console.log(req.userId);
    const category = await Category.create({
      name,
      user_id: req.userId,
    });

    return res.json(category);
  }
}

export default new CategoryController();
