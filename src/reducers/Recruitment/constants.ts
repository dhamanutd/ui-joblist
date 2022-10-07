interface IRecruitmentType {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  data: any;
}

export interface IRecruitmentQueryParams {
  description: string;
  location: string;
  fulltime: boolean;
  page: number;
}

export interface IRecruitmentDetailType {
  company: string;
  company_logo: string;
  company_url: string;
  created_at: string;
  description: string;
  how_to_apply: string;
  id: string;
  location: string;
  title: string;
  type: string;
  url: string;
}

export interface IRecruitmentState {
  jobs: IRecruitmentType;
  detail: IRecruitmentType;
  params: IRecruitmentQueryParams;
}

export const initialState: IRecruitmentState = {
  jobs: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    data: [],
  },
  params: {
    description: "",
    location: "",
    fulltime: false,
    page: 1,
  },
  detail: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    data: [],
  },
};
