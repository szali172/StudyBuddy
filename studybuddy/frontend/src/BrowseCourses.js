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
  
const BrowseCourses = () => {
    const [classData, setClassData] = useState(null)
    const courses = []
    const [GPA, setGPA] = useState(null)
    const [redditData, setRedditData] = useState(null)

    function getClassData(key, value) {
        axios({
          method: "GET",
          url:"http://127.0.0.1:5000/get/classes/"+key+"="+value,
        })
        .then((response) => {
          const res =response.data
          console.log(res)
          setClassData(({
            year: res["Year"],
            tearm: res["Term"],
            year_term: res["YearTerm"],
            subject: res["Subject"],
            number: res["Number"],
            course_title: res["Course Title"],
            sched_type: res["Sched Type"],
            a_plus: res["A+"],
            a: res["A"],
            a_minus: res["A-"],
            b_plus: res["B+"],
            b: res["B"],
            b_minus: res["B-"],
            c_plus: res["C+"],
            c: res["C"],
            c_minus: res["C-"],
            d_plus: res["D+"],
            d: res["D"],
            d_minus: res["D-"],
            f: res["F"],
            w: res["W"],
            primary_instructor: res["Primary Instructor"]
          }))
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}


      function getGPA(title) {
        var key = "Course%20Title"
        axios({
          method: "GET",
          url:"http://127.0.0.1:5000/get/classes/"+key+"="+title,
        })
        .then((response) => {
          const res =response.data
          console.log(res)
          var total = (parseInt(res["A+"])* 4) + (parseInt(res["A"]) * 4) + (parseInt(res["A-"]) * 3.67) + (parseInt(res["B+"]) * 3.33) + (parseInt(res["B"]) * 3) + (parseInt(res["B-"]) * 2.67) + (parseInt(res["C+"]) * 2.33) + (parseInt(res["C"]) * 2) + (parseInt(res["C-"]) * 1.67) + (parseInt(res["D+"]) * 1.33) + (parseInt(res["D"] * 1)) + (parseInt(res["D-"]) * 0.67)
          var gpa = (total / (parseInt(res["A+"]) + parseInt(res["A"]) + parseInt(res["A-"]) + parseInt(res["B+"]) + parseInt(res["B"]) + parseInt(res["B-"]) + parseInt(res["C+"]) + parseInt(res["C"]) + parseInt(res["C-"]) + parseInt(res["D+"]) + parseInt(res["D"]) + parseInt(res["D-"]) + parseInt(res["F"]))).toFixed(2)
          setGPA(({
            "gpa": gpa
          }))
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

        function getRedditPost(sub, topic) {
          axios({
            method: "GET",
            url:"http://127.0.0.1:5000//reddit_posts/"+sub+"/"+topic
          })
          .then((response) => {
            const res =response.data
            console.log(res)
            console.log(typeof res)
            // console.log(res[0])
            setRedditData(({
              first: res[0]
            }))
          }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }
          })}

        

  return (
    <div>
        <style>{'body { background-color: #e8c3d9; }'}</style>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          BROWSE COURSES
        </Typography>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid
            item
            xs={12}
            md={25}
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
                   COURSES
                </Typography>
                {getClassData('Primary%20Instructor', 'Zheng,%20Reanne')}
                    {classData && <div>
                        <p>Course Name: {classData.course_title}</p>
                        <p>Year: {classData.year}</p>
                        <p>Number of A+: {classData.a_plus}</p>
                        <p>Primary Instructor: {classData.primary_instructor}</p>                        
                        {console.log(getGPA("Intro%20Asian%20American%20Studies"))}
                        {GPA && <div>
                            {/* <p>GPA: {GPA.gpa}</p> */}
                            {/* {courses.push({year: classData.year, name: classData.course_title, numbeofaplus: classData.a_plus, primaryinst: classData.primary_instructor, gpa: GPA.gpa})} */}
                          </div>
                        } 
                        {getRedditPost('UIUC', 'Intro Asian American Studies')}
                        {redditData && <div>
                              <h4>Reddit Post for this course: </h4>
                              <p>Author: {redditData.first['author']}</p>
                              <p>Date: {redditData.first['date']}</p>
                              <p>Title: {redditData.first['title']}</p>
                              <p>Link to Post: {redditData.first['permalink']}</p>
                            </div>
                        }
                      </div>
                    }
                  <Card>
                  {/* <div>
                  {courses.map(paragraph => <p>{paragraph}</p>)}
                  </div> */}
                  </Card>
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
  );
};
  
export default BrowseCourses;


class FilterSeach
{
    #displayedCourses = null

    filterByAlpha() {
        this.#displayedCourses.sort();
    }
    filterByPrefix(prefix) {
        for (var i = 0; i < this.#displayedCourses.length; i++) {
            if (this.#displayedCourses[i].includes(prefix)) {
                <div>
                this.#displayedCourses[i]
                </div>
            }
        }
    }
    filterByName(name) {
        for (var i = 0; i < this.#displayedCourses.length; i++) {
            if (this.#displayedCourses[i] === name) {
                <div>
                this.#displayedCourses[i]
                </div>
            }
        }
    }
}

class RedditPost 
{
    setPost(post) {}
    fetchPosts() {}
}



class Course
{
    #name = null;
    #avgGpa = 0.0;
    #redditPosts = [];RedditPost;
    #favorite = false;
    #added = false;

    constructor(n, gpa)
    {
        this.#name = n;
        this.#avgGpa = gpa;
        this.#favorite = false;
        this.#added = true;
    }

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

