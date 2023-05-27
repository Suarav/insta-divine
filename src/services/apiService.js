import axios from "axios";
import SchedulePage from "../pages/schedule";

class ApiService {
    BASE_API_URL = "https://insta.divineapi.com";
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

    async authApiUser(data) {
        const body = {
            id: data
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.POST(`/admin/api/v1/auth-api-user`, body, headers)
        return res.data
    }

    async getMedia() {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.GET(`/admin/api/v1/getMedia`, {}, headers)
        return res.data.data
    }

    async saveInstaTemplet(body) {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.POST(`/admin/api/v1/store-insta-saved-template`, body, headers)
        return res.data
    }
    async getTemplet() {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.GET(`/admin/api/v1/list`, {}, headers)
        return res.data.data
    }
    async getTempletData(data) {
        const body = {
            id: data
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
        }

        const res = await this.POST(`/admin/api/v1/get`, body, headers)
        return res.data.data[0]
    }
    async singleSchedulePage(body) {
        const headers = {
            'Content-Type': 'multipart/form-data',
            "Accept": "application/json"
        }
        const res = await this.POST(`/admin/api/v1/single-instgram-scheduler`, body, headers)
        return res.data.data[0]
    }
    async storeInstaSchedule(body) {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.POST(`/admin/api/v1/store-insta-scheduler`, body, headers)
        return res
    }
    async listInstaSchedule(body) {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.POST(`/admin/api/v1/list-insta-scheduler`, body, headers)
        return res.data.data
    }

    async changeStatus(body) {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.POST(`/admin/api/v1/change-status-instgram-scheduler`, body, headers)
        return res
    }


}

export default new ApiService();
