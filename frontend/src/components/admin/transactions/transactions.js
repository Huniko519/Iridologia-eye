import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Input, Row, Col, Modal, Form, message } from 'antd';
import {Button} from "@material-ui/core"
import {useHistory, withRouter} from "react-router-dom";
import {useSelector, useDispatch, connect} from 'react-redux';
// import "./App.css";
import "antd/dist/antd.css";
import Axios from "axios";

import JsonData1 from '../../layout/data/data_en.json';
import JsonData2 from '../../layout/data/data_fr.json';
import JsonData3 from '../../layout/data/data_it.json';
import JsonData4 from '../../layout/data/data_pt.json';
import JsonData5 from '../../layout/data/data_es.json';

var prev1 = "4";

const App = (props) => {

  const {auth} = props;
  const { Search } = Input;
  const [flag, setFlag] = useState(true);
  const [patientID, setPatientID] = useState("");
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
    console.log(prev1, translateFlag)
    // console.log("new", translateFlag)
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

useEffect(()=>{
  if(flag){
    Axios({
        method: "POST",
        url: "/api/patients/get-all-patients",
        data: {
          doctor: auth.user.id
        }
      }).then(res=>{
        setFlag(false)
        const patient_temp = [];
        var imageState = '';
        console.log(res.data)
        res.data.map((patient,index)=>{
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
        console.log(patient_temp)
        setData(patient_temp)
        setOriginData(patient_temp)
      })
  }
})
 

  const columns = [
    {
      title: landingPageData ? landingPageData.PatientTable.name : "loading",
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: text => <em>{text}</em>,
    },
     {
      title: landingPageData ? landingPageData.PatientTable.email: "loading",
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: text => <em>{text}</em>,
    },
     {
      title: landingPageData ? landingPageData.PatientTable.contact: "loading",
      dataIndex: 'contact',
      key: 'contact',
      sorter: (a, b) => a.contact.localeCompare(b.contact),
      render: text => <em>{text}</em>,
    },
     {
      title: landingPageData ? landingPageData.PatientTable.profession: "loading",
      dataIndex: 'profession',
      key: 'profession',
      sorter: (a, b) => a.profession.localeCompare(b.profession),
      render: text => <em>{text}</em>,
    },
     {
      title: landingPageData ? landingPageData.PatientTable.gender: "loading",
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      render: text => <em>{text}</em>,
    },
     {
      title: landingPageData ? landingPageData.PatientTable.birthdate: "loading",
      dataIndex: 'birthdate',
      key: 'birthdate',
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate)
    },
    {
      title: landingPageData ? landingPageData.PatientTable.reason: "loading",
      dataIndex: 'reason',
      key: 'reason',
      sorter: (a, b) => a.reason.localeCompare(b.reason),
      render: text => <em>{text}</em>,
    },
    {
      title: landingPageData ? landingPageData.PatientTable.exam: "loading",
      dataIndex: 'take',
      key: 'take',
      sorter: (a, b) => a.take.localeCompare(b.take),
      render: text => <em>{text}</em>,
    },
    {
      title: landingPageData ? landingPageData.PatientTable.have: "loading",
      dataIndex: 'have',
      key: 'have',
      sorter: (a, b) => a.have.localeCompare(b.have),
      render: text => <em>{text}</em>,
    },
        {
      title: landingPageData ? landingPageData.PatientTable.eyeState: "loading",
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => a.image.localeCompare(b.image),
      render: text => <em>{text}</em>,
    },
    {
      title: landingPageData ? landingPageData.PatientTable.action: "loading",
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a onClick={() => {
            setEditProductState(true);
            setIdToUpdate(record.key);
            editProductForm.setFieldsValue({ name: data.filter(x => x.key === record.key)[0].name })
          }}>Edit</a> */}
          <a onClick={() => {
            onView(record.key);
          }}>{landingPageData ? landingPageData.PatientTable.view: "loading"}</a>
          <a onClick={() => {
            onDelete(record.key);
          }}>{landingPageData ? landingPageData.PatientTable.delete: "loading"}</a>
        </Space>
      ),
    },
  ];
  const history = useHistory();
  const [editProductState, setEditProductState] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState();
  const [editProductForm] = Form.useForm();
  
  const [data, setData] = useState([]);
  const [origindata, setOriginData] = useState([]);

  const onSearch = (value) => {
    if (!value) {
      setData(origindata);
    }
    else {
      let tempData = [...data];
      tempData = tempData.filter(x => x.name.toLowerCase().includes(value.toLowerCase()) || 
      x.email.toLowerCase().includes(value.toLowerCase())||
      x.contact.toLowerCase().includes(value.toLowerCase())||
      x.profession.toLowerCase().includes(value.toLowerCase())||
      x.gender.toLowerCase().includes(value.toLowerCase())||
      x.birthdate.toLowerCase().includes(value.toLowerCase())||
      x.reason.toLowerCase().includes(value.toLowerCase())||
      x.take.toLowerCase().includes(value.toLowerCase())||
      x.have.toLowerCase().includes(value.toLowerCase())||
      x.image.toLowerCase().includes(value.toLowerCase()))
      setData(tempData);
    }
  }

  const onDelete = (key) => {
    console.log(key)
    if (!key) {
      return;
    }
    let tempData = [...data];
    let deleteData = tempData.filter(x => x.key === key);
    console.log(deleteData[0].id)
    tempData = tempData.filter(x => x.key !== key);
    setData(tempData);
    message.warn("Deleted Successfully");
    Axios({
      method: "POST",
      url: "/api/patients/delete-patient",
      data: {
        id: deleteData[0].id
      }
    }).then((res)=>{
      console.log(res.data.leftEye.replace("uploads/Patients/",""));
      var del_first = res.data.leftEye.replace("uploads/Patients/","");
      var del_second = del_first.replace("/Left-Eye.jpg");
      setPatientID(del_second)
    })
  }

  const onView = (value)=>{
    console.log(origindata[value-1].leftEye)
    var del_first = origindata[value-1].leftEye.replace("uploads/patients/","");
    var del_second = del_first.replace("/Left-Eye.jpg", "");
    setPatientID(del_second)
    history.push(`/patient/view/${del_second}`)
  }

  const onSubmit = (value) => {
    let tempData = [...data];
    let index = 0;
    for (const tempDataVal of tempData) {
      if (idToUpdate === tempDataVal.key) {
        tempDataVal.name = value.name;
        tempData[index] = tempDataVal;
        break;
      }
      index++;
    }
    setData(tempData);
    message.success("Updated Successfully");
    setEditProductState(false);
  }

  return (
    <div>
      <div style = {{textAlign: "center", paddingTop: "90px"}}>
        <Button variant = "contained" color = "primary" onClick = {()=>history.push("/create")}>{landingPageData ? landingPageData.PatientTable.addButton: "loading"}</Button>
      </div>
    <>
      <Modal
        title="Edit Product"
        visible={editProductState}
        onCancel={() => {
          setEditProductState(false);
        }}
        footer={[
          <Button
            key="edit_product"
            htmlType="submit"
            type="primary"
            form="product_edit"
          >
            Edit
          </Button>,
        ]}
      >
        <Form form={editProductForm} id="product_edit" onFinish={onSubmit}>
          <Form.Item
            initialValue={data.filter(x => x.key === idToUpdate)[0]?.name}
            required={false}
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required.",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Form>
      </Modal>
      <Row style={{ padding: '8px' }}>
        <Col md={24} lg={24} xs={24} sm={24} xl={24}>
          {/* <div className="App">
            <header className="App-header">
              <h1 className="App-title">Products</h1>
            </header>
          </div>
          <br /> */}
          <Row gutter={[10, 10]}>
            <Col md={6} lg={6} xs={12} sm={12} xl={6}>
              <Search
                allowClear
                placeholder={landingPageData ? landingPageData.PatientTable.search: "loading"}
                onSearch={(value) => {
                  onSearch(value);
                }}
              />
            </Col>
          </Row>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 11 }}/>
        </Col>
      </Row>
    </>
    </div>
  );

}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {  }
)(withRouter(App));
