import axios from "axios";
import { USSD_SERVER_URL } from "../config";

export default class SctpLinkService {

    static async create(data) {
        try {
            const response = await axios.post(`${USSD_SERVER_URL}/api/sctp`, data);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async start(id) {
        try {
            const response = await axios.put(`${USSD_SERVER_URL}/api/sctp/start/${id}`);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async restart(id) {
        try {
            const response = await axios.put(`${USSD_SERVER_URL}/api/sctp/restart/${id}`);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async stop(id) {
        try {
            const response = await axios.put(`${USSD_SERVER_URL}/api/sctp/stop/${id}`);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async getAll() {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/sctp`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async update(id, data) {
        try {
            const response = await axios.put(`${USSD_SERVER_URL}/api/sctp/${id}`, data);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    static async delete(id) {
        try {
            const response = await axios.delete(`${USSD_SERVER_URL}/api/sctp/${id}`);
            return response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

}