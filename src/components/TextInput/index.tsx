import React, { ComponentPropsWithoutRef } from "react";
import cx from "classnames";

interface ITextInputProps {
  id: string;
  name: string;
  placeholder: string;
  onChange: (field: string, value: string) => void;
  type?: string;
  isRoundedEdge?: boolean;
}

const TextInput: React.FC<ITextInputProps> = ({
  id,
  name,
  placeholder,
  onChange,
  type,
  isRoundedEdge,
}: ITextInputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      className={cx(
        {
          "rounded-md": isRoundedEdge,
        },
        "block w-full appearance-none border-2 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
      )}
    />
  );
};

TextInput.defaultProps = {
  type: "text",
  isRoundedEdge: false,
};

export default TextInput;
