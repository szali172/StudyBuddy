import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import logo from "./zuhair.jpeg"
import logo1 from "./viven.jpeg"
import logo2 from "./divya.jpeg"
import logo3 from "./khushi.jpeg"


function Content() {
  
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <style>{'body { background-color: #8bb88a; }'}</style>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          LEARN MORE
        </Typography>
      </Container>
      <Container maxWidth="xl" component="main">
        <Grid container spacing={5} alignItems="flex-end">
            <Grid
              item
              xs={12}
              md={3}
            >
              <Card>
                <CardHeader
                  title= 'DIVYA'
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
                    variant="subtitle1"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
              Divya is in her second year in the University of Illinois at Urbana Champaign, studying computer science. She is from Naperville, Illinois and is looking forward to software development jobs!
              </Typography>
                  </Box>
                  <img style={{ width: 200, height: 200 }} src={logo2} alt="React Logo" />
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>


            <Grid
              item
              xs={12}
              md={3}
            >
              <Card>
                <CardHeader
                  title='KHUSHI'
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
                    variant="subtitle1"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
              Khushi is a sophomore studying Computer Science at the University of Illinois at Urbana Champaign. She grew up in Ashburn, Virginia and wants to work more in product management in the future.
              </Typography>
                  </Box>
                  <img style={{ width: 200, height: 200 }} src={logo3} alt="React Logo" />
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid> 

            <Grid
              item
              xs={12}
              md={3}
            >
              <Card>
                <CardHeader
                  title='VIVEN'
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
                    variant="subtitle1"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
              Viven is a sophomore studying computer science at the University of Illinois at Urbana Champaign. He is from Basking Ridge, New Jersey and is excited for software development positions in the future!     
              </Typography>
                  </Box>
                  <img style={{ width: 200, height: 200 }} src={logo1} alt="React Logo" />
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
            >
              <Card>
                <CardHeader
                  title= 'ZUHAIR'
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
                    variant="subtitle1"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
              Zuhair is in his final year as a computer science major at the University of Illinois at Urbana Champaign. He is from Dhaka, Bangladesh and is excited to start working in software development next year!
              </Typography>
                  </Box>
                  <img style={{ width: 200, height: 200 }} src={logo} alt="React Logo" />
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}

const Home = () => {
  return <Content />;
}

export default Home;