import Api from "../api.js";

const BarcodeReportServices = {
  getBarcodeViewSummaryApi: (params = {}) => {
    return Api.get("/barcodes/reports/views/summary", { params });
  },
  getBarcodeViewAssetsApi: (params = {}) => {
    return Api.get("/barcodes/reports/views/assets", { params });
  },
};

export default BarcodeReportServices;
