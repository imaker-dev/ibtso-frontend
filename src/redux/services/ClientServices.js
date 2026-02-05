import Api from '../api.js';

export default false
    ? {
        message: "You are Offline. Please turn on the internet",
    }
    : {
        // Admin APIs - manage all clients
        getAllClientsApi: () => {
            return Api.get("/clients");
        },
        createClientApi:(values) => {
            return Api.post(`/clients`,values)
        },
        updateClientApi:(id,values) => {
            return Api.put(`/clients/${id}`,values)
        },
        getClientByIdApi:(id) => {
            return Api.get(`/clients/${id}`)
        },
        downloadClientAllBarcodeApi: (clientId, startDate, endDate) => {
            let url = `/barcodes/client/${clientId}/download-pdf`;

            const params = new URLSearchParams();

            if (startDate) {
              params.append("startDate", startDate);
            }

            if (endDate) {
              params.append("endDate", endDate);
            }

            if (params.toString()) {
              url += `?${params.toString()}`;
            }

            return Api.get(url, { responseType: "blob" });
        },
        
        // Client self-service APIs
        getClientDashboardStatsApi: () => {
            return Api.get("/dashboard/client");
        },
        getClientAssetsApi: (params) => {
            return Api.get("/assets/client/me", { params });
        },
        updateClientProfileApi: (values) => {
            return Api.put("/clients/me/profile", values);
        },
        changeClientPasswordApi: (values) => {
            return Api.put("/clients/me/change-password", values);
        }
    };
