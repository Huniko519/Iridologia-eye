import React, {useState, useEffect} from 'react';
import  {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {Box} from "@material-ui/core";
import { useSelector, useDispatch, connect } from 'react-redux';

import JsonData1 from '../layout/data/data_en.json';
import JsonData2 from '../layout/data/data_fr.json';
import JsonData3 from '../layout/data/data_it.json';
import JsonData4 from '../layout/data/data_pt.json';
import JsonData5 from '../layout/data/data_es.json';

var prev1 = "4";

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow:1,
    },
    eye: {
        position: "relative",
        width: "100%"
    }

}))

function Map(){
    const classes = useStyles();

    const [landingPageData, setLandingPageData] = useState(JsonData4);
  const { translateFlag } = useSelector(state => state.translator);
  const [renderFlag, setRenderFlag] = useState(true);


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
    console.log(prev1, translateFlag)
    // console.log("new", translateFlag)
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
  })
    return(
        <div class="container" style = {{paddingTop: "100px"}}>
            <Grid container spacing = {3}>
                <Grid item xs={12} sm = {12} md = {12}>
                    <img src = 'img/map/left.png' alt = "left-eye" className = {classes.eye} />
                </Grid>
                <Grid item xs={12} sm = {12} md = {12}>
                    <img src = 'img/map/right.png' alt = "right-eye" className = {classes.eye} />
                </Grid>
            </Grid>
            <Box mt = {2} />
            <Grid container spacing = {2}>
                <Grid item xs = {12} sm = {6} md = {3}>
                    {landingPageData ? landingPageData.Map.point1 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point2 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point3 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point4 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point5 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point6 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point7 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point8 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point9 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point10 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point11 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point12 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point13 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point14 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point15 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point16 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point17 : "loading"}
                    <br/>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    {landingPageData ? landingPageData.Map.point18 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point19 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point20 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point21 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point22 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point23 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point24 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point25 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point26 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point27 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point28 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point29 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point30 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point31 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point32 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point33 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point34 : "loading"}
                    <br/>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    {landingPageData ? landingPageData.Map.point35 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point36 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point37 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point38 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point39 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point40 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point41 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point42 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point43 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point44 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point45 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point46 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point47 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point48 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point49 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point50 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point51 : "loading"}
                    <br/>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    {landingPageData ? landingPageData.Map.point52 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point53 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point54 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point55 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point56 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point57 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point58 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point59 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point60 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point61 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point62 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point63 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point64 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point65 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point66 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point67 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point68 : "loading"}
                    <br/>
                    {landingPageData ? landingPageData.Map.point69 : "loading"}
                    <br/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Map;