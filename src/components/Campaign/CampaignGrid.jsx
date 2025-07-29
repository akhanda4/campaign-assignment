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
import { useTheme, useThemeUpdate } from "../../ContextApi/ThemeContext.jsx";
import "common/AggridConfig.js";
import "./Campaign.css";

const CampaignGrid = () => {
  const gridRef = useRef();
  const mockCampaigns = useMemo(() => generateMockCampaigns(500), []);
  const [rowData, setRowData] = useState(mockCampaigns);
  const [quickFilterText, setQuickFilterText] = useState("");

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

  const handleFilterChanged = () => {
    setTimeout(() => {
      const api = gridRef.current.api;
      if (api.getDisplayedRowCount() === 0) {
        api.showNoRowsOverlay();
      } else {
        api.hideOverlay();
      }
    }, 0);
  };

  const handleQuickFilter = (e) => {
    const value = e.target.value;
    setQuickFilterText(value);
    gridRef.current.api.setGridOption("quickFilterText", value);
  };

  return (
    <div className={`Ag-grid-container`}>
      <div className="theme-toggler">
        <input
          name="theme-toggler"
          type="checkbox"
          onChange={useThemeUpdate()}
        />
        <label htmlFor="theme-toggler">Dark Mode</label>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={quickFilterText}
        onChange={handleQuickFilter}
        id="quickFilter"
        name="quickFilter"
        style={{ marginBottom: "10px", padding: "5px", font: "inherit" }}
      />

      <AgGridReact
        ref={gridRef}
        theme={useTheme()}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        onCellEditingStopped={onCellEditingStopped}
        animateRows={true}
        onFilterChanged={handleFilterChanged}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default CampaignGrid;
