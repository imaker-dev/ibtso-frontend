import Api from '../api.js';

export default false
    ? {
        message: "You are Offline. Please turn on the internet",
    }
    : {
        getAllBrandsApi: () => {
            return Api.get("/brands", );
        },
        createBrandApi:(values) => {
            return Api.post(`/brands`,values)
        }
    };
