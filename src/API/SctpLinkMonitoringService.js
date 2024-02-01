import axios from "axios";
import { USSD_SERVER_URL } from "../config";

export default class SctpLinkMonitoringService {

    static async getByIdAndMinutes(id, minutes) {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/sctp/monitoring/minutes/${minutes}/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getByIdAndHours(id, hours) {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/sctp/monitoring/hours/${hours}/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getByIdAndDays(id, days) {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/sctp/monitoring/days/${days}/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getByIdAndWeeks(id, weeks) {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/sctp/monitoring/weeks/${weeks}/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getByIdAndMonth(id, months) {
        try {
            const response = await axios.get(`${USSD_SERVER_URL}/api/sctp/monitoring/months/${months}/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

}