import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  fetchTodos, 
  addTodo, 
  updateTodo, 
  deleteTodo,
  clearError 
} from '../../store/slices/todosSlice';
import './TodosList.css';

const TodosList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { todos, loading, error } = useAppSelector(state => state.todos);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos());
    }
  }, [dispatch, user]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && user) {
      await dispatch(addTodo({
        todo: newTodo.trim(),
        userId: user.id,
      }));
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id: number, completed: boolean) => {
    dispatch(updateTodo({ id, completed: !completed }));
  };

  const handleDeleteTodo = (id: number) => {
    if (window.confirm('Удалить задачу?')) {
      dispatch(deleteTodo(id));
    }
  };

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  if (!user) {
    return (
      <div className="todos-container">
        <div className="auth-required">
          <h2>Для просмотра задач необходимо авторизоваться</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h1>Мои задачи</h1>
        <p>Добро пожаловать, {user.firstName} {user.lastName}!</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button className="error-close" onClick={clearErrorMessage}>×</button>
        </div>
      )}

      <form onSubmit={handleAddTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="todo-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={loading || !newTodo.trim()}
        >
          Добавить
        </button>
      </form>

      {loading && todos.length === 0 ? (
        <div className="loading">Загрузка задач...</div>
      ) : (
        <div className="todos-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>У вас пока нет задач</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.todo}</span>
                </div>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-btn"
                  title="Удалить задачу"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="todos-stats">
        <p>
          Всего задач: {todos.length} | 
          Выполнено: {todos.filter(t => t.completed).length} | 
          Осталось: {todos.filter(t => !t.completed).length}
        </p>
      </div>
    </div>
  );
};

export default TodosList;