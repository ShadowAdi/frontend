import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { API_URL } from "../constants/API";
import { useToast } from "../context/ToastContext";
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const { login } = useUser();
  const { showToast } = useToast();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email.toLowerCase(),
        password: formData.password.toLowerCase()
      })
      const data = response.data
      const { message, success, savedUser, error, token } = data

      if (!success) {
        console.log("Error in login user:", error);
        showToast(message+" "+error, "error")
        return;
      }
      if (token) {
        showToast(message, "success")
        login(token)
      }


      navigate("/feed");
    } catch (error) {
      console.error(error);
      showToast("Failed to Login User " + error, "error")
    }

  };

  return (
    <Box className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" className="mb-6 text-center text-blue-600">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
          Login
        </Button>
      </form>
      <Typography className="mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </Typography>
   
    </Box>
  );
}

export default Login;