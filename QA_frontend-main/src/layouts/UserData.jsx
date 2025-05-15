import React, { useEffect, useState } from "react";
import { summonUserData } from "../features/userApis";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardBody, Table, Button } from "reactstrap"; // Import Spinner
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { BallTriangle } from "react-loader-spinner";

const UserData = () => {
  const param = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const rowsPerPage = 10;
  const rowsPerPages = 20;

  const id = param.id;
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [20, 20],
  });

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true); 
      try {
        const { data } = await summonUserData(id);
        // console.log(data);
        if (data) {
          const twoDaysAgoEsclations = moment().subtract(30, "days");

          const filteredEscalations = data.esc?.filter(
            (record) =>
              record?.createdAt &&
              moment(record.createdAt).isAfter(twoDaysAgoEsclations)
          );

          const twoDaysAgoEvaluations = moment().subtract(10, "days");

          const filteredEvaluations = data.ev?.filter(
            (record) =>
              record?.createdAt &&
              moment(record.createdAt).isAfter(twoDaysAgoEvaluations)
          );

          setData({
            ...data,
            esc: filteredEscalations,
            ev: filteredEvaluations,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    getUserData();
  }, [id]);

  const handlerExport = (e) => {
    e.preventDefault();
    doc.autoTable({ html: "#user-report-escalation" });
    doc.autoTable({ html: "#user-report-evaluation" });
    doc.save(`${param.name}_report_${formattedDate}.pdf`);
  };

  const totalEscalationRecords = data?.esc?.length || 0;
  const totalEvaluationRecords = data?.ev?.length || 0;

  const totalEscalationPages = Math.ceil(totalEscalationRecords / rowsPerPage);
  const totalEvaluationPages = Math.ceil(totalEvaluationRecords / rowsPerPages);

  const currentEscalationRecords = data?.esc?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const currentEvaluationRecords = data?.ev?.slice(
    (currentPages - 1) * rowsPerPages,
    currentPages * rowsPerPages
  );

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalEscalationPages) {
      setCurrentPage(pageNumber);
    }
  };

  const changePages = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalEvaluationPages) {
      setCurrentPages(pageNumber);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center my-3">
        <Button onClick={handlerExport} color="primary">
          Export PDF
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="d-flex justify-content-center">
            <BallTriangle
              height={500}
              width={500}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              className="mx-auto"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>

          <h1>Loading data...</h1>
        </div>
      ) : (
        <>
          {totalEvaluationRecords > 0 && (
            <div className="mb-5">
              <Card>
                <CardTitle tag="h6" className="p-3 border-bottom mb-0 fw-bold">
                  Evaluations ({totalEvaluationRecords})
                </CardTitle>
                <CardBody>
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      bordered
                      id="user-report-evaluation"
                      className="table table-striped text-capitalize"
                      style={{ minWidth: "900px" }}
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Email</th>
                          <th>Lead ID</th>
                          <th>Agent Name</th>
                          <th>Team Leader</th>
                          <th>Mode of Communication</th>
                          <th>Greetings</th>
                          <th>Accuracy</th>
                          <th>Building Rapport</th>
                          <th>Presenting Solutions</th>
                          <th>Call Closing</th>
                          <th>Bonus Point</th>
                          {/* <th>evaluationpoints</th> */}
                          <th>Evaluation Summary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEvaluationRecords.map((val, index) => (
                          <tr key={index}>
                            <th scope="row">
                              {(currentPages - 1) * rowsPerPages + index + 1}
                            </th>
                            <td>{val?.useremail}</td>
                            <td>{val?.leadID}</td>
                            <td>{val?.agentName}</td>
                            <td>{val?.teamleader}</td>
                            <td>{val?.mod}</td>
                            <td>{val?.greetings}</td>
                            <td>{val?.accuracy}</td>
                            <td>{val?.building}</td>
                            <td>{val?.presenting}</td>
                            <td>{val?.closing}</td>
                            <td>{val?.bonus}</td>
                            <td>{val?.evaluationsummary}</td>
                            {/* <td>
  {val?.evaluationpoints?.length > 0 ? (
    val.evaluationpoints.map((point, i) => (
      <span key={i}>
        {point}
        <br /> 
      </span>
    ))
  ) : (
    "N/A"
  )}
</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pagination
                    currentPage={currentPages}
                    totalPages={totalEvaluationPages}
                    onPageChange={changePages}
                  />
                </CardBody>
              </Card>
            </div>
          )}
          {totalEscalationRecords > 0 && (
            <div className="mb-5">
              <Card>
                <CardTitle tag="h6" className="p-3 border-bottom mb-0 fw-bold">
                  Escalations ({totalEscalationRecords})
                </CardTitle>
                <CardBody>
                  <div style={{ overflowX: "auto" }}>
                    <Table
                      bordered
                      id="user-report-escalation"
                      className="table table-striped text-capitalize"
                      style={{ minWidth: "900px" }}
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Email</th>
                          <th>Lead ID</th>
                          <th>Evaluated by</th>
                          <th>Agent Name</th>
                          <th>Team Leader</th>
                          <th>Lead Source</th>
                          <th>User Rating</th>
                          <th>Lead Status</th>
                          <th>Escalation Severity</th>
                          <th>Issue Identification</th>
                          <th>Escalation Action</th>
                          <th>Additional Information</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEscalationRecords.map((val, index) => (
                          <tr key={index}>
                            <th scope="row">
                              {(currentPage - 1) * rowsPerPage + index + 1}
                            </th>
                            <td>{val?.useremail}</td>
                            <td>{val?.leadID}</td>
                            <td>{val?.evaluatedby}</td>
                            <td>{val?.agentName}</td>
                            <td>{val?.teamleader}</td>
                            <td>{val?.leadsource}</td>
                            <td>{val?.userrating}</td>
                            <td>{val?.leadstatus}</td>
                            <td>{val?.escalationseverity}</td>
                            <td>{val?.issueidentification}</td>
                            <td>{val?.escalationaction}</td>
                            <td>{val?.additionalsuccessrmation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalEscalationPages}
                    onPageChange={changePage}
                  />
                </CardBody>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    const windowSize = 2;
    
    let start = Math.max(1, currentPage - windowSize);
    let end = Math.min(totalPages, currentPage + windowSize);

    if (currentPage <= windowSize + 1) {
      end = Math.min(2 * windowSize + 1, totalPages);
    }
    if (currentPage >= totalPages - windowSize) {
      start = Math.max(1, totalPages - 2 * windowSize);
    }

    if (start > 1) {
      visiblePages.push(1);
      if (start > 2) {
        visiblePages.push('...');
      }
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        visiblePages.push('...');
      }
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            &laquo; Previous
          </button>
        </li>
        
        {visiblePages.map((page, index) => (
          <li 
            key={index}
            className={`page-item ${page === '...' ? 'disabled' : ''} ${currentPage === page ? 'active' : ''}`}
          >
            {page === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <button 
                className="page-link" 
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserData;
