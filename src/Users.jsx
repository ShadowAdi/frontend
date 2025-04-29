import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/API';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';


const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { token } = useUser()
  const { showToast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setUsers(res.data.users);
        showToast("Success in Fetching Users ", "success")
      } catch (err) {
        console.error("Failed to fetch users", err);
        showToast("Error in fetching users ", "error")
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <Card key={user._id} className="shadow-md gap-5" >
            <CardContent className='flex flex-col gap-1'>
              <Typography variant="h6">{user.username || "Unnamed User"}</Typography>
              <Typography variant="body2" color="textSecondary">Email: {user.email}</Typography>
              <Typography variant="body2">Role: {user.role}</Typography>
              <Typography variant="body2">Credits: {user.credits}</Typography>
              <Typography variant="body2">Profile Completed: {user.profileCompleted ? "Yes" : "No"}</Typography>
              <Button
                variant="contained"
                className="mt-4"
                onClick={() => navigate(`/user/${user._id}`)}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;
