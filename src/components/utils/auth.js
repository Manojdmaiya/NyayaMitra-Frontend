import axios from "axios";
import { getCookie } from "./common-function";

export const checkAuthorization = async (endpoint) => {
    const authToken = getCookie("authToken");

    try {
        const response = await axios.get(`https://nyayamitra-backend-dev.onrender.com${endpoint}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authToken}`,
            }
        });

        return response.status === 202;
    } catch (error) {
        console.log(error)
        return false;
    }
};
