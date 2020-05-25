import { format, parseISO, isBefore, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Reminder from '../models/Reminder';
import User from '../models/User';
import Todo from '../models/Todo';
import Category from '../models/Category';

import ReminderMail from '../jobs/ReminderMail';
import Queue from '../../lib/Queue';

class ReminderController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const { title, date } = req.body;
    const { todo_id } = req.params;

    const user = await User.findByPk(req.userId);
    const todo = await Todo.findByPk(todo_id, {
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });

    if (!todo) {
      return res.status(400).json({ error: 'Tarefa inexistente!' });
    }

    const parsedDate = parseISO(date);

    if (isAfter(parsedDate, todo.start_date)) {
      return res.status(400).json({
        error: 'Você não pode criar lembretes para datas posteriores à tarefa',
      });
    }

    if (isBefore(parsedDate, new Date())) {
      return res.status(400).json({
        error: 'Você não pode criar lembretes para datas passadas',
      });
    }

    const formattedDate = format(
      todo.start_date,
      "dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    const reminder = await Reminder.create({
      title,
      user_id: req.userId,
      todo_id,
      date,
    });

    await Queue.add(
      ReminderMail.key,
      {
        subject: title,
        user,
        todo,
        date: formattedDate,
      },
      date
    );

    return res.json(reminder);
  }
}

export default new ReminderController();
