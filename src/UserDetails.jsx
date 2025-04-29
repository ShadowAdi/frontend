import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/API";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
function UserDetails() {
  const { userId } = useParams();
  const { token, user: generalUser } = useUser()
  const [user, setUser] = useState({})
  const [reports, setReports] = useState([])
  const [creditHistory, setCreditHistory] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [updateCreditDetails, setUpdateCreditDetails] = useState({ credits: 0, description: "" })
  const GetUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message, success, user: userData, reports: reportsData, savedPosts: savedPostsData, creditHistory: creditHistoryData } = response.data
      if (!success) {
        console.log("Error in getting details ", error)
        console.log("message ", message)
      }
      setUser(userData)
      setReports(reportsData)
      setSavedPosts(savedPostsData)
      setCreditHistory(creditHistoryData)
    } catch (error) {
      console.log("Error ", error)
    }
  }

  useEffect(() => {
    GetUser()
  }, [userId])

  const handleChange = (e) => {
    setUpdateCreditDetails({ ...updateCreditDetails, [e.target.name]: e.target.value });
  }
  const { showToast } = useToast()



  const handleUpdateCredits = async () => {
    if (generalUser?.role === "Admin") {
      const response = await axios.patch(`${API_URL}/credits/${userId}`, {
        credits: updateCreditDetails.credits,
        description: updateCreditDetails.description
      })
      const { message, success, error } = await response.data
      if (!success) {
        showToast(message + " " + error, "error")
      }
      GetUser()
    } else {
      showToast("Only Admin Can Make  Changes", "error")
    }
  };

  return (
    <div>
      <Typography variant="h4" className="mb-6 text-blue-600">
        User Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="p-4">
            <CardContent>
              <Typography variant="h6">User Info</Typography>
              <Typography>Email: {user && user?.email}</Typography>
              <Typography>Username: {user && user?.username}</Typography>
              <Typography>Role: {user.role}</Typography>
              <Typography>Credits: {user.credits}</Typography>
              <Typography>Profile Completed: {user.profileCompleted ? "Yes" : "No"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="p-4">
            <CardContent>
              <Typography variant="h6">Saved Posts</Typography>
              {savedPosts && savedPosts?.length > 0 ? savedPosts.map((post) => (
                <div key={post._id} className="my-2">
                  <Typography>{post.post.title}</Typography>
                  <Typography color="textSecondary">{post.post.source}</Typography>
                </div>
              )) : <span className="text-sm text-black">
                No Saved Posts Found
              </span>}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="p-4">
            <CardContent>
              <Typography variant="h6">Reported Posts</Typography>
              {reports && reports?.length > 0 ? reports.map((report) => (
                <div key={report._id} className="my-2">
                  <Typography>{report.post.title}</Typography>
                  <Typography color="textSecondary">Reason: {report.reason}</Typography>
                  <Typography color="textSecondary">Status: {report.status}</Typography>
                </div>
              )) : <span className="text-sm text-black">
                No Report History Found
              </span>}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="p-4">
            <CardContent>
              <Typography variant="h6">Credit History</Typography>
              {creditHistory && creditHistory?.length > 0 ? creditHistory?.map((entry, index) => (
                <div key={index} className="my-2">
                  <Typography>{entry.description}</Typography>
                  <Typography color="textSecondary">+{entry.credits} credits</Typography>
                </div>
              )) : <span className="text-sm text-black">
                No Credit History Found
              </span>}
            </CardContent>
          </Card>
        </Grid>
        {generalUser && generalUser?.role === "Admin" && generalUser?.email !== user?.email && <Grid item xs={12} md={6}>
          <Card className="p-4">
            <CardContent className="space-y-4 gap-5">
              <Typography variant="h6">Update Credits</Typography>
              <TextField
                label="Credits"
                type="number"
                fullWidth
                value={updateCreditDetails.credits}
                onChange={handleChange}
                margin="normal"
                placeholder="Enter credit amount"
              />
              <TextField
                label="Description"
                value={updateCreditDetails.description}
                fullWidth
                margin="normal"
                onChange={handleChange}
                placeholder="Reason for credit change"
              />
              <Button
                variant="contained"
                color="primary"
                className="mt-4"
                onClick={handleUpdateCredits}
              >
                Update Credits
              </Button>
            </CardContent>
          </Card>
        </Grid>}
      </Grid>
    </div>
  );
}

export default UserDetails;