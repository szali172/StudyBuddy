import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const tiers = [
  {
    title: 'KHUSHI',
    description: [
      'Come find a friend to study with for any class! Make a post and find other people.',
    ],
    buttonText: 'GO TO PAGE',
    buttonVariant: 'outlined',
    linkTo: '/findabuddy',
  },
  {
    title: 'VIVEN',
    description: [
      'Look at UIUC courses and reddit posts about each course!',
    ],
    buttonText: 'GO TO PAGE',
    buttonVariant: 'outlined',
    linkTo: '/browse',
  },
  {
    title: 'DIVYA',
    description: [
      'Meet the team and learn more about the creation of Study Buddy!',
    ],
    buttonText: 'GO TO PAGE',
    buttonVariant: 'outlined',
    linkTo: '/LearnMore',
  },
  {
    title: 'ZUHAIR',
    description: [
      'Meet the team and learn more about the creation of Study Buddy!',
    ],
    buttonText: 'GO TO PAGE',
    buttonVariant: 'outlined',
    linkTo: '/LearnMore',
  },
];


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
          STUDY BUDDY
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
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
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                <Link to={tier.linkTo}>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

const Home = () => {
  return <Content />;
}

export default Home;