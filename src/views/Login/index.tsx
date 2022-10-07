import React, { useEffect } from "react";
import TextInput from "../../components/TextInput";
import cx from "classnames";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resolveLogin, setParams } from "../../reducers/Auth/actions";
import type { RootState, AppDispatch } from "../../store";
import { AUTH_KEY } from "../../constants/Cookies";
import { setCookies } from "../../utils/cookies";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth);
  const { username, password, isLoading, isError, token } = auth;

  const dispatch = useDispatch<AppDispatch>();

  const handleSetParams = (field: string, value: string) => {
    dispatch(setParams({ field, value }));
  };

  const handleActionLogin = () => {
    dispatch(
      resolveLogin({
        username: username,
        password: password,
      })
    );
  };

  const handleSetAuth = async () => {
    setCookies(AUTH_KEY, token?.access_token);
    navigate("/p/recruitments");
  };
  useEffect(() => {
    if (token?.access_token) {
      handleSetAuth();
    }
  }, [token]);

  return (
    <div
      className={cx(
        "flex h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-primary "
      )}
    >
      <div className={cx("sm:mx-auto sm:w-full sm:max-w-md")}>
        <div className={cx("flex")}>
          <h2
            className={cx(
              "text-center text-3xl font-normal tracking-tight text-white"
            )}
          >
            Login to
          </h2>
          <div className={cx("text-3xl font-extrabold text-white mr-1")}>
            Github
          </div>
          <div className={cx("text-3xl font-normal text-white")}>Jobs</div>
        </div>
      </div>

      <div className={cx("mt-8 sm:mx-auto sm:w-full sm:max-w-md")}>
        <div className={cx("bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10")}>
          <div>
            <label className={cx("block text-sm font-medium text-gray-700")}>
              Username
            </label>
            <div className={cx("mt-1")}>
              <TextInput
                id="username-input"
                placeholder="Username"
                name="username"
                onChange={(field: string, value: string) =>
                  handleSetParams(field, value)
                }
              />
            </div>
          </div>

          <div className={cx("mt-2")}>
            <label className={cx("block text-sm font-medium text-gray-700")}>
              Password
            </label>
            <div className={cx("mt-1")}>
              <TextInput
                id="password-input"
                placeholder="Password"
                name="password"
                type="password"
                onChange={(field: string, value: string) =>
                  handleSetParams(field, value)
                }
              />
            </div>
          </div>

          <div className={cx("mt-4")}>
            <Button
              onClick={() => !isLoading && handleActionLogin()}
              isDisabled={!username || !password}
              text={isLoading ? "Loading..." : "Login"}
            />
          </div>
          <p className={cx("text-sm text-red-500 my-4")}>
            {isError && "Please try again, check your username and password."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
