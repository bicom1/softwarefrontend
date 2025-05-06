import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { evaluationApi, fetchleaders, leaddelete } from "../features/userApis";
import { useNavigate } from "react-router-dom";
import BtnLoader from "./loader/BtnLoader";
import { socket } from "../socket";
import toast from "react-hot-toast";
import LeadModel from "../views/ui/LeadModel";

const user = JSON.parse(localStorage.getItem("bicuserData"));

const AgentForm = () => {
  const navigate = useNavigate();
  const [fetchLatestUser, setFetchLatestUser] = useState(false);
  const [load, setLoad] = useState(false);
  const [leaders, setLeader] = useState([]);
  const [userRate, setUseRate] = useState({
    greeting: { rateVal: 0 },
    accuracy: { rateVal: 0 },
    building: { rateVal: 0 },
    presenting: { rateVal: 0 },
    closing: { rateVal: 0 },
    bonus: { rateVal: 0 },
  });

  const [evaluation, setEvaluation] = useState({
    email: user?.email || "",
    leadId: "",
    agentName: "",
    mod: "",
    teamleader: "",
    greetings: "",
    accuracy: "",
    building: "",
    presenting: "",
    closing: "",
    bonus: "",
    evaluationsummary: "",
    // evaluationpoints: [],
    rating: " ",
  });

  const handlerChangeEvl = (name, value) => {
    setEvaluation((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handlerDel = async (id) => {
    const { data } = await leaddelete(id);
    if (data.success) {
      fetchleaders();
    }
  };
  const fetchlead = async () => {
    let data = await fetchleaders();
    setLeader(data);
  };

  useEffect(() => {
    fetchlead();
  }, []);

  useEffect(() => {
    const fetchlead = async () => {
      let data = await fetchleaders();
      setLeader(data);
      setFetchLatestUser(false);
    };
    fetchlead();
  }, [fetchLatestUser]);

  useEffect(() => {
    const calTotalRating = () => {
      return Object.values(userRate).reduce(
        (total, cat) => total + cat.rateVal,
        0
      );
    };

    const total = calTotalRating();
    setEvaluation((pre) => ({
      ...pre,
      rating: total,
    }));
  }, [userRate]);

  const handlerEscForm = async () => {
    setLoad(true);
    if (
      evaluation.email.trim() === "" ||
      evaluation.leadId.trim() === "" ||
      evaluation.agentName.trim() === "" ||
      evaluation.mod.trim() === "" ||
      evaluation.teamleader.trim() === "" ||
      evaluation.greetings.trim() === "" ||
      evaluation.accuracy.trim() === "" ||
      evaluation.building.trim() === "" ||
      evaluation.presenting.trim() === "" ||
      evaluation.closing.trim() === "" ||
      evaluation.bonus.trim() === "" ||
      evaluation.evaluationsummary.trim() === ""
    ) {
      toast.error("Please fill fields!");
      setLoad(false);
      return;
    } else {
      const getUser = JSON.parse(localStorage.getItem("bicuserData"));
      const id = getUser.id;
      evaluation._id = id;
      const data = await evaluationApi(evaluation);
      if (data.data.success) {
        setEvaluation({
          email: "",
          leadId: "",
          agentName: "",
          mod: "",
          teamleader: "",
          greetings: "",
          accuracy: "",
          building: "",
          presenting: "",
          closing: "",
          bonus: "",
          evaluationsummary: "",
          rating: "",
        });
        toast.success("Successfully Created!");

        socket.emit("sent-notification", {
          id: id,
          username: getUser.name,
          description: "submitted Evaluation form!",
          userRoom: "notification-Room",
        });
        navigate("/bi/profile");
        window.location.reload();
        setLoad(false);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-gray d-flex flex-column gap-3">
        <div className="rounded d-flex justify-content-center flex-column align-items-center bg-card-color">
          <h1 className="fw-bolder">BI COMM</h1>
          <h3 className="text-success">Evaluation Form</h3>
        </div>

        <div className="rounded d-flex justify-content-center flex-column bg-card-color">
          <div className="d-flex flex-start p-4">
            <label>
              Enter your email: <br />
              <Input
                type="email"
                placeholder="Enter Your Email Here"
                value={evaluation.email}
                readOnly
                // onChange={(e) => handlerChangeEvl("email", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className="d-flex flex-start p-4">
            <label>
              lead ID: <br />
              <Input
                type="text"
                placeholder="Enter Your Lead ID Here"
                value={evaluation.leadId}
                onChange={(e) => handlerChangeEvl("leadId", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className="d-flex flex-start p-4">
            <label>
              Agent Name: <br />
              <Input
                type="text"
                placeholder="Enter Agent Name Here"
                value={evaluation.agentName}
                onChange={(e) => handlerChangeEvl("agentName", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className="d-flex justify-content-between align-items-center mx-4">
            <h3 className="mt-2">Team Leader</h3>
            {user.role === "admin" && (
              <div>
                <LeadModel setFetchLatestUser={setFetchLatestUser} />
              </div>
            )}
          </div>
          {leaders?.data?.data?.length <= 0 ? (
            <div>Loading...</div>
          ) : (
            leaders?.data?.data?.map((val, index) => (
              <form
                class="bg-gray px-4 py-2 mt-0 w-100 d-flex justify-content-between align-items-center"
                key={index}
              >
                <label className="w-100">
                  <Input
                    className="m-1"
                    type="radio"
                    name="Department"
                    id="lead"
                    value={`${val.leadName}`}
                    onChange={(e) =>
                      handlerChangeEvl("teamleader", e.target.value)
                    }
                    checked={evaluation.teamleader === `${val.leadName}`}
                  ></Input>
                  {val.leadName}
                </label>
                {user.role === "admin" && (
                  <i
                    class="bi bi-x-octagon"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => handlerDel(val._id)}
                  ></i>
                )}
                <br />
              </form>
            ))
          )}
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <h3 className="p-4">Mode of Communication</h3>
          <div class="bg-gray px-4">
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-1"
                type="radio"
                name="Communication"
                value="Chat"
                checked={evaluation.mod === "Chat"}
                onChange={(e) => handlerChangeEvl("mod", e.target.value)}
                defaultChecked
              />
              Chat
            </label>
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-1"
                type="radio"
                name="Communication"
                value="Call"
                checked={evaluation.mod === "Call"}
                onChange={(e) => handlerChangeEvl("mod", e.target.value)}
              />
              Call
            </label>
            <br />
            <br />
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className="p-4">
            <h3>Greetings</h3>
            <p>
              Demonstrates enthusiasm and a positive tone throughout the call.
            </p>
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2 radioIn"
                type="radio"
                id="Greetings"
                name="Greetings"
                value="Uses a professional and friendly Greeting "
                checked={evaluation.greetings === "uses"}
                onChange={(e) => {
                  handlerChangeEvl("greetings", e.target.value);
                  setUseRate((pre) => ({ ...pre, greeting: { rateVal: 16 } }));
                }}
              />
              Uses a professional and friendly greeting within the first 3
              seconds, including the company name and their own name
            </label>{" "}
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2 "
                type="radio"
                id="Greetings"
                name="Greetings"
                value="Not upto the mark"
                checked={evaluation.greetings === "mark"}
                onChange={(e) => {
                  handlerChangeEvl("greetings", e.target.value);
                  setUseRate((pre) => ({ ...pre, greeting: { rateVal: 0 } }));
                }}
              />
              Not upto the mark
            </label>{" "}
            <br />
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className=" p-4">
            <h3>Accuracy & Compliance</h3>
            <p>
              Provides accurate and up-to-date secondaryrmation about the
              company's products or services, adhering to all relevant scripts
              and policies.
            </p>
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                style={{ width: "16px" }}
                type="radio"
                id="Accuracy"
                name="Accuracy"
                value="Asks clear and concise questions"
                checked={evaluation.accuracy === "questions"}
                onChange={(e) => {
                  handlerChangeEvl("accuracy", e.target.value);
                  setUseRate((pre) => ({ ...pre, accuracy: { rateVal: 16 } }));
                }}
              />
              Asks clear and concise questions to accurately identify the
              customer's needs or inquiries.
            </label>{" "}
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                type="radio"
                id="Accuracy"
                name="Accuracy"
                value="Not upto the mark"
                checked={evaluation.accuracy === "mark"}
                onChange={(e) => {
                  handlerChangeEvl("accuracy", e.target.value);
                  setUseRate((pre) => ({ ...pre, accuracy: { rateVal: 0 } }));
                }}
              />
              Not upto the mark
            </label>{" "}
            <br />
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className=" p-4">
            <h3>Building Rapport & Discovery</h3>
            <p>
              Identifies potential pain points or opportunities where the
              product/service can provide value to the customer.
            </p>
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                style={{ width: "25px" }}
                type="radio"
                id="Building"
                name="Building"
                value="Demonstrates Active Listening Skills"
                onChange={(e) => {
                  handlerChangeEvl("building", e.target.value);
                  setUseRate((pre) => ({ ...pre, building: { rateVal: 16 } }));
                }}
                checked={evaluation.building === "skills"}
              />
              Demonstrates active listening skills and asks open-ended questions
              to understand the customer's needs and potential interest in the
              product/service.
            </label>{" "}
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                type="radio"
                id="Building"
                name="Building"
                value="Not Upto The Mark"
                onChange={(e) => {
                  handlerChangeEvl("building", e.target.value);
                  setUseRate((pre) => ({ ...pre, building: { rateVal: 0 } }));
                }}
                checked={evaluation.building === "mark"}
              />
              Not upto the mark
            </label>{" "}
            <br />
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className=" p-4">
            <h3>Presenting Solutions & Making the Sale</h3>
            <p>
              Clearly and concisely presents the product/service features and
              benefits tailored to the customer's needs identified earlier.
            </p>
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                style={{ width: "25px" }}
                type="radio"
                id="Presenting"
                name="Presenting"
                value="Attempts to overcome objections professionally"
                checked={evaluation.presenting === "appointment"}
                onChange={(e) => {
                  handlerChangeEvl("presenting", e.target.value);
                  setUseRate((pre) => ({
                    ...pre,
                    presenting: { rateVal: 16 },
                  }));
                }}
              />
              Attempts to overcome objections professionally using established
              techniques and effectively guides the customer towards booking an
              appointment.
            </label>{" "}
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                type="radio"
                id="Presenting"
                name="Presenting"
                value="Not upto the mark"
                checked={evaluation.presenting === "mark"}
                onChange={(e) => {
                  handlerChangeEvl("presenting", e.target.value);
                  setUseRate((pre) => ({ ...pre, presenting: { rateVal: 0 } }));
                }}
              />
              Not upto the mark
            </label>{" "}
            <br />
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className=" p-4">
            <h3>Call Closing & Securing Commitment</h3>
            <p>
              Confirms the customer's details and secures their commitment for
              the sale or appointment. Thanks the customer for their time and
              offers further assistance if needed.
            </p>
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                style={{ width: "25px" }}
                type="radio"
                id="Closing"
                name="Closing"
                value="Professionally summarizes key points"
                checked={evaluation.closing === "Professionally"}
                onChange={(e) => {
                  handlerChangeEvl("closing", e.target.value);
                  setUseRate((pre) => ({ ...pre, closing: { rateVal: 16 } }));
                }}
              />
              Professionally summarizes key points discussed and clearly
              outlines the next steps, including the call to action (e.g.,
              callback, appointment booking).
            </label>{" "}
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                type="radio"
                id="Closing"
                name="Closing"
                value="Not upto the mark"
                checked={evaluation.closing === "mark"}
                onChange={(e) => {
                  handlerChangeEvl("closing", e.target.value);
                  setUseRate((pre) => ({ ...pre, closing: { rateVal: 0 } }));
                }}
              />
              Not upto the mark
            </label>{" "}
            <br />
          </div>
        </div>
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className=" p-4">
            <h3>Bonus Point</h3>
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                style={{ width: "28px" }}
                type="radio"
                id="Bonus"
                name="Bonus"
                value="Goes above and beyond by exceeding customer"
                checked={evaluation.bonus === "customer"}
                onChange={(e) => {
                  handlerChangeEvl("bonus", e.target.value);
                  setUseRate((pre) => ({ ...pre, bonus: { rateVal: 16 } }));
                }}
              />
              Goes above and beyond by exceeding customer expectations, offering
              additional solutions, demonstrating exceptional product knowledge,
              or successfully overcoming a significant objection.
            </label>{" "}
            <br />
            <label className="d-flex align-items-center gap-2">
              <Input
                className="m-2"
                type="radio"
                id="Bonus"
                name="Bonus"
                value="Not upto the mark"
                checked={evaluation.bonus === "mark"}
                onChange={(e) => {
                  handlerChangeEvl("bonus", e.target.value);
                  setUseRate((pre) => ({ ...pre, bonus: { rateVal: 0 } }));
                }}
              />
              Not upto the mark
            </label>{" "}
            <br />
          </div>
        </div>
        {/* <div className="bg-card-color rounded d-flex justify-content-center flex-column">
  <div className="p-4">
    <h4>Evaluation Points (Select Issues)</h4>
    <div className="d-flex flex-column gap-2">
      {[
        "1. Unprofessional communication",
        "2. Wrong parking",
        "3. Irrelevant questions/details",
        "4. No or insufficient follow up done",
        "5. Late response",
      ].map((point, index) => (
        <label key={index} className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            checked={evaluation.evaluationpoints.includes(point)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setEvaluation((prev) => ({
                ...prev,
                evaluationpoints: isChecked
                  ? [...prev.evaluationpoints, point] // Add if checked
                  : prev.evaluationpoints.filter((p) => p !== point), // Remove if unchecked
              }));
            }}
          />
          {point}
        </label>
      ))}
    </div>
  </div>
</div> */}
        <div className="bg-card-color rounded d-flex justify-content-center flex-column">
          <div className="d-flex flex-start p-4">
            <label>
              <h4>Evaluation Summary</h4>
              <label for="evaluationsummary">Other</label>
              <textarea
                class="form-control mt-1"
                id="evaluationsummary"
                placeholder="Your Answer"
                rows="3"
                value={evaluation.evaluationsummary}
                onChange={(e) =>
                  handlerChangeEvl("evaluationsummary", e.target.value)
                }
              ></textarea>
            </label>
          </div>
        </div>

        <div className="p-4">
          <button
            type="button"
            class="btn btn-lg d-flex gap-2 justify-content-center align-content-center"
            style={{ backgroundColor: "#39c449", color: "#fff" }}
            onClick={handlerEscForm}
            disabled={load}
          >
            Submit {load && <BtnLoader />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentForm;
