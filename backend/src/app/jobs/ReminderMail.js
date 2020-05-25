import Mail from '../../lib/Mail';

class ReminderMail {
  get key() {
    return 'ReminderMail';
  }

  async handle({ data }) {
    const { subject, user, todo, date } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject,
      template: 'reminder',
      context: {
        user: user.name,
        date,
        title: todo.title,
        description: todo.description,
        category: todo.category ? todo.category.name : 'Nenhuma',
      },
    });
  }
}

export default new ReminderMail();
