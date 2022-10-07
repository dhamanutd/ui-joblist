import React, { useEffect } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import { timeFromNow } from "../../utils/dateFormat";

import {
  resolveGetRecruitments,
  setParams,
} from "../../reducers/Recruitment/actions";
import {
  IRecruitmentDetailType,
  IRecruitmentQueryParams,
} from "../../reducers/Recruitment/constants";
import type { RootState, AppDispatch } from "../../store";

const Item = ({ data }: { data: IRecruitmentDetailType }) => {
  const navigate = useNavigate();
  return (
    <div
      key={data.id}
      className={cx(
        "border-t-2 border-b-accentGrey py-2 flex justify-between items-center"
      )}
    >
      <div className={cx("flex flex-col")}>
        <div
          className={cx("font-bold text-primary cursor-pointer")}
          onClick={() => navigate(`/p/recruitment/${data.id}`)}
        >
          {data.title}
        </div>
        <div className={cx("flex")}>
          <div className={cx("font-normal text-gray-400")}>{data.company}</div>
          <div className={cx("font-normal text-gray-400 mx-1")}>-</div>
          <div className={cx("font-bold text-green-700")}>{data.type}</div>
        </div>
      </div>
      <div className={cx("flex flex-col items-end")}>
        <div className={cx("font-normal text-gray-500")}>{data.location}</div>
        <div className={cx("font-normal text-gray-400")}>
          {timeFromNow(data.created_at)}
        </div>
      </div>
    </div>
  );
};

const Filter = ({
  onChange,
  params,
  search,
}: {
  onChange: (field: string, value: any) => void;
  params: IRecruitmentQueryParams;
  search: () => void;
}) => {
  return (
    <div className={cx("flex mb-4 mt-10 flex-wrap gap-x-2")}>
      <div className={cx("w-1/3")}>
        <label className={cx("block text-sm font-medium text-gray-700")}>
          Job Description
        </label>
        <div className={cx("mt-1")}>
          <TextInput
            id="description-input"
            onChange={(field: string, value: any) => onChange(field, value)}
            placeholder="Filter by title, benefits, companies, expertise"
            name="description"
          />
        </div>
      </div>
      <div className={cx("w-1/3")}>
        <label className={cx("block text-sm font-medium text-gray-700")}>
          Location
        </label>
        <div className={cx("mt-1")}>
          <TextInput
            id="location-input"
            onChange={(field: string, value: any) => onChange(field, value)}
            placeholder="Filter by city, state, zip code or country"
            name="location"
          />
        </div>
      </div>
      <div className="relative flex items-center ml-4">
        <div className="flex h-5 items-center">
          <input
            name="fulltime"
            type="checkbox"
            checked={params.fulltime}
            onChange={() => onChange("fulltime", !params.fulltime)}
            className={cx(
              "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            )}
          />
        </div>
        <div className="ml-3 text-base">
          <div className={cx("font-bold text-gray-700")}>Full time only</div>
        </div>
      </div>
      <div className="flex items-end ml-4">
        <Button
          isDisabled={
            !params.description && !params.location && !params.fulltime
          }
          text="Search"
          onClick={() => search()}
        />
      </div>
    </div>
  );
};

const Recruitments = () => {
  const jobs = useSelector((state: RootState) => state.recruitments);
  const {
    jobs: { isLoading, data, isError },
    params,
  } = jobs;
  const dispatch = useDispatch<AppDispatch>();

  const handleSetParams = (field: string, value: any) => {
    dispatch(setParams({ field, value }));
  };

  const getJobList = () => {
    const parameter = {
      description: params.description,
      location: params.location,
      fulltime: params.fulltime,
      page: params.page,
    };

    dispatch(resolveGetRecruitments(parameter));
  };

  useEffect(() => {
    getJobList();
  }, [params.page]);

  return (
    <>
      <div className={cx("w-full bg-accentWhite min-h-screen")}>
        <div className={cx("p-4")}>
          <Filter
            onChange={(field: string, value: string | boolean) =>
              handleSetParams(field, value)
            }
            params={params}
            search={() => getJobList()}
          />
          <Card color="white">
            <div className={cx("p-2")}>
              <div className={cx("font-bold text-2xl text-slate-700 my-2")}>
                Job List
              </div>
              {!isLoading && isError && (
                <p className={cx("text-sm font-normal text-red-500")}>
                  Error get data jobs
                </p>
              )}
              {!isLoading &&
                !isError &&
                data.map((item: IRecruitmentDetailType) => (
                  <Item data={item} key={item.id} />
                ))}
              {isLoading && !isError && <p>Loading...</p>}
              <div className={cx("mt-4")}>
                <Button
                  isDisabled={false}
                  text="More Jobs"
                  onClick={() => handleSetParams("page", params.page + 1)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Recruitments;
