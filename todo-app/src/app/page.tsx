"use client";

import { useState } from "react";

type Todo = {
  name: string;
  description: string;
  date: string;
  status: "active" | "terminated";
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addTodo = () => {
    if (name && description && date) {
      setTodos([...todos, { name, description, date, status: "active" }]);
      setName("");
      setDescription("");
      setDate("");
    }
  };

  const terminateTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].status = "terminated";
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo App</h1>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="date-input"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Add Todo
            </button>
          </div>
          <ul className="space-y-4">
            {todos.map((todo, index) => (
              <li key={index} className={`p-4 rounded-lg border border-gray-200 ${todo.status === "terminated" ? "bg-gray-300" : "bg-gray-50"}`}>
                <h2 className="text-xl font-semibold text-gray-700">{todo.name}</h2>
                <p className="text-gray-600 mt-2">{todo.description}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(todo.date).toLocaleString()}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => terminateTodo(index)}
                    disabled={todo.status === "terminated"}
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors duration-300"
                  >
                    Terminate
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
