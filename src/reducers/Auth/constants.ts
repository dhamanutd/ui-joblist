interface IAuthState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  username: string;
  password: string;
  token: any;
}

export const initialState: IAuthState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  username: "",
  password: "",
  token: "",
};
