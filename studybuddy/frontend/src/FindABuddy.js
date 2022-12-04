import React, { useState }from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {id} from './Login';

const FindABuddy = () => {
    const [postData, setPostData] = useState(null)
    const [postname, setName] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")

    function getPostData(key, value) {
      axios({
        method: "GET",
        url:"http://127.0.0.1:5000/get/Posts/"+key+"="+value,
      })
      .then((response) => {
        const res =response.data
        console.log(res)
        setPostData(({
          post_id: res["post_id"],
          op_id: res["op_id"],
          ts: res["ts"],
          location: res["location"],
          content: res["content"],
          comments: res["comments"]
        }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}

       /*
     Inserts a post into the 'Posts' collection of the database given arguments
      post_id: string, op_id: string, ts: string, location: string, content: string comments: array of strings
    */

    function insertPostData(post_id, op_id, ts, location, content, comments) {
      
      const data = `{"post_id":"${post_id}","op_id":"${op_id}","ts":"${ts}","location":"${location}","content":"${content}","comments":"${comments}"}`;
     
      axios.post("http://127.0.0.1:5000/insert/Posts", data, {headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
    }}).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
        })
    }
  
    

    const NameHandleChange = e => {
        setName(e.target.value)
      }
    const LocationHandleChange = e => {
        setLocation(e.target.value)
    }
    const DescriptionHandleChange = e => {
        setDescription(e.target.value)
    }
  return (
    <div>
        <style>{'body { background-color: #6ba0cf; }'}</style>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          FIND A BUDDY
        </Typography>

        <Grid container spacing={5} alignItems="flex-end">
          <Grid
            item
            xs={12}
            md={6}
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
                   MAKE A POST
                </Typography>
                    {
                        <form>
                        <label>
                            Name: 
                            <input
                                id={'Name'}
                                type={'text'}
                                placeholder={'Name'}
                                value={postname}
                                onChange={NameHandleChange}
                            />
                        </label>
                        <br></br>
                        <br></br>
        
                        <label>
                            Location: 
                            <input
                                id={'location'}
                                type={'text'}
                                placeholder={'Location'}
                                value={location}
                                onChange={LocationHandleChange}
                            />
                        </label>
                        <br></br>
                        <br></br>
                        
        
                        <label>
                            Description: 
                            <input
                                id={'description'}
                                type={'text'}
                                placeholder={'Description'}
                                value={description}
                                onChange={DescriptionHandleChange}
                            />
                        </label>

                        <br></br>
                        <br></br>

                        <Button variant='outlined' color='success' onClick={() => insertPostData("4567898765638",id, "2022-11-6 21:42:26.423489" , location.toString(), description.toString())}>MAKE POST</Button>
                  
                    </form>
                    } 
                      <p>To get Post details: </p><Button variant='outlined' color='success' onClick={() => getPostData('op_id', id)}>Click me</Button>
                        {postData && <div>
                            <p>Time: {postData.ts}</p>
                            <p>Location: {postData.location}</p>
                            <p>Content: {postData.content}</p>
                            </div>
                        }

                     
                </Box>
                <ul>
                </ul>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>

          </Grid>


          <Grid
            item
            xs={12}
            md={6}
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
                   VIEW POSTS
                </Typography>
                      <p>To get Post details: </p><Button variant='outlined' color='success' onClick={() => getPostData('op_id', id)}>Click me</Button>
                        {postData && <div>
                            <p>Time: {postData.ts}</p>
                            <p>Location: {postData.location}</p>
                            <p>Content: {postData.content}</p>
                            </div>
                        }
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
    </div>
  )
};
  
export default FindABuddy;

class FindABuddyClass
{
    #posts = [];
    makePost(post) {
        this.#posts.push(post);
    }
    makePost(name, location, work_on) {
        const p = new Post(name, location, work_on);
        this.#posts.push(p);
    }
    getAllPosts() {
        var ret = "";
        for (var i = 0; i < this.#posts.length; i++) {
            ret +=  "Post: " +  this.#posts[i].getName();
        }
        return ret;
    }
    
    deletePost(post){
        this.#posts.remove(post);
    } 
}
class Post
{
    #name = "";
    #location = "";
    #workOn = Course;

    constructor(n, l, w)
    {
        this.#name = n;
        this.#location = l;
        const c = new Course();
        c.setName(w);
        this.#workOn = c;
    }
    getName() {
        return this.#name;
    }
    getLocation(){
        return this.#location;
    }
    getWorkOn(){
        return this.#workOn.getName();
    }
    viewPost(){
       
        return "Name: " + this.#name + " Location: " + this.#location +  " Working on: " + this.#workOn.getName();
        
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

