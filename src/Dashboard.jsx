import { Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser()


  return (
    <div>
      <Typography variant="h4" className="mb-6 text-blue-600">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="p-4">
            <CardContent className="gap-2 flex flex-col">
              <Typography variant="h6">User Stats</Typography>
              {user?.username && <Typography>Username: {user.username}</Typography>}
              <Typography>User Email: {user?.email}</Typography>
              <Typography>Credits: {user?.credits}</Typography>
              <Typography>Profile Completed: {user?.profileCompleted ? "Yes" : "No"}</Typography>

              <Button
                variant="contained"
                color="primary"
                className="mt-4"
                onClick={() => navigate("/EditProfile")}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="p-4">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6">Saved Posts</Typography>
              {user && user?.savedPosts?.length > 0 && user?.savedPosts.map((post) => (
                <div key={post._id} className="my-2">
                  <Typography>{post.post.title}</Typography>
                  <Typography color="textSecondary">{post.post.source}</Typography>
                </div>
              ))}
              {user && user?.savedPosts?.length < 0 && (
                <span className="text-base text-black">
                  0 Posts
                </span>
              )}

              <Button
                variant="outlined"
                color="primary"
                className="mt-4"
                onClick={() => navigate("/feed")}
              >
                View Feed
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="p-4">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6">Recent Activity</Typography>
              {user && user?.creditHistory?.length > 0 && user?.creditHistory.map((credit) => (
                <div key={credit._id} className="my-2">
                  <Typography>Action {credit?.action}</Typography>
                  <Typography color="textSecondary">Credits {credit?.credits}</Typography>
                </div>
              ))}
              {user && user?.creditHistory?.length < 0 && (
                <span className="text-base text-black">
                  No History
                </span>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;