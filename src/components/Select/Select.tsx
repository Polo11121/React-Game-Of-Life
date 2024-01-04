import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import "@/components/Select/Select.css";

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  labelText: string;
  options: { label: string; value: number }[];
};

export const Select = ({
  labelText,
  options,

  ...props
}: SelectProps) => (
  <div className="select-container">
    <label htmlFor={props.id}>{labelText}</label>
    <select {...props} className="select">
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);
