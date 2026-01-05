interface Props {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

export default function Input({ value, onChange, onEnter }: Props) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="What needs to be done?"
    />
  );
}
