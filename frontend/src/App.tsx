import { useEffect, useState } from "react";

type Todo = { id: string; title: string };

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoValue, setNewTodoValue] = useState<string>("");
  const [todoById, setTodoById] = useState<Todo>();
  const [searchIdValue, setSearchIdValue] = useState<string>("");

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .then(console.log)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  const getTodoById = () => {
    if (searchIdValue === "") {
      return;
    }

    fetch(`/api/todos/${searchIdValue}`)
      .then((res) => res.json())
      .then((todoById) => setTodoById(todoById))
      .catch(console.error);
  };

  const createTodo = () => {
    if (newTodoValue === "") {
      return;
    }

    fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodoValue }),
    })
      .then((res) => res.json())
      .then((newTodo) => setTodos([...todos, newTodo]))
      .catch(console.error);

    setNewTodoValue("");
  };

  const removeTodo = (id: string) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch(console.error);
  };

  const searchTodoById = (todoId: string) => {
    setSearchIdValue(todoId);
  };

  return (
    <div>
      <h1>Simple Todo List!</h1>
      <div className="inputs">
        <div className="inputs__block">
          <input
            type="number"
            onChange={(e) => searchTodoById(e.target.value)}
            inputMode="numeric"
            placeholder="Search todo by id"
            required
          />
          <button onClick={getTodoById}>Search</button>
        </div>
        <div className="inputs__block">
          <input
            type="text"
            value={newTodoValue}
            onChange={(e) => setNewTodoValue(e.target.value)}
            placeholder="Go to the gym"
            required
          />
          <button onClick={createTodo}>Add Todo</button>
        </div>
      </div>
      <ul className="todo__list">
        {todoById ? (
          <li className="todo__item" key={todoById.id}>
            <div className="todo__block">
              <span>{todoById.id}.</span>
              <p>{todoById.title}</p>
            </div>
            <button onClick={() => removeTodo(todoById.id)}>Remove</button>
          </li>
        ) : (
          <>
            {todos.map((todo) => (
              <li className="todo__item" key={todo.id}>
                <div className="todo__block">
                  <span>{todo.id}.</span>
                  <p>{todo.title}</p>
                </div>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default App;
