import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, isBefore, formatRelative, parseISO } from 'date-fns';
import { MdAdd, MdAlarmAdd } from 'react-icons/md';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import { Container, TodoList, Todo } from './styles';

export default function Dashboard({ history }) {
  const [todos, setTodos] = useState([]);

  const dateFormatted = useMemo(
    () => format(new Date(), "d 'de' MMMM", { locale: pt }),
    []
  );

  useEffect(() => {
    async function loadTodos() {
      const response = await api.get('todos');

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = response.data.map((todo) => {
        const compareDate = utcToZonedTime(new Date(), timezone);

        return {
          ...todo,
          past: isBefore(parseISO(todo.start_date), compareDate),
          relativeParsedDate: formatRelative(
            parseISO(todo.start_date),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            }
          ),
        };
      });

      setTodos(data);
    }

    loadTodos();
  }, [dateFormatted]);

  return (
    <Container>
      <header>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={() => history.push('/todos/create')}>
          <MdAdd size={24} color="#3b4552" />
          Nova tarefa
        </button>
      </header>

      <ul>
        {todos.map((todo) => (
          <TodoList past={todo.past}>
            <Todo key={todo.id}>
              <strong>{todo.title}</strong>
              <span className="category">
                Categoria: {todo.category ? todo.category.name : 'Nenhuma'}
              </span>
              <span className="description">{todo.description}</span>
              <span>{todo.relativeParsedDate}</span>
            </Todo>
            {!todo.past && (
              <button
                type="button"
                onClick={() => history.push('/reminder/create', todo)}
              >
                <MdAlarmAdd size={30} color="#3b4552" />
              </button>
            )}
          </TodoList>
        ))}
      </ul>
    </Container>
  );
}

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
