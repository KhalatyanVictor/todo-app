interface Props {
  onClick: () => void;
}

export default function Add({ onClick }: Props) {
  return (
    <button onClick={onClick} className="addBtn">
      <span>+ Add Task</span>
    </button>
  );
}
