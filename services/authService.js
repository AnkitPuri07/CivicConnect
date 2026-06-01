import axios from "axios";

const API =
    "http://localhost:8080";

export const registerUser = async (
    userData
) => {

    const response =
        await axios.post(
            `${API}/api/users/register`,
            userData
        );

    return response.data;
};

export const loginUser = async (
    loginData
) => {

    const response =
        await axios.post(
            `${API}/api/users/login`,
            loginData
        );

    return response.data;
};