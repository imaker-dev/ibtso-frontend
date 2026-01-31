import Api from '../api.js';

export default false
    ? {
        message: "You are Offline. Please turn on the internet",
    }
    : {
        signinApi: (values) => {
            return Api.post("/auth/login", values);
        },
        getMeDataApi:() => {
            return Api.get(`/auth/me`)
        }
    };
