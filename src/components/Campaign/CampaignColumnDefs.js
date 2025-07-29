const comparator = (a, b) => {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

export const columnDefs = [
  {
    headerName: "Campaign ID",
    field: "campaignId",
    filter: "agTextColumnFilter",
    width: 100,
    comparator: comparator,
    valueFormatter: (params) => `#${params.value}`,
    editable: false
  },
  {
    headerName: "Campaign Name",
    field: "campaignName",
    filter: "agTextColumnFilter",
    width: 350,
    comparator: comparator,
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
    editable: false,
    comparator: comparator,
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
    filter: "agTextColumnFilter",
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
  },
];
