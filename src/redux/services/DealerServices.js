import Api from "../api.js";

export default false
  ? {
      message: "You are Offline. Please turn on the internet",
    }
  : {
      getAllDealersApi: () => {
        return Api.get("/dealers");
      },
      getDealerByIdApi:(id) => {
        return Api.get(`/dealers/${id}`)
      },
      createDealerApi:(values) => {
        return Api.post('/dealers',values)
      },
      updateDealerApi:(id,values) => {
        return Api.put(`/dealers/${id}`,values)
      },
      deleteDealerApi:(id) => {
        return Api.delete(`/dealers/${id}`)
      },
      toggleDealerStatusApi:(id) => {
        return Api.patch(`/dealers/${id}/toggle-status`)
      },
      downloadDealerAllBarcodeApi:(id) => {
        return Api.get(`/barcodes/dealer/${id}/download-pdf`,{responseType:"blob"})
      }
    };
