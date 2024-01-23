import axios from "axios";
import { USSD_SERVER_URL } from "../config";

export default class AssociationService {

    static async create(data) {
        try {
            const response = await axios.post(`${USSD_SERVER_URL}/api/association`, data);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async getAll() {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/association`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async delete(id) {
        try {
            const response = await axios.delete(`${USSD_SERVER_URL}/api/association/${id}`);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

}