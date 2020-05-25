import Sequelize, { Model } from 'sequelize';

class Reminder extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        todo_id: Sequelize.INTEGER,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Reminder;
