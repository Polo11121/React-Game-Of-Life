import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "@/components/Button/Button.css";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color: "green" | "red" | "blue";
};

export const Button = ({ color, ...props }: ButtonProps) => (
  <button
    {...props}
    className={`button button-${color} ${
      props.disabled ? "button-disabled" : ""
    }`}
  >
    {props.children}
  </button>
);
