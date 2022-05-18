import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from "axios";
import { connect, useSelector, useDispatch } from "react-redux";
import { TranslateAction } from "../../actions/translateAction";
import { CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import JsonData1 from '../layout/data/data_en.json'
import JsonData2 from '../layout/data/data_fr.json';
import JsonData3 from '../layout/data/data_it.json';
import JsonData4 from '../layout/data/data_pt.json';
import JsonData5 from '../layout/data/data_es.json';

var prev1 = "4";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    padding: "10%",
    paddingBottom: "30px"

  },
  // // [theme.breakpoints.up('md')]: {
  //   //   margin: "30px",
  //   // },
  //   // [theme.breakpoints.up('lg')]: {
  //   //   margin: "30px",
  //   // },
  //   [theme.breakpoints.down('sm')]: {
  //     marginBottom: '20px',
  //     marginRight: 0,
  //     marginLeft: 0
  //   },
  root: {
    display: "inline-block",
    width: "49%",
    marginRight: "1%",
    border: "1px solid #E336FF",
    [theme.breakpoints.down('xs')]: {
      width: "80%",
      marginRight: 0,
      marginBottom: '30px'
    },
  },
  root1: {
    display: "inline-block",
    width: "50%",
    border: "1px solid #E336FF",
    [theme.breakpoints.down('xs')]: {
      width: "80%",
      marginRight: 0,
      marginBottom: '30px'
    },
  },
  title: {
    fontFamily: "initial",
    marginBottom: "100px",
    [theme.breakpoints.down('xs')]: {
      marginBottom: "50px",
    },
  }
}));

function BuySpace(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = props;
  const [card1, setCard1] = useState(false);
  const [paypal1, setPaypal1] = useState(false);
  const [card2, setCard2] = useState(false);
  const [paypal2, setPaypal2] = useState(false);
  const [landingPageData, setLandingPageData] = useState(JsonData4);
  const { translateFlag } = useSelector(state => state.translator);
  const [renderFlag, setRenderFlag] = useState(true);
  const [doctorPlan, setDoctorPlan] = useState(true);

  const getlandingPageData = (flag) => {
    switch (flag) {
      case "1":
        prev1 = "1";
        return setLandingPageData(JsonData1)
      case "2":
        prev1 = "2";
        return setLandingPageData(JsonData2)
      case "3":
        prev1 = "3";
        return setLandingPageData(JsonData3)
      case "4":
        prev1 = "4";
        return setLandingPageData(JsonData4)
      case "5":
        prev1 = "5";
        return setLandingPageData(JsonData5)
      default:
        return null;
    }
  }

  useEffect(() => {
    if (prev1 !== translateFlag) {
      console.log("I will sleep")
      getlandingPageData(translateFlag)
    }
    else {
      if (renderFlag) {
        getlandingPageData(translateFlag);
        setRenderFlag(false)
      }
    }
    Axios({
          method: "POST",
          url: "/api/users/get-one-user",
          data:{
            id: auth.user.id
          }
        }).then(res=>{
          if(res.data.membership2||res.data.membership1)
          setDoctorPlan(true);
          else
          setDoctorPlan(false);
        })
  })

  const Buywithpaypal1 = () => {
    setPaypal1(true)
    Axios({
      method: "GET",
      url: "/api/users/buy-with-paypal",
      params: {
        doctor: auth.user.id,
        amount: "25"
      }
    }).then(res => {
      window.location.href = res.data
    })
  }
  const Buywithpaypal2 = () => {
    setPaypal2(true)
    Axios({
      method: "GET",
      url: "/api/users/buy-with-paypal",
      params: {
        doctor: auth.user.id,
        amount: "40"
      }
    }).then(res => {
      window.location.href = res.data
    })
  }

  const BuyBasicWithCard = () => {
    const plan = 25;
    localStorage.setItem("plan", plan);
    dispatch({ type: 'SET_PLAN_WITH_CARD', payload: plan })
    history.push('/buy-space-with-card');
  }
  const BuyProfessionalWithCard = () => {
    const plan = 40;
    localStorage.setItem("plan", plan);
    dispatch({ type: 'SET_PLAN_WITH_CARD', payload: plan })
    history.push('/buy-space-with-card');
  }
  const BuyServiceWithCard = () => {
    const plan = 10;
    localStorage.setItem("plan", plan);
    dispatch({ type: 'SET_PLAN_WITH_CARD', payload: plan })
    history.push('/buy-space-with-card');
  }
  return (
    <div className={classes.container} id="buy-space">
      <h1 className={classes.title}>{landingPageData ? landingPageData.Service.title : "loading"}</h1>

      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/img/team/01.jpg"
            title="Contemplative Reptile"
          />
          <CardContent style={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {landingPageData ? landingPageData.Service.basicTitle : "loading"} <br /><br /> {landingPageData ? landingPageData.Service.basicPrice : "loading"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left", display: "inline-block" }}>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic1 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic2 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic3 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic4 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic5 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic6 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic7 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic8 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.basic9 : "loading"}</i>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button variant="outlined" size="large" color="primary" onClick={Buywithpaypal1} style={{ width: "50%" }}>
            {!paypal1 ? landingPageData ? landingPageData.Service.buyWithPaypal : "loading" : <CircularProgress size={24} />}
          </Button> */}
          <Button variant="outlined" size="large" color="primary" onClick={BuyBasicWithCard} style={{ width: "100%" }}>
            {landingPageData ? landingPageData.Service.buyWithCard : "loading"}
          </Button>
        </CardActions>
      </Card>


      <Card className={classes.root1}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/img/team/01.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {landingPageData ? landingPageData.Service.proTitle : "loading"}<br /><br /> {landingPageData ? landingPageData.Service.proPrice : "loading"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: "left", display: "inline-block" }}>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro1 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro2 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro3 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro4 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro5 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro6 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro7 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro8 : "loading"}</i>
              </div>
              <div>
                <CheckIcon color="secondary" /><i style={{ verticalAlign: "super" }}> {landingPageData ? landingPageData.Service.pro9 : "loading"}</i>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button variant="outlined" size="large" color="primary" onClick={Buywithpaypal2} style={{ width: "50%" }}>
            {!paypal2 ? landingPageData ? landingPageData.Service.buyWithPaypal : "loading" : <CircularProgress size={24} />}
          </Button> */}
          <Button variant="outlined" size="large" color="primary" onClick={BuyProfessionalWithCard} style={{ width: "100%" }}>
            {landingPageData ? landingPageData.Service.buyWithCard : "loading"}
          </Button>
        </CardActions>
      </Card>
      {doctorPlan?
      <Button
        fullWidth
        style = {{marginRight: "2%"}}
        variant = "contained"
        color="primary"
        onClick = {BuyServiceWithCard}
        >{landingPageData ? landingPageData.Service.buyRecharge : "loading"}
      </Button>
      :null
      }
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  translator: state.translator
});

export default connect(
  mapStateToProps,
  { TranslateAction }
)(BuySpace);