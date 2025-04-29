import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/API";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
function Feed() {
  const [posts, setPosts] = useState([])
  const { showToast } = useToast();
  const { token } = useUser()


  const GetAllPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`)
      const { message, success, posts } = response.data
      if (success) {
        setPosts(data.posts);
    
      } else {
        showToast(message || "Failed to fetch posts", "error");
        setPosts([]);
      }
    } catch (error) {
      console.log("Error in getting Posts ", error)
      setPosts([])
      showToast("Error in getting posts " + error, "error")
    }
  }

  useEffect(() => {
    GetAllPosts()
  }, [])


  const handleSave = async (postId) => {
    try {
      const response = await axios.post(`${API_URL}/save/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message, success, error } = response.data
      if (!success) {
        showToast(message + " " + error, "error")      }
      showToast(message, "success")
    } catch (error) {
      console.log("error occureed ", error)
      showToast("Something happend in saving posts " + error, "error")
    }
  };

  const handleShare = async (postId) => {
    try {
      const response = await axios.post(`${API_URL}/share/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message, success, shareLink, error } = response.data
      if (!success) {
        showToast(message + " " + error, "error")
      }
      if (shareLink) {
        navigator.clipboard.writeText(shareLink)
        showToast("Link Copied", "success")
      }

    } catch (error) {
      console.log("error occureed ", error)
      showToast("Error Occurreed " + error, "error")
    }
  };

  const handleReport = async (postId) => {
    try {
      const response = await axios.post(`${API_URL}/save/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { message, success, error } = response.data
      if (!success) {
        showToast(message + " " + error, "error")
      }
      showToast(message, "success")
    } catch (error) {
      console.log("error occureed ", error)
      showToast("Error Occurred in Reporting Post " + error, "error")
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-screen overflow-x-hidden">
      <Typography variant="h4" className="mb-6 text-blue-600">
        Content Feed
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid
            item
            xs={12}    // 1 col on xs
            sm={6}     // 2 cols on sm
            md={4}     // 3 cols on md+
            key={post._id}
            style={{ display: 'flex' }}
          >
            <Card
              className="p-4"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                wordWrap: 'break-word'
              }}
            >
              <CardContent
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  variant="h6"
                  style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                >
                  {post.title}
                </Typography>

                <Typography color="textSecondary">{post.source}</Typography>

                <Typography className="my-2">{post.content}</Typography>

                <Typography color="textSecondary">By {post.author}</Typography>

                <div className="mt-4 flex flex-row justify-between">
                  <Button variant="contained" color="primary" onClick={() => handleSave(post._id)}>
                    Save
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleShare(post._id)}>
                    Share
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleReport(post._id)}>
                    Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Feed;