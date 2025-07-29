function comparator(valueA, valueB) {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
}

export const columnDefs = [
  {
    headerName: "Campaign ID",
    field: "campaignId",
    filter: "agTextColumnFilter",
    width: 100,
    comparator: comparator,
  },
  {
    headerName: "Campaign Name",
    field: "campaignName",
    filter: "agTextColumnFilter",
    width: 350,
    comparator: (valueA, valueB) =>
      valueA.toLowerCase().localeCompare(valueB.toLowerCase()),
  },
  {
    headerName: "Client Name",
    field: "clientName",
    filter: "agTextColumnFilter",
    comparator: comparator,
  },
  {
    headerName: "Start Date",
    field: "startDate",
    filter: "agDateColumnFilter",
  },
  {
    headerName: "End Date",
    field: "endDate",
    filter: "agDateColumnFilter",
  },
  {
    headerName: "Status",
    field: "status",
    filterParams: {
      values: ["Completed", "Active", "Scheduled", "Draft", "Cancelled"],
    },
    editable: false,
  },
  {
    headerName: "Budget ($)",
    field: "budget",
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
  },
  {
    headerName: "Spent ($)",
    field: "spent",
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => `$${Number(params.value).toLocaleString()}`,
  },
  {
    headerName: "Impressions",
    field: "impressions",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Clicks",
    field: "clicks",
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Conversion Rate (%)",
    field: "conversionRate",
    valueGetter: (params) => {
      const { clicks, impressions } = params.data;
      return impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
    },
    valueFormatter: (params) => `${params.value}%`,
  },
  {
    headerName: "Channel",
    field: "channel",
    comparator: comparator,
  },
  {
    headerName: "Manager",
    field: "manager",
    comparator: comparator,
  },
  {
    headerName: "Thumbnail",
    field: "thumbnail",
    cellRenderer: (params) => (
      <img src={params.value} className="thumbnail" alt="Thumbnail" />
    ),
    sortable: false,
    filter: false,
    editable: false,
  },
  {
    headerName: "Last Modified",
    field: "lastModified",
    filter: "agDateColumnFilter",
    cellEditor: "agDatePicker",
    cellEditorParams: {
      // Optionally set min/max dates or format
      min: "2020-01-01",
      max: "2030-12-31",
      format: "dd-MM-yyyy",
    },
  },
];
