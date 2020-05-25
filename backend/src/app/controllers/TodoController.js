import { parseISO, isBefore } from 'date-fns';
import Todo from '../models/Todo';
import Category from '../models/Category';

class TodoController {
  async index(req, res) {
    const todos = await Todo.findAll({
      where: { user_id: req.userId },
      order: [['start_date', 'asc']],
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });

    return res.json(todos);
  }

  async store(req, res) {
    const { title, description, category_id, start_date, end_date } = req.body;

    const parsedStartDate = parseISO(start_date);
    const parsedEndDate = end_date && parseISO(end_date);

    if (parsedEndDate && isBefore(parsedEndDate, parsedStartDate)) {
      return res
        .status(400)
        .json({ error: 'A data final não pode ser anterior à de início' });
    }

    if (isBefore(parsedStartDate, new Date())) {
      return res
        .status(400)
        .json({ error: 'A data de início não pode ser uma data passada' });
    }

    const todo = await Todo.create({
      title,
      description,
      user_id: req.userId,
      category_id,
      start_date,
      end_date,
    });

    return res.json(todo);
  }

  async update(req, res) {
    const { start_date, end_date } = req.body;

    const parsedStartDate = parseISO(start_date);
    const parsedEndDate = end_date && parseISO(end_date);

    if (parsedEndDate && isBefore(parsedEndDate, parsedStartDate)) {
      return res
        .status(400)
        .json({ error: 'A data final não pode ser anterior à de início' });
    }

    if (parsedStartDate && isBefore(parsedStartDate, new Date())) {
      return res
        .status(400)
        .json({ error: 'A data de início não pode ser uma data passada' });
    }

    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    todo.update(req.body);

    return res.json(todo);
  }
}

export default new TodoController();
