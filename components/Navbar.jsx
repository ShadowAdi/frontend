import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {

  const { user, logout } = useUser()

  return (
    <AppBar position="static" className="bg-blue-600 max-w-screen overflow-x-hidden w-full ">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component={Link} to="/" className="text-white no-underline">
          Creator Dashboard
        </Typography>
        <div className="space-x-4">
          {user && user?.email && <span className="text-white text-lg">
            Hii, {user?.email}
          </span>}
          <Button color="inherit" component={Link} to="/feed">
            Feed
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/EditProfile">
                Profile
              </Button>
              {user?.role === "Admin" && (
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>
              )}
              <Button color="inherit" onClick={() => {
                logout()
              }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 