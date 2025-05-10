import React, { useEffect, useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate, useParams } from "react-router-dom";
import { fetchuserbyid } from "../features/userApis";
import { Button } from "reactstrap";
import Loader from "./loader/Loader";

const UserDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchuserbyid(param.id);
      if (data.success) {
        setUserDetails(data);
      } else {
        console.error("Error fetching user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [param.id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const [options, setOptions] = useState({
    series: [{
      name: "Ratings",
    }],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Evaluated User Ratings",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
    },
  });

  const [userGraph] = useState({
    series: [
      Number(userDetails?.counts?.good),
      Number(userDetails?.counts?.average),
      Number(userDetails?.counts?.bad),
    ],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return Number(userDetails?.counts?.total);
              },
            },
          },
        },
      },
      labels: ["Good", "Average", "Bad"],
    },
  });

  useEffect(() => {
    if (userDetails?.user?.evaluationRating) {
      const userRatings = userDetails.user.evaluationRating
        .map((rating) => Number(rating?.rating))
        .filter((r) => !isNaN(r));

      setOptions((pre) => ({
        ...pre,
        series: [{
          data: userRatings,
        }],
        options: {
          ...pre.options,
          xaxis: {
            ...pre.options.xaxis,
            categories: userDetails.user.evaluationRating.map(
              (rating, index) => `Day ${index + 1}`
            ),
          },
        },
      }));
    }
  }, [userDetails]);

  const handlerViewData = (name) => {
    navigate(`/bi/data/${param.id}/${name}`);
  };

  return (
    <div
      style={{
        width: "100%",
      }}
      className="d-flex container flex-column gap-5"
    >
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center gap-3">
            <Button onClick={() => handlerViewData(userDetails?.user?.name)}>
              View All Data
            </Button>
          </div>
          <div className="rounded" style={{ backgroundColor: "#fff" }}>
            <ReactApexChart
              options={userGraph?.options}
              series={userGraph?.series}
              type="radialBar"
              height={350}
            />
          </div>
          <div className="rounded p-3" style={{ backgroundColor: "#fff" }}>
            <ReactApexChart
              options={options?.options}
              series={options?.series}
              type="area"
              height={350}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;