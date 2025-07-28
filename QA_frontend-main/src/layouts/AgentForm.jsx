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
    reason:"",
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

<<<<<<< Updated upstream
=======
  const validateForm = () => {
    const newErrors = {};
    if (!evaluation.leadId.trim()) newErrors.leadId = "Lead ID is required";
    if (!evaluation.agentName.trim()) newErrors.agentName = "Agent name is required";
    if (!evaluation.mod) newErrors.mod = "Mode is required";
    if (!evaluation.reason) newErrors.reason = "Reason is required";
    if (!evaluation.teamleader) newErrors.teamleader = "Team leader is required";
    if (!evaluation.greetings) newErrors.greetings = "Greetings rating is required";
    if (!evaluation.accuracy) newErrors.accuracy = "Accuracy rating is required";
    if (!evaluation.building) newErrors.building = "Building rating is required";
    if (!evaluation.presenting) newErrors.presenting = "Presenting rating is required";
    if (!evaluation.closing) newErrors.closing = "Closing rating is required";
    if (!evaluation.bonus) newErrors.bonus = "Bonus rating is required";
    if (!evaluation.evaluationsummary.trim()) newErrors.evaluationsummary = "Summary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

>>>>>>> Stashed changes
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
          reason:"",
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
<<<<<<< Updated upstream
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
=======
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white text-center py-3">
              <h1 className="fw-bolder mb-0">BI COMM</h1>
              <h3 className="mb-0">Evaluation Form</h3>
            </div>
            
            <div className="card-body">
              {/* User Info Section */}
              <div className="mb-4">
                <h4 className="mb-3 border-bottom pb-2">Basic Information</h4>
                
                <FormGroup className="mb-3">
                  <Label for="email">Your Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email Here"
                    value={evaluation.email}
                    readOnly
                    className="bg-light"
                  />
                </FormGroup>
                
                <FormGroup className="mb-3">
                  <Label for="leadId">Lead ID <span className="text-danger">*</span></Label>
                  <Input
                    type="text"
                    id="leadId"
                    placeholder="Enter Lead ID Here"
                    value={evaluation.leadId}
                    onChange={(e) => handlerChangeEvl("leadId", e.target.value)}
                    invalid={!!errors.leadId}
                  />
                  <FormFeedback>{errors.leadId}</FormFeedback>
                </FormGroup>
                
                <FormGroup className="mb-3">
                  <Label for="agentName">Agent Name <span className="text-danger">*</span></Label>
                  <Input
                    type="text"
                    id="agentName"
                    placeholder="Enter Agent Name Here"
                    value={evaluation.agentName}
                    onChange={(e) => handlerChangeEvl("agentName", e.target.value)}
                    invalid={!!errors.agentName}
                  />
                  <FormFeedback>{errors.agentName}</FormFeedback>
                </FormGroup>
              </div>
              
              {/* Team Leader Section */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0 border-bottom pb-2">Team Leader <span className="text-danger">*</span></h4>
                  {user.role === "admin" && (
                    <LeadModel setFetchLatestUser={setFetchLatestUser} />
                  )}
                </div>
                
                {leaders?.data?.data?.length <= 0 ? (
                  <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="list-group">
                    {leaders?.data?.data?.map((val, index) => (
                      <div className="list-group-item" key={index}>
                        <div className="d-flex justify-content-between align-items-center">
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="teamleader"
                                value={val.leadName}
                                checked={evaluation.teamleader === val.leadName}
                                onChange={(e) => handlerChangeEvl("teamleader", e.target.value)}
                              />
                              <span className="ms-2">{val.leadName}</span>
                            </Label>
                          </FormGroup>
                          {user.role === "admin" && (
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handlerDel(val._id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {errors.teamleader && <div className="text-danger small mt-1">{errors.teamleader}</div>}
              </div>
              
              {/* Communication Mode */}
              <div className="mb-4">
                <h4 className="mb-3 border-bottom pb-2">Mode of Communication <span className="text-danger">*</span></h4>
                <div className="d-flex gap-4">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="mod"
                        value="Chat"
                        checked={evaluation.mod === "Chat"}
                        onChange={(e) => handlerChangeEvl("mod", e.target.value)}
                      />
                      <span className="ms-2">Chat</span>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="mod"
                        value="Call"
                        checked={evaluation.mod === "Call"}
                        onChange={(e) => handlerChangeEvl("mod", e.target.value)}
                      />
                      <span className="ms-2">Call</span>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="mod"
                        value="Both"
                        checked={evaluation.mod === "Both"}
                        onChange={(e) => handlerChangeEvl("mod", e.target.value)}
                      />
                      <span className="ms-2">Both</span>
                    </Label>
                  </FormGroup>
                </div>
                {errors.mod && <div className="text-danger small mt-1">{errors.mod}</div>}
              </div>
              {/* Reason Section */}
              <div className="mb-4">
  <h4 className="mb-3 border-bottom pb-2">
    Reason <span className="text-danger">*</span>
  </h4>
  <div className="d-flex flex-wrap gap-4">
    <FormGroup check>
      <Label check>
        <Input
          type="radio"
          name="reason"
          value="Irrelevant Response"
          checked={evaluation.reason === "Irrelevant Response"}
          onChange={(e) => handlerChangeEvl("reason", e.target.value)}
        />
        <span className="ms-2">Irrelevant Response</span>
      </Label>
    </FormGroup>

    <FormGroup check>
      <Label check>
        <Input
          type="radio"
          name="reason"
          value="No Booking Approach"
          checked={evaluation.reason === "No Booking Approach"}
          onChange={(e) => handlerChangeEvl("reason", e.target.value)}
        />
        <span className="ms-2">No Booking Approach</span>
      </Label>
    </FormGroup>

    <FormGroup check>
      <Label check>
        <Input
          type="radio"
          name="reason"
          value="Concern Handling"
          checked={evaluation.reason === "Concern Handling"}
          onChange={(e) => handlerChangeEvl("reason", e.target.value)}
        />
        <span className="ms-2">Concern Handling</span>
      </Label>
    </FormGroup>

    <FormGroup check className="w-100">
      <Label check>
        <Input
          type="radio"
          name="reason"
          value="Other"
          checked={evaluation.reason === "Other"}
          onChange={(e) => handlerChangeEvl("reason", e.target.value)}
        />
        <span className="ms-2">Other</span>
      </Label>

      {evaluation.reason === "Other" && (
        <Input
          type="text"
          className="mt-2 ms-4 w-75"
          placeholder="Please specify..."
          value={evaluation.otherReason || ""}
          onChange={(e) => handlerChangeEvl("otherReason", e.target.value)}
        />
      )}
    </FormGroup>
  </div>

  {errors.reason && <div className="text-danger small mt-1">{errors.reason}</div>}
</div>

              
              {/* Evaluation Sections */}
              <div className="mb-4">
                
                {/* Greetings */}
                <div className="mb-4">
                  <h3>Greetings <span className="text-danger">*</span></h3>
                  <p className="text-muted">Demonstrates enthusiasm and a positive tone throughout the call.</p>
                  
                  <CustomRadio
                    id="greeting-positive"
                    name="greetings"
                    value="Uses a professional and friendly Greeting"
                    checked={evaluation.greetings === "Uses a professional and friendly Greeting"}
                    onChange={(e) => {
                      handlerChangeEvl("greetings", e.target.value);
                      setUseRate((pre) => ({ ...pre, greeting: { rateVal: 16 } }));
                    }}
                    label="Uses a professional and friendly greeting within the first 3 seconds, including the company name and their own name"
                  />
                  
                  <CustomRadio
                    id="greeting-negative"
                    name="greetings"
                    value="Not upto the mark"
                    checked={evaluation.greetings === "Not upto the mark"}
                    onChange={(e) => {
                      handlerChangeEvl("greetings", e.target.value);
                      setUseRate((pre) => ({ ...pre, greeting: { rateVal: 0 } }));
                    }}
                    label="Not upto the mark"
                  />
                  {errors.greetings && <div className="text-danger small mt-1">{errors.greetings}</div>}
                </div>
                
                {/* Accuracy & Compliance */}
                <div className="mb-4">
                  <h3>Accuracy & Compliance <span className="text-danger">*</span></h3>
                  <p className="text-muted">Provides accurate and up-to-date information about the company's products or services, adhering to all relevant scripts and policies.</p>
                  
                  <CustomRadio
                    id="accuracy-positive"
                    name="accuracy"
                    value="Asks clear and concise questions"
                    checked={evaluation.accuracy === "Asks clear and concise questions"}
                    onChange={(e) => {
                      handlerChangeEvl("accuracy", e.target.value);
                      setUseRate((pre) => ({ ...pre, accuracy: { rateVal: 16 } }));
                    }}
                    label="Asks clear and concise questions to accurately identify the customer's needs or inquiries."
                  />
                  
                  <CustomRadio
                    id="accuracy-negative"
                    name="accuracy"
                    value="Not upto the mark"
                    checked={evaluation.accuracy === "Not upto the mark"}
                    onChange={(e) => {
                      handlerChangeEvl("accuracy", e.target.value);
                      setUseRate((pre) => ({ ...pre, accuracy: { rateVal: 0 } }));
                    }}
                    label="Not upto the mark"
                  />
                  {errors.accuracy && <div className="text-danger small mt-1">{errors.accuracy}</div>}
                </div>
                
                {/* Building Rapport & Discovery */}
                <div className="mb-4">
                  <h3>Building Rapport & Discovery <span className="text-danger">*</span></h3>
                  <p className="text-muted">Identifies potential pain points or opportunities where the product/service can provide value to the customer.</p>
                  
                  <CustomRadio
                    id="building-positive"
                    name="building"
                    value="Demonstrates Active Listening Skills"
                    checked={evaluation.building === "Demonstrates Active Listening Skills"}
                    onChange={(e) => {
                      handlerChangeEvl("building", e.target.value);
                      setUseRate((pre) => ({ ...pre, building: { rateVal: 16 } }));
                    }}
                    label="Demonstrates active listening skills and asks open-ended questions to understand the customer's needs and potential interest in the product/service."
                  />
                  
                  <CustomRadio
                    id="building-negative"
                    name="building"
                    value="Not Upto The Mark"
                    checked={evaluation.building === "Not Upto The Mark"}
                    onChange={(e) => {
                      handlerChangeEvl("building", e.target.value);
                      setUseRate((pre) => ({ ...pre, building: { rateVal: 0 } }));
                    }}
                    label="Not upto the mark"
                  />
                  {errors.building && <div className="text-danger small mt-1">{errors.building}</div>}
                </div>
                
                {/* Presenting Solutions & Making the Sale */}
                <div className="mb-4">
                  <h3>Presenting Solutions & Making the Sale <span className="text-danger">*</span></h3>
                  <p className="text-muted">Clearly and concisely presents the product/service features and benefits tailored to the customer's needs identified earlier.</p>
                  
                  <CustomRadio
                    id="presenting-positive"
                    name="presenting"
                    value="Attempts to overcome objections professionally"
                    checked={evaluation.presenting === "Attempts to overcome objections professionally"}
                    onChange={(e) => {
                      handlerChangeEvl("presenting", e.target.value);
                      setUseRate((pre) => ({ ...pre, presenting: { rateVal: 16 } }));
                    }}
                    label="Attempts to overcome objections professionally using established techniques and effectively guides the customer towards booking an appointment."
                  />
                  
                  <CustomRadio
                    id="presenting-negative"
                    name="presenting"
                    value="Not upto the mark"
                    checked={evaluation.presenting === "Not upto the mark"}
                    onChange={(e) => {
                      handlerChangeEvl("presenting", e.target.value);
                      setUseRate((pre) => ({ ...pre, presenting: { rateVal: 0 } }));
                    }}
                    label="Not upto the mark"
                  />
                  {errors.presenting && <div className="text-danger small mt-1">{errors.presenting}</div>}
                </div>
                
                {/* Call Closing & Securing Commitment */}
                <div className="mb-4">
                  <h3>Call Closing & Securing Commitment <span className="text-danger">*</span></h3>
                  <p className="text-muted">Confirms the customer's details and secures their commitment for the sale or appointment. Thanks the customer for their time and offers further assistance if needed.</p>
                  
                  <CustomRadio
                    id="closing-positive"
                    name="closing"
                    value="Professionally summarizes key points"
                    checked={evaluation.closing === "Professionally summarizes key points"}
                    onChange={(e) => {
                      handlerChangeEvl("closing", e.target.value);
                      setUseRate((pre) => ({ ...pre, closing: { rateVal: 16 } }));
                    }}
                    label="Professionally summarizes key points discussed and clearly outlines the next steps, including the call to action (e.g., callback, appointment booking)."
                  />
                  
                  <CustomRadio
                    id="closing-negative"
                    name="closing"
                    value="Not upto the mark"
                    checked={evaluation.closing === "Not upto the mark"}
                    onChange={(e) => {
                      handlerChangeEvl("closing", e.target.value);
                      setUseRate((pre) => ({ ...pre, closing: { rateVal: 0 } }));
                    }}
                    label="Not upto the mark"
                  />
                  {errors.closing && <div className="text-danger small mt-1">{errors.closing}</div>}
                </div>
                
                {/* Bonus Point */}
                <div className="mb-4">
                  <h3>Bonus Point <span className="text-danger">*</span></h3>
                  
                  <CustomRadio
                    id="bonus-positive"
                    name="bonus"
                    value="Goes above and beyond by exceeding customer"
                    checked={evaluation.bonus === "Goes above and beyond by exceeding customer"}
                    onChange={(e) => {
                      handlerChangeEvl("bonus", e.target.value);
                      setUseRate((pre) => ({ ...pre, bonus: { rateVal: 16 } }));
                    }}
                    label="Goes above and beyond by exceeding customer expectations, offering additional solutions, demonstrating exceptional product knowledge, or successfully overcoming a significant objection."
                  />
                  
                  <CustomRadio
                    id="bonus-negative"
                    name="bonus"
                    value="Not upto the mark"
                    checked={evaluation.bonus === "Not upto the mark"}
                    onChange={(e) => {
                      handlerChangeEvl("bonus", e.target.value);
                      setUseRate((pre) => ({ ...pre, bonus: { rateVal: 0 } }));
                    }}
                    label="Not upto the mark"
                  />
                  {errors.bonus && <div className="text-danger small mt-1">{errors.bonus}</div>}
                </div>
              </div>
              
              {/* Evaluation Summary */}
              <div className="mb-4">
                <h4 className="mb-3 border-bottom pb-2">Evaluation Summary <span className="text-danger">*</span></h4>
                <FormGroup>
                  <Label for="evaluationsummary">Additional Comments</Label>
                  <Input
                    type="textarea"
                    id="evaluationsummary"
                    placeholder="Enter your evaluation summary here..."
                    rows="4"
                    value={evaluation.evaluationsummary}
                    onChange={(e) => handlerChangeEvl("evaluationsummary", e.target.value)}
                    invalid={!!errors.evaluationsummary}
                  />
                  <FormFeedback>{errors.evaluationsummary}</FormFeedback>
                </FormGroup>
              </div>
              
              {/* Rating Summary
              <div className="mb-4 p-3 bg-light rounded">
                <h5 className="mb-3">Rating Summary</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-medium">Total Score:</span>
                  <span className="badge bg-primary fs-5">{evaluation.rating} / 96</span>
                </div>
              </div> */}
              
              {/* Submit Button */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-5 py-2"
                  onClick={handlerEscForm}
                  disabled={load}
                >
                  {load ? (
                    <>
                      <BtnLoader /> Submitting...
                    </>
                  ) : (
                    "Submit Evaluation"
                  )}
                </button>
              </div>
            </div>
>>>>>>> Stashed changes
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
