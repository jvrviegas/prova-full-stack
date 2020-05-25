import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Category from '../app/models/Category';
import Todo from '../app/models/Todo';
import Reminder from '../app/models/Reminder';
import File from '../app/models/File';

const models = [User, Category, Todo, Reminder, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
