import Api from '../api.js';

export default false
    ? {
        message: "You are Offline. Please turn on the internet",
    }
    : {
        getAllClientsApi: () => {
            return Api.get("/clients", );
        },
        createClientApi:(values) => {
            return Api.post(`/clients`,values)
        },
        updateClientApi:(id,values) => {
            return Api.put(`/clients/${id}`,values)
        },
        getClientByIdApi:(id) => {
            return Api.get(`/clients/${id}`)
        }
    };
