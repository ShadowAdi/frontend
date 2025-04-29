import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/API";
import { useToast } from "../context/ToastContext";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const { showToast } = useToast();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email: formData.email.toLowerCase(),
        password: formData.password.toLowerCase()
      })
      const data = response.data
      const { message, success, savedUser, error } = data

      if (!success) {
        console.log("Error in registering user:", error);
        showToast(message+" "+error, "error")
        return;
      }
      showToast(message, "success")
      navigate("/login");
    } catch (error) {
      console.error(error);
      showToast("Error in Registering user ","error")
    }

  };

  return (
    <Box className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md gap-6">
      <Typography variant="h4" className="mb-6 text-center text-blue-600">
        Register
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
          Register
        </Button>
      </form>
      <Typography className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </Typography>
    
    </Box>
  );
}

export default Register;