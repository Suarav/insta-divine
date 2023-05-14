import axios from "axios";

class ApiService {
    BASE_API_URL = "";
    reqQueue = {};
    constructor() { }
    async GET(path, h = {}) {
        try {
            const headers = {
                headers: h,
            };
            const res = await axios.get(this.BASE_API_URL + path, headers);
            return { data: res.data, error: null };
        } catch (error) {
            return { data: null, error: error.data };
        }
    }

    async POST(path, data, h = {}) {
        try {
            const headers = {
                headers: h,
            };
            const res = await axios.post(this.BASE_API_URL + path, data, headers);
            return { data: res.data, error: null };
        } catch (error) {
            return { data: null, error: error.data };
        }
    }


}

export default new ApiService();
