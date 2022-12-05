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
  
const BrowseCourses = () => {
  
    const [classData, setClassData] = useState(null)
    const [GPA, setGPA] = useState(null)
    const [redditData, setRedditData] = useState(null)
    const [all, setAll] = useState(null)

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

          function getAll(col) {
            axios({
              method: "GET",
              url:"http://127.0.0.1:5000/get_all/"+col,
            })
            .then((response) => {
              console.log("hi")
              const res = response.data
              console.log(res)
              console.log(res[0])
              setAll(({
                courses: res
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
                {getAll("classes")}
                    {all && <div>
                        <Card>
                            {<p>Course Title: {all.courses[0]["Course Title"]}</p>}
                            {<p>Year: {all.courses[0]["Year"]}</p>}
                            {<p>Number of A+: {all.courses[0]["A+"]}</p>}
                            {<p>Primary Instructor: {all.courses[0]["Primary Instructor"]}</p>}
                            {getGPA(all.courses[0]["Course Title"])}
                            {GPA && <div>
                              {<p>GPA: {GPA.gpa} </p>}
                            </div>}
                            {getRedditPost('UIUC', all.courses[0]["Course Title"])}
                            <h4>Reddit Post for this course: </h4>
                            {redditData && <div>
                              <p>Title: {redditData.first['title']}</p>
                              <p>Title: {redditData.first['date']}</p>
                              <a href= {"https://www.reddit.com" + redditData.first['permalink']} target ="_blank"> Link to Post</a> 
                            </div>}

                            <p>10th course: {all.courses[10]["Course Title"]}</p>
                            <p>100th course: {all.courses[100]["Course Title"]}</p>
                        </Card>
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
  );
};
  
export default BrowseCourses;