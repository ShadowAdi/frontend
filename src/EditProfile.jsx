import { TextField, Button, Typography, Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { API_URL } from "../constants/API";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function EditProfile() {
  const { user, token } = useUser()
  const [formData, setFormData] = useState({
    email: user?.email,
    username: user?.username,
  });
  const navigate = useNavigate()
  const { showToast } = useToast();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      formData.email=user.email
      formData.username=user.username
    }
  }, [user])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        console.log("User Do Not Exists")
        showToast("User Do Not Exists ","error")
        return
      }
      const response = await axios.patch(`${API_URL}/complete`, {
        email: formData.email,
        username: formData.username
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message, success, error, } = await response.data
      if (!success) {
        console.log("Error in updating User ", message)
        console.log("Error ", error)
        showToast(message,"error")
      }
      showToast(showToast,"success")
      navigate("/dashboard")
    } catch (error) {
      showToast("Something Happend "+error,"error")
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" className="mb-6 text-center text-blue-600">
        Profile
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
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" fullWidth className="mt-4">
          {user?.profileCompleted ? "Update Profile" : "Complete Profile"}
        </Button>
      </form>
    </Box>
  );
}

export default EditProfile;