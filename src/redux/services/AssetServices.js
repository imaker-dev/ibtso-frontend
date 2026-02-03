import Api from "../api.js";

export default false
  ? {
      message: "You are Offline. Please turn on the internet",
    }
  : {
      getAllAssetsApi: (search) => {
        const trimmed = search?.trim();
        return Api.get(
          "/assets",
          trimmed ? { params: { search: trimmed } } : {},
        );
      },
      getAssetByIdApi: (id) => {
        return Api.get(`/assets/${id}`);
      },
      createAssetApi: (values) => {
        return Api.post("/assets", values);
      },
      updateAssetApi: (id, values) => {
        return Api.put(`/assets/${id}`, values);
      },
      deleteAssetApi: (id) => {
        return Api.delete(`/assets/${id}`);
      },
      downloadAssetById: (id) => {
        return Api.get(`/barcodes/download-qr/${id}`, { responseType: "blob" });
      },
      downloadMultipleAssetById: (values) => {
        return Api.post(
          `/barcodes//download-multiple-qr`,
          { assetIds: values },
          { responseType: "blob" },
        );
      },
    };
