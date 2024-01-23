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

}