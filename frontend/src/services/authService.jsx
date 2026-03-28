export const loginUser = async (credentials) => {
    try {
        const res = await API.post("/api/auth/login", credentials);
        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful!");
        }
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong";
        console.log("from catch :", message)
        toast.error(message);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await API.post("/api/auth/register", userData);
        toast.success("Registration successful!");
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed";
        toast.error(message);
        throw error;
    }
};