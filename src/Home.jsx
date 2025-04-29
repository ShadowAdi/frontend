import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center flex flex-col h-full flex-1 my-auto gap-6 items-center justify-center">
      <Typography variant="h2" className="mb-4 text-blue-600">
        Welcome to Creator Dashboard
      </Typography>
      <Typography variant="h5" className="mb-6 text-gray-700">
        Manage your profile, earn credits, and engage with content.
      </Typography>
      <div className="flex items-center gap-5">

      <Button variant="contained" color="primary" component={Link} to="/feed" className="mr-4 ">
        Explore Feed
      </Button>
      <Button variant="outlined" color="primary" component={Link} to="/register">
        Get Started
      </Button>
      </div>
    </div>
  );
}

export default Home;