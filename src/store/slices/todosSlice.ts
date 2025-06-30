import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

interface AddTodoPayload {
  todo: string;
  userId: number;
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('https://dummyjson.com/todos', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch todos');
      }
      
      const data = await response.json();
      return data.todos;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todoData: AddTodoPayload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          todo: todoData.todo,
          completed: false,
          userId: todoData.userId,
        }),
      });
      
      if (!response.ok) {
        return rejectWithValue('Failed to add todo');
      }
      
      const data = await response.json();
      return data;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, completed }: { id: number; completed: boolean }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });
      
      if (!response.ok) {
        return rejectWithValue('Failed to update todo');
      }
      
      const data = await response.json();
      return data;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        return rejectWithValue('Failed to delete todo');
      }
      
      return id;
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      .addCase(deleteTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearTodos, clearError } = todosSlice.actions;
export default todosSlice.reducer;