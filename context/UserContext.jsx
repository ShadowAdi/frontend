import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../constants/API";

export const UserContext = createContext()

export const useUser = () => useContext(UserContext);


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)



    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/user`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    const { success, message, user, reports, savedPosts, creditHistory } = response.data;

                    if (!success) {
                        setSnackbarMessage('Failed to get the authenticated user');
                        setSnackbarSeverity('error');
                        setOpenSnackbar(true);
                        console.log("Error in getting user:", response.data.error);
                        return;
                    }

                    setUser({
                        ...user,
                        reports,
                        savedPosts,
                        creditHistory
                    });

                } catch (error) {
                    console.error("Fetch user error:", error);
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('token');
                }
            }
        }

        fetchUser();
    }, [token]);



    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };


    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}