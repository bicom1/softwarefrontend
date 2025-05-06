import React, { useState } from "react";
import { Card } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReportEscalations } from "../features/userApis";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import toast from "react-hot-toast";

const FilterCardEscalations = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");

  const handleDownloadExcel = async () => {
    setLoading(true);
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndtDate = endDate.toISOString().split("T")[0];
      if (new Date(formattedStartDate) > new Date(formattedEndtDate)) {
        toast.error("Start date cannot be later then end date.");
        setLoading(false);
        return;
      }
      const response = await createReportEscalations({
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "Escalations Report");

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

      const response = await createReportEscalations({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
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
      <Card className="p-4 shadow-sm rounded">
        <h4 className="mb-4 text-center">Generate Escalations Report</h4>
        <p className="text-muted text-center">
          Select a date range to download the Escalations report.
        </p>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Select start date"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              minDate={startDate}
              maxDate={new Date()}
              placeholderText="Select end date"
            />
          </div>
          <div className="col-md-6 mb-3">
    <label>Agent Name</label>
    <input
      type="text"
      value={agentName}
      onChange={(e) => setAgentName(e.target.value)}
      className="form-control"
      placeholder="Enter agent name"
    />
  </div>
  <div className="col-md-6 mb-3">
    <label>Team Lead</label>
    <input
      type="text"
      value={teamLeader}
      onChange={(e) => setTeamLeader(e.target.value)}
      className="form-control"
      placeholder="Enter team lead name"
    />
  </div>
        </div>
        <div className="text-center">
          <div className="d-flex gap-5">
            <button
              className="btn btn-primary "
              onClick={handleDownloadPDF}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                  ></span>
                  Downloading...
                </>
              ) : (
                "Export PDF"
              )}
            </button>
            <button
              className="btn btn-success  "
              onClick={handleDownloadExcel}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                  ></span>
                  Downloading...
                </>
              ) : (
                "Export CSV"
              )}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FilterCardEscalations;
