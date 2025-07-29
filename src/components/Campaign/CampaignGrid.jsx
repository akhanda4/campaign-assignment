import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { columnDefs } from "./CampaignColumnDefs.js";
import { generateMockCampaigns } from "../../Api/Faker.js";
import { useTheme, useThemeUpdate, themeDark } from "../../ContextApi/ThemeContext.jsx";
import Modal from "../Modal/Modal.jsx";
import "common/AggridConfig.js";
import "./Campaign.css";

const CampaignGrid = () => {
  const gridRef = useRef();
  const mockCampaigns = useMemo(() => generateMockCampaigns(50), []);
  const [rowData, setRowData] = useState(mockCampaigns);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  const isDarkTheme = theme === themeDark;
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      floatingFilter: true,
      editable: true,
      minWidth: 200,
      maxWidth: 300,
    }),
    []
  );

  useEffect(() => {
    if (gridRef.current?.api) {
      if (rowData.length === 0) {
        gridRef.current.api.showNoRowsOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [rowData]);

  const onGridReady = (params) => {
    if (!rowData || rowData.length === 0) {
      params.api.showNoRowsOverlay();
    }
  };

  const onCellEditingStopped = useCallback(
    (event) => {
      const updatedData = rowData.map((row) =>
        row.campaignId === event.data.campaignId ? event.data : row
      );
      setRowData(updatedData);
    },
    [rowData]
  );

  const updateOverlayState = () => {
    const api = gridRef.current?.api;
    if (api) {
      if (api.getDisplayedRowCount() === 0) {
        api.showNoRowsOverlay();
      } else {
        api.hideOverlay();
      }
    }
  };

  const handleFilterChanged = () => {
    const api = gridRef.current?.api;
    if (api) {
      updateOverlayState();
    }
  };

  const handleQuickFilter = (e) => {
    const value = e.target.value;
    setQuickFilterText(value);
    gridRef.current.api.setGridOption("quickFilterText", value);
  };

  const handlePaginationChanged = useCallback(() => {
    const api = gridRef.current?.api;
    if (api) {
      api.showLoadingOverlay();
      setTimeout(() => {
        api.hideOverlay();
        updateOverlayState();
      }, 1000);
    }
  }, []);

  const exportToCsv = () => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: 'campaigns.csv',
      });
    }
  };

  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleUpdate = () => {
    let isValid = true;

    switch (editField) {
      case "budget":
      case "spent":
      case "impressions":
      case "clicks":
        if (isNaN(editValue) || editValue.trim() === "") {
          isValid = false;
          alert(`${editField} must be a valid number.`);
        }
        break;

      case "startDate":
      case "endDate":
        if (isNaN(Date.parse(editValue))) {
          isValid = false;
          alert(`${editField} must be a valid date (e.g., DD-MM-YYYY).`);
        }
        break;

      case "status":
        const validStatuses = ["Draft", "Scheduled", "Active", "Completed", "Cancelled"];
        if (!validStatuses.includes(editValue)) {
          isValid = false;
          alert(`${editField} must be one of: ${validStatuses.join(", ")}.`);
        }
        break;
      case "channel":
        const validChannels = ["Email", "Social Media", "Display", "SMS", "Search"];
        if (!validChannels.includes(editValue)) {
          isValid = false;
          alert(`${editField} must be one of: ${validChannels.join(", ")}.`);
        }
        break;

      default:
        break;
    }

    if (!isValid) return;

    const updatedData = rowData.map((row) => {
      if (selectedRows.some((selected) => selected.campaignId === row.campaignId)) {
        return { ...row, [editField]: editValue };
      }
      return row;
    });
    setRowData(updatedData);
    handleModalClose();
  };

  return (
    <div className={`Ag-grid-container`}>
      <div className="theme-toggler">
        <input
          name="theme-toggler"
          type="checkbox"
          onChange={toggleTheme}
        />
        <label htmlFor="theme-toggler">Dark Mode</label>
        <button className="btn-export" onClick={exportToCsv}>Export CSV</button>
        <button
          className="btn-mass-edit"
          onClick={handleModalOpen}
          disabled={selectedRows.length <= 1}
          style={{ marginLeft: "10px" }}
        >
          Mass Edit
        </button>
      </div>

      <input
        type="text"
        className={`${isDarkTheme ? "dark-input" : "light-input"}`}
        placeholder="Search..."
        value={quickFilterText}
        onChange={handleQuickFilter}
        id="quickFilter"
        name="quickFilter"
        style={{ marginBottom: "10px", padding: "5px", font: "inherit" }}
      />

      <AgGridReact
        ref={gridRef}
        theme={theme}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        onCellEditingStopped={onCellEditingStopped}
        animateRows={true}
        onFilterChanged={handleFilterChanged}
        pagination={true}
        rowSelection={"multiple"}
        paginationPageSize={20}
        onPaginationChanged={handlePaginationChanged}
        onSelectionChanged={onSelectionChanged}
      />
      {openModal ? (
        <Modal>
          <div className="modal">
            <div className="modal-content">
              <h3>Mass Edit</h3>
              <label>
                Field to Edit:
                <select
                  value={editField}
                  onChange={(e) => setEditField(e.target.value)}
                >
                  <option value="">Select Field</option>
                  <option value="campaignName">CampaignName</option>
                  <option value="clientName">ClientName</option>
                  <option value="startDate">StartDate</option>
                  <option value="endDate">EndDate</option>
                  <option value="status">Status</option>
                  <option value="budget">Budget</option>
                  <option value="spent">Spent</option>
                  <option value="impressions">Impressions</option>
                  <option value="clicks">Clicks</option>
                  <option value="conversionRate">ConversionRate</option>
                  <option value="channel">Channel</option>
                  <option value="manager">Manager</option>
                  <option value="campaign">Campaign</option>
                  <option value="lastModified">Last Modified</option>
                </select>
              </label>
              <label>
                New Value:
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </label>
              <div className="modal-actions">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleModalClose}>Cancel</button>
              </div>
            </div>
          </div>
        </Modal>
      ) :
        null
      }
    </div>
  );
};

export default CampaignGrid;
