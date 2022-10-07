import React, { useEffect } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { resolveGetRecruitment } from "../../reducers/Recruitment/actions";

import Card from "../../components/Card";
import type { RootState, AppDispatch } from "../../store";

const Recruitment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  let navigate = useNavigate();

  const jobs = useSelector((state: RootState) => state.recruitments);
  const {
    detail: { data, isLoading, isError },
  } = jobs;

  useEffect(() => {
    id && dispatch(resolveGetRecruitment({ id }));
  }, [id]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (!isLoading && isError) {
    return <p>Get detail job error.</p>;
  }

  return (
    <>
      <div className={cx("w-full bg-accentWhite min-h-screen")}>
        <div className={cx("p-4")}>
          <div
            className={cx("my-2 font-bold text-primary text-lg cursor-pointer")}
            onClick={() => navigate("/p/recruitments")}
          >
            Back
          </div>
          <Card color="white">
            <div className={cx("p-4")}>
              <div className={cx("flex flex-col mb-4")}>
                <div className={cx("font-normal text-sm text-gray-500")}>
                  {data.type} / {data.location}
                </div>
                <div className={cx("font-bold text-xl text-slate-700")}>
                  {data.title}
                </div>
              </div>
              <div className={cx("flex border-t-2 py-2 gap-x-10")}>
                <div className={cx("w-2/3")}>
                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                  ;
                </div>
                <div className={cx("flex flex-col w-1/3 gap-y-4")}>
                  <Card color="gray" isRoundedEdge={true}>
                    <div className={cx("flex p-2 justify-between")}>
                      <div className={cx("font-bold text-lg")}>
                        {data.company}
                      </div>
                      <div
                        className={cx(
                          "px-2 py-1 bg-gray-300 rounded-md text-primary font-bold"
                        )}
                      >
                        1 Other Job
                      </div>
                    </div>
                    <div className={cx("p-2 border-t-2")}>
                      <img
                        src="https://rec-data.kalibrr.com/logos/9JEHXU5YJ6G8PYZ3KC3Z9KRWEHBRMZH7ZB62SDM9-5b744931.jpg"
                        alt="Dans"
                        width={"100%"}
                      />
                      <a
                        className={cx("text-primary font-bold")}
                        href={data.company_url}
                      >
                        {data.company_url}
                      </a>
                    </div>
                  </Card>
                  <Card color="yellow" isRoundedEdge={true}>
                    <div className={cx("p-2")}>
                      <div className={cx("font-bold text-lg")}>
                        How to apply
                      </div>
                    </div>
                    <div className={cx("p-2 border-t-2 overflow-x-auto")}>
                      <div
                        className={cx("whitespace-normal")}
                        dangerouslySetInnerHTML={{ __html: data.how_to_apply }}
                      />
                      ;
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Recruitment;
