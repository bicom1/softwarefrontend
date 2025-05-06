import React, { useState } from "react";
import { Card } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReportEvaluations } from "../features/userApis";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
const FilterCardEvaluations = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [agentName, setAgentName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownloadExecl = async () => {
    setLoading(true);
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndtDate = endDate.toISOString().split("T")[0];
      if (new Date(formattedStartDate) > new Date(formattedEndtDate)) {
        toast.error("Start date cannot be later then end date.");
        setLoading(false);
        return;
      }
      const response = await createReportEvaluations({
        startDate: formattedStartDate,
        endDate: formattedEndtDate,
        agentName: agentName ||"",
        teamleader: teamLeader || "",
      });
      if (response?.status === 404) {
        toast.error(
          response.data.message ||
            "No data available for the selected date range."
        );
        setLoading(false);
        return;
      }

      if (response?.data?.success && response.data.data) {
        const data = response.data.data;

        const filteredData = data.map(({ _id, owner, __v, ...rest }) => rest);

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluations Report");

        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        saveAs(
          blob,
          `Report_${formattedStartDate}_to_${formattedEndtDate}.xlsx`
        );
      } else {
        toast.error("No data available for the selected date range.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      if (new Date(formattedStartDate) > new Date(formattedEndDate)) {
        toast.error("Start date cannot be later than end date.");
        setLoading(false);
        return;
      }

      const response = await createReportEvaluations({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        agentName: agentName || "",
        teamleader: teamLeader || "",
      });
      if (response?.status === 404) {
        toast.error(
          response.data.message ||
            "No data available for the selected date range."
        );
        setLoading(false);
        return;
      }

      if (response?.data?.success && response.data.data) {
        const data = response.data.data;

        const doc = new jsPDF("l", "pt", "a3");

        doc.text("Evaluations Report", 20, 30);

        doc.text(
          `Date Range: ${formattedStartDate} to ${formattedEndDate}`,
          40,
          60
        );

        const tableData = data.map(
          ({ _id, owner, createdAt, updatedAt, __v, ...rest }) =>
            Object.values(rest)
        );
        const tableHeaders = Object.keys(data[0]).filter(
          (key) =>
            key !== "_id" &&
            key !== "owner" &&
            key !== "__v" &&
            key !== "createdAt" &&
            key !== "updatedAt" // Exclude createdAt and updatedAt
        );

        doc.autoTable({
          head: [tableHeaders],
          body: tableData,
          startY: 100,
          styles: {
            cellWidth: "auto",
            cellPadding: 5,
            fontSize: 10,
            fontStyle: "normal",
            overflow: "linebreak",
            lineHeight: 1.4,
          },
        });
        doc.save(`Report_${formattedStartDate}_to_${formattedEndDate}.pdf`);
      } else {
        toast.error("No data available for the selected date range.");
      }
    } catch (error) {
      toast.error("An error occurred while generating the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Card className="p-3 p-md-4 shadow-sm rounded-lg">
  <div className="text-center mb-4">
    <h4 className="mb-2">Generate Evaluation Report</h4>
    <p className="text-muted mb-0">
      Select a date range to download the Evaluation report
    </p>
  </div>

  <div className="row g-3">
    {/* Date Pickers */}
    <div className="col-12 col-md-6">
      <label htmlFor="startDate" className="form-label">
        Start Date
      </label>
      <DatePicker
        id="startDate"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="form-control"
        dateFormat="yyyy-MM-dd"
        maxDate={new Date()}
        placeholderText="Select start date"
        aria-label="Select start date"
      />
    </div>
    
    <div className="col-12 col-md-6">
      <label htmlFor="endDate" className="form-label">
        End Date
      </label>
      <DatePicker
        id="endDate"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        className="form-control"
        dateFormat="yyyy-MM-dd"
        minDate={startDate}
        maxDate={new Date()}
        placeholderText="Select end date"
        aria-label="Select end date"
      />
    </div>

    {/* Agent and Team Lead Fields */}
    <div className="col-12 col-md-6">
      <label htmlFor="agentName" className="form-label">
        Agent Name
      </label>
      <input
        id="agentName"
        type="text"
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
        className="form-control"
        placeholder="Enter agent name"
        aria-label="Agent name"
      />
    </div>
    
    <div className="col-12 col-md-6">
      <label htmlFor="teamLeader" className="form-label">
        Team Lead
      </label>
      <input
        id="teamLeader"
        type="text"
        value={teamLeader}
        onChange={(e) => setTeamLeader(e.target.value)}
        className="form-control"
        placeholder="Enter team lead name"
        aria-label="Team lead name"
      />
    </div>
  </div>

  {/* Buttons - Responsive Layout */}
  <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 gap-sm-5 mt-4">
    <button
      className="btn btn-primary flex-grow-1 flex-sm-grow-0"
      onClick={handleDownloadPDF}
      disabled={loading}
      aria-label="Export PDF"
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Downloading...
        </>
      ) : (
        "Export PDF"
      )}
    </button>
    
    <button
      className="btn btn-success flex-grow-1 flex-sm-grow-0"
      onClick={handleDownloadExecl}
      disabled={loading}
      aria-label="Export CSV"
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Downloading...
        </>
      ) : (
        "Export CSV"
      )}
    </button>
  </div>
  </Card>
    </>
  );
};

export default FilterCardEvaluations;
