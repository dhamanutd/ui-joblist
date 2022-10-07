import React from "react";
import cx from "classnames";

interface ICardProps {
  children: any;
  color?: string;
  isRoundedEdge?: boolean;
}

const Card: React.FC<ICardProps> = ({
  children,
  color,
  isRoundedEdge,
}: ICardProps) => {
  return (
    <div
      className={cx("border-4 w-full", {
        "border-accentGrey bg-white": color === "white",
        "border-accentGreen bg-accentYellow": color === "yellow",
        "border-gray-200 bg-gray-100": color === "gray",
        "rounded-sm": isRoundedEdge,
      })}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  color: "white",
  isRoundedEdge: false,
};

export default Card;
