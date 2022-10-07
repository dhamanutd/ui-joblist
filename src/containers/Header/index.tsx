import React from "react";
import cx from "classnames";

const Header: React.FC = () => {
  return (
    <>
      <div className={cx("w-full p-2 bg-primary")}>
        <div className={cx("flex")}>
          <div className={cx("text-3xl font-extrabold text-white mr-1")}>
            Github
          </div>
          <div className={cx("text-3xl font-normal text-white")}>Jobs</div>
        </div>
      </div>
    </>
  );
};

export default Header;
