import React from "react";
import cx from "classnames";

interface IButtonProps {
  text: String;
  onClick: Function;
  isDisabled: boolean;
}

const Button: React.FC<IButtonProps> = ({
  text,
  onClick,
  isDisabled,
}: IButtonProps) => {
  return (
    <button
      onClick={() => !isDisabled && onClick()}
      className={cx(
        "flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm",
        {
          "bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2":
            !isDisabled,
          "bg-gray-400": isDisabled,
        }
      )}
    >
      {text}
    </button>
  );
};

export default Button;
