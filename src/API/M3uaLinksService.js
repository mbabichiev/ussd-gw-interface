import axios from "axios";
import { USSD_SERVER_URL } from "../config";

export default class M3uaLinkService {

    static async create(data) {
        try {
            const response = await axios.post(`${USSD_SERVER_URL}/api/m3ua`, data);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async getAll() {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/m3ua`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async update(id, data) {
        try {
            const response = await axios.put(`${USSD_SERVER_URL}/api/m3ua/${id}`, data);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async delete(id) {
        try {
            const response = await axios.delete(`${USSD_SERVER_URL}/api/m3ua/${id}`);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
}