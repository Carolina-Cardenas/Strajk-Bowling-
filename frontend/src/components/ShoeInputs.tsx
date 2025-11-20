import "../styles/ShoeInputs.css";

interface ShoeInputsProps {
  count: number;
  values: number[];
  onChange: (index: number, size: number) => void;
}

const ShoeInputs = ({ count, values, onChange }: ShoeInputsProps) => {
  return (
    <div className="container">
      {Array.from({ length: count }).map((_, i) => (
        <div className="row" key={i}>
          <label htmlFor={`shoe-${i}`}>Shoe size / person {i + 1}</label>
          <input
            id={`shoe-${i}`}
            type="number"
            min={20}
            max={50}
            title="Enter shoe size"
            value={values[i] ?? ""}
            onChange={(e) => onChange(i, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default ShoeInputs;
