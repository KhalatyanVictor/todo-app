interface Todo {
  label: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  onToggle: (index: number) => void;
  onClearCompleted: () => void;
}

export default function List({ todos, onToggle, onClearCompleted }: Props) {
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todos">
      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">✨</div>
          <p className="empty-state-text">
            No tasks yet. Add one to get started!
          </p>
        </div>
      ) : (
        <>
          {todos.map((todo, i) => (
            <div
              key={i}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(i)}
                placeholder="."
              />
              <p>{todo.label}</p>
            </div>
          ))}

          <div className="todo-footer">
            <span className="todo-count">
              {activeCount}{" "}
              {activeCount === 1 || activeCount === 0 ? "task" : "tasks"}{" "}
              remaining
            </span>
            {completedCount > 0 && (
              <button className="clearBtn" onClick={onClearCompleted}>
                🗑️ Clear {completedCount} completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
