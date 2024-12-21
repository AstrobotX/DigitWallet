const {axiosInstance} = require('.');

//login user

export const loginUser = async (payload) => {
    try{
        const { data } = await axiosInstance.post('/api/users/login', payload);
        return data;
    }
    catch(error){
        return error.response.data;
    }
}

//register user

export const registerUser = async (payload) => {
    try{
        const { data } = await axiosInstance.post('/api/users/register', payload);
        return data;
    } catch(error){
        return error.response.data;
    }
}

//get user profile

export const getUserProfile = async () => {
    try{
        const { data } = await axiosInstance.post('/api/users/get-user-info');
        return data;
    } catch(error){
        return error.response.data;
    }
}