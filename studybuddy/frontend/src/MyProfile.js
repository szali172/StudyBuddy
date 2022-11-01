import React, { useState }from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const MyProfile = () => {
  const [userData, setUserData] = useState(null)
  function getUserData(key,value) {
    axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get/Users/"+key+"="+value,
    })
    .then((response) => {
      const res =response.data
      setUserData(({
        user_id: res["id"],
        user_name: res["name"],
        user_email: res["email"],
        user_courses: res["courses"],
        user_favorites: res["favorites"]
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    const profile = new Profile("bob_smith", "bob_smith@gmail.com", "Computer Science");
  return (
    <React.Fragment>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <style>{'body { background-color: #9780a6; }'}</style>
    <CssBaseline />
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        MY PROFILE
      </Typography>
    </Container>
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardHeader
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'dix',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                    <Typography
                    component="h5"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
                   My Information
                </Typography>
                    {
                        <div>
                        <p>To get your profile details: </p><button onClick={() => getUserData('name', 'John%20Smith')}>Click me</button>
                        {userData && <div>
                              <p>Id: {userData.user_id}</p>
                              <p>Name: {userData.user_name}</p>
                              <p>Email: {userData.user_email}</p>
                              <p>Courses: {userData.user_courses.map(app => (<li>{app}</li>))}</p>
                              <p>Favorites: {userData.user_favorites.map(app => (<li>{app}</li>))}</p>
                            </div>
                        }
                        </div>
                    } 
                    <button> Edit Info</button>   
                </Box>
                <ul>
                </ul>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>

          </Grid>
      </Grid>
    </Container>
  </React.Fragment>
  )
}
  
export default MyProfile;


class Profile
{
    #username = null;
    #email = null;
    #major = null;
    #favorites = null;
    #added = null;

    constructor(n, l, m)
    {
        this.#username = n;
        this.#email = l;
        this.#major = m;
    }

    setUsername(name) {
        this.#username = name;
    }
    setEmail(email) {
        this.#email = email;
    }
    setMajor(major) {
        this.#major = major;
    }
    getName() {
        return this.#username;
    }
    getEmail(){
        return this.#email;
    }
    getMajor(){
        return this.#major;
    }
    makeFavorite(c){
        this.#favorites.push(c);
    }
    removeFavorite(c) {
        this.#favorites.remove(c);
    }
}


class Course
{
    #name = null;
    #avgGpa = 0.0;
    #redditPosts = null;
    #favorite = false;
    #added = false;
    setName(n)
    {
        this.#name = n;
    }
    getName()
    {
        return this.#name;
    }
    setGPA(gpa)
    {
        this.#avgGpa = gpa;
    }
    getGPA()
    {
        return this.#avgGpa;
    }
    getRedditPost()
    {
        return this.#redditPosts;
    }
    setFavorite(fav)
    {
        this.#favorite = fav;
    }
    isFavorite()
    {
        return this.#favorite;
    }
    isAdded()
    {
        return this.#added;
    }
}

