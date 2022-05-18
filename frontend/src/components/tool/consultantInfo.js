import React, { Fragment, useState, useEffect, useRef } from "react";
import {useHistory, withRouter} from "react-router-dom";
import { Table, Tag, Space, Input, Row, Col, Modal, Form, message } from 'antd';
import {useSelector, useDispatch, connect} from 'react-redux';
import {Box, Button, TextField} from '@material-ui/core'

import "./style.css";
import Axios from "axios";

import JsonData1 from '../layout/data/data_en.json';
import JsonData2 from '../layout/data/data_fr.json';
import JsonData3 from '../layout/data/data_it.json';
import JsonData4 from '../layout/data/data_pt.json';
import JsonData5 from '../layout/data/data_es.json';

var prev1 = "4";

const Tool = (props) => {
    const patient = useSelector(state => state.patient);
    const dispatch = useDispatch();
    const {match, auth} = props;
    let {id} = match.params;
    const history  = useHistory();
    const [landingPageData, setLandingPageData] = useState(JsonData4);
    const {translateFlag} = useSelector(state => state.translator);
    const [renderFlag, setRenderFlag] = useState(true);
    const [data, setData] = useState();
    const [flag, setFlag] = useState(true);
    const [consultantInfo, setConsultantInfo] = useState();
    const [patientId, setPatientId] = useState();
    const newconsultant = useRef();

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
      console.log(prev1, translateFlag)

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
      if(flag){
      Axios({
        method: "POST",
        url: "/api/patients/get-one-patient",
        data: {
          doctor: auth.user.id,
          patient: `uploads/patients/${id}/Left-Eye.jpg`
        }
      }).then(res=>{
          console.log(res.data[0].newInfo)
        setFlag(false)
        setPatientId(res.data[0]._id)
        const patient_temp = [];
        var imageState = '';
        res.data.map((patient,index)=>{
            console.log(patient.newInfo)
          if(patient.leftEye){
            if(patient.rightEye){
              imageState = "Left+Right";
            }
            else{
              imageState = "Left";
            }
          }
          else{
            if(patient.rightEye){
              imageState = "Right";
            }
            else{
              imageState = "No added Eye";
            }
          }
          patient_temp.push(
            {
              id: patient._id,
              key: index+1,
              name: patient.name,
              email: patient.email,
              contact: patient.contact,
              profession: patient.profession,
              gender: patient.gender,
              birthdate: patient.birthdate,
              reason: patient.reasonConsultation,
              take: patient.takeScan,
              have: patient.haveDisease,
              image: imageState,
              leftEye: patient.leftEye,
              rightEye: patient.rightEye
            }
          )
        })
        setData(patient_temp);
        setConsultantInfo(res.data[0].newInfo)
      })
    }
    })
    

    const columns = [
      {
        title: landingPageData ? landingPageData.PatientTable.name : "loading",
        dataIndex: 'name',
        key: 'name',
        render: text => <em>{text}</em>,
      },
       {
        title: landingPageData ? landingPageData.PatientTable.email: "loading",
        dataIndex: 'email',
        key: 'email',
        render: text => <em>{text}</em>,
      },
       {
        title: landingPageData ? landingPageData.PatientTable.contact: "loading",
        dataIndex: 'contact',
        key: 'contact',
        render: text => <em>{text}</em>,
      },
       {
        title: landingPageData ? landingPageData.PatientTable.profession: "loading",
        dataIndex: 'profession',
        key: 'profession',
        render: text => <em>{text}</em>,
      },
       {
        title: landingPageData ? landingPageData.PatientTable.gender: "loading",
        dataIndex: 'gender',
        key: 'gender',
        render: text => <em>{text}</em>,
      },
       {
        title: landingPageData ? landingPageData.PatientTable.birthdate: "loading",
        dataIndex: 'birthdate',
        key: 'birthdate'
      },
      {
        title: landingPageData ? landingPageData.PatientTable.reason: "loading",
        dataIndex: 'reason',
        key: 'reason',
        render: text => <em>{text}</em>,
      },
      {
        title: landingPageData ? landingPageData.PatientTable.exam: "loading",
        dataIndex: 'take',
        key: 'take',
        render: text => <em>{text}</em>,
      },
      {
        title: landingPageData ? landingPageData.PatientTable.have: "loading",
        dataIndex: 'have',
        key: 'have',
        render: text => <em>{text}</em>,
      },
          {
        title: landingPageData ? landingPageData.PatientTable.eyeState: "loading",
        dataIndex: 'image',
        key: 'image',
        render: text => <em>{text}</em>,
      }
    ];

    const Add_newconsultant = (e)=>{
      var consultant = `${consultantInfo}\n`+newconsultant.current.value
      e.preventDefault();
      Axios.post(`/api/patients/add-consultant`, {consultant:consultant,id: patientId })
      .then(res=>{
        if(res){
          window.location.reload(false);
        }
      })
    }


  return (
    <Fragment>
    <div>
      <Button variant = "outlined" color="secondary" style = {{marginTop: "75px",marginLeft: "20px" }} onClick = {()=>history.goBack()}>{landingPageData ? landingPageData.PatientTable.backButton:"loading"}</Button>
    </div>
    <Row style = {{paddingTop: "18px", display: "block"}}>
    <Table columns={columns} dataSource = {data} pagination = {false}/>
    </Row>
    <form onSubmit = {Add_newconsultant} style = {{textAlign: "center", marginTop: "20px"}}>
      <Button variant = "contained" color= "primary" type = "submit">{landingPageData ? landingPageData.PatientTable.addConsultantButton:"loading"}</Button>
      <TextField
          style = {{width: "90%"}}
          variant="outlined"
          margin="normal"
          required
          multiline
          rows = {7}
          label={landingPageData ? landingPageData.PatientTable.addConsultantButton : "loading"}
          inputRef = {newconsultant}
          autoComplete="off"
          type="text"
      />
    </form>
    <div style = {{textAlign: "center", marginTop: "30px"}}>
        <h2>{landingPageData ? landingPageData.PatientTable.consultantTitle : "loading"}</h2>
        <div style = {{position: "relative", textAlign: "left", marginLeft: "10%", marginRight: "10%"}}>
            <h3 style = {{whiteSpace: "pre", position: "absolute", left: "0px", fontFamily: "initial"}}>{consultantInfo}</h3>
        </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {  }
)(withRouter(Tool));
