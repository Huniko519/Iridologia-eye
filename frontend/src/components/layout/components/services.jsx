import React from 'react';
import { useHistory } from "react-router-dom"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import MuiCardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MuiButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "30px"

  },
  root: {
    display: "inline-block",
    border: "1px solid #E336FF",
    // margin: '30px',
    // [theme.breakpoints.up('md')]: {
    //   margin: "30px",
    // },
    // [theme.breakpoints.up('lg')]: {
    //   margin: "30px",
    // },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
      marginRight: 0,
      marginLeft: 0
    },
  },
  title: {
    fontFamily: "initial",
    marginBottom: "60px"
  },
  reffirst: {
    [theme.breakpoints.up('lg')]: {
      marginBottom: '58px'
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '28px'
    },
  },

  minH: {
    [theme.breakpoints.up('md')]: {
      minHeight: '270px'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '270px'
    },
  }
}));

const Button = withStyles((theme) => ({
  root: {
    padding: '10px 40px',
    fontSize: '1rem',
    [theme.breakpoints.up('lg')]: {
      padding: '10px 40px',
    },
    [theme.breakpoints.down('lg')]: {
      padding: '4px 10px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '10px 30px',
    },
  }
}))(MuiButton);

const CardActions = withStyles((theme) => ({
  root: {
    padding: '10px',
    [theme.breakpoints.up('lg')]: {
      padding: '14px 25px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '15px 25px ',
    },
  }
}))(MuiCardActions);

export default function MediaCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data } = props;

  return (
    <div className={classes.container} id="buy-space">
      <h1 className={classes.title}>{data.title}</h1>
      <div className="row" style={{ padding: '0 30px' }}>
        <div className="col-md-4 col-sm-4">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/team/01.jpg"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.reffirst}>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.freeTitle}<br /><br />{data.freePrice}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left", display: "inline-block" }}>

                  <Box><CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.free1}</i></Box>
                  <Box><CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.free2}</i>
                  </Box>
                  <Box><CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.free3}</i>
                  </Box>
                  <Box><CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.free4}</i>
                  </Box>
                  <Box> <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.free5}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.free6}</i>
                  </Box>
                  <Box mt = {6}></Box>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button fullWidth variant="outlined" color="primary" onClick={() => history.push("/dashboard")}>
                {data.startButton}
              </Button>
            </CardActions>
          </Card>

        </div>
        <div className="col-md-4 col-sm-4">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/team/01.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.basicTitle}<br /><br />{data.basicPrice}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left", display: "inline-block" }}>
                  <Box> <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic1}</i>
                  </Box>
                  <Box>                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic2}</i>
                  </Box>
                  <Box>   <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic3}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic4}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic5}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic6}</i>
                  </Box>
                  <Box>    <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic7}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic8}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.basic9}</i>
                  </Box>

                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button fullWidth variant="outlined" color="primary" onClick={() => history.push("/buy-space")}>
                {data.startButton}
              </Button>
            </CardActions>
          </Card>

        </div>
        <div className="col-md-4 col-sm-4">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/team/01.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.proTitle}<br /><br />{data.proPrice}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left", display: "inline-block" }}>
                  <Box>   <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro1}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro2}</i>
                  </Box>
                  <Box>  <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro3}</i>

                  </Box>
                  <Box>
                    <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro4}</i>
                  </Box>
                  <Box>
                    <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro5}</i>
                  </Box>
                  <Box>
                    <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro6}</i>
                  </Box>
                  <Box>
                    <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro7}</i>
                  </Box>
                  <Box> <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro8}</i>
                  </Box>
                  <Box> <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {data.pro9}</i>
                  </Box>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button fullWidth variant="outlined" color="primary" onClick={() => history.push("/buy-space")}>
                {data.startButton}
              </Button>
            </CardActions>
          </Card>

        </div>
      </div>



    </div>
  );
}
