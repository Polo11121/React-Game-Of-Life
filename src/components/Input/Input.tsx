import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import "@/components/Input/Input.css";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText: string;
};

export const Input = ({ labelText, ...props }: InputProps) => (
  <div className="input-container">
    <label htmlFor={props.id}>{labelText}</label>
    <input {...props} className="input" />
  </div>
);
