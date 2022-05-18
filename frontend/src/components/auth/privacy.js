import React,{useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {Button} from "@material-ui/core";
import { connect, useSelector, useDispatch } from "react-redux";
import JsonData1 from '../layout/data/data_en.json'
import JsonData2 from '../layout/data/data_fr.json';
import JsonData3 from '../layout/data/data_it.json';
import JsonData4 from '../layout/data/data_pt.json';
import JsonData5 from '../layout/data/data_es.json';

var prev1 = "4";

function Privacy(){
    const history = useHistory();
    const [landingPageData, setLandingPageData] = useState(JsonData4);
    const {translateFlag} = useSelector(state => state.translator);
    const [renderFlag, setRenderFlag] = useState(true);

    const getlandingPageData =(flag)=> {
        switch (flag){
        case "1" : 
            prev1 = "1";
            return setLandingPageData(JsonData1)
        case "2" : 
            prev1 = "2";
            return setLandingPageData(JsonData2)
        case "3" : 
            prev1 = "3";
            return setLandingPageData(JsonData3)
        case "4" : 
            prev1 = "4";
            return setLandingPageData(JsonData4)
        case "5" : 
            prev1 = "5";
            return setLandingPageData(JsonData5)
        default:
            return null;
        }
    }

    useEffect(()=>{
        if(prev1 !== translateFlag){
        console.log("I will sleep")
        getlandingPageData(translateFlag)
        }
        else{
        if(renderFlag){
            getlandingPageData(translateFlag);
            setRenderFlag(false)
        }
        }
    })
    return(
        <div style = {{marginLeft: "10%", marginRight: "10%", marginTop: "5%"}}>
        <Button variant = "outlined" color="secondary" onClick = {()=>history.goBack()}>{landingPageData ? landingPageData.PatientTable.backButton:"loading"}</Button>
        <div style = {{marginTop: "5%"}}>
        <h1>{landingPageData ? landingPageData.PrivacyAndPolicy.title:"loading"}</h1>
        <h4>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy1:"loading"}</h4>
             

<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy2:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy3:"loading"} 
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy4:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy5:"loading"} 
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy6:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy7:"loading"}
<div style = {{paddingLeft: "5%"}}>
<span>&#9679;</span>  {landingPageData ? landingPageData.PrivacyAndPolicy.privacy8:"loading"}<br /><br />
<span>&#9679;</span>  {landingPageData ? landingPageData.PrivacyAndPolicy.privacy9:"loading"}<br /><br />
<span>&#9679;</span>  {landingPageData ? landingPageData.PrivacyAndPolicy.privacy10:"loading"} <br /><br /><br />
</div>
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy11:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy12:"loading"} 
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy13:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy14:"loading"} 
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy15:"loading"}
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy16:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy17:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy18:"loading"}
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy19:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy20:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy21:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy22:"loading"}
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy23:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy24:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy25:"loading"}
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy26:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy27:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy28:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy29:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy30:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy31:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy32:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy33:"loading"}
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy34:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy35:"loading"}
<br /><br />
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy36:"loading"}
<br /><br /><br />
<h3>{landingPageData ? landingPageData.PrivacyAndPolicy.privacy37:"loading"}</h3>
{landingPageData ? landingPageData.PrivacyAndPolicy.privacy38:"loading"}<br/><br/><br/><br/>
        </div>
        </div>
    )
}

export default Privacy;