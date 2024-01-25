import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, Col, Form, Input, Row, Table, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get("/api/user/get-appointments-by-user-id", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
            setAppointments(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    const columns = [
        {
            title:"Id",
            dataIndex:"_id"
        },
        {
          title: "Doctor",
          dataIndex: "name",
          render: (text, record) => (
            <span className="normal-text">
              {record.doctorInfo.firstName} {record.doctorInfo.lastName}
            </span>
          ),
        },
        {
          title: "Phone",
          dataIndex: "phoneNumber",
          render: (text, record) => (
            <span className="normal-text">
              {record.doctorInfo.phoneNumber} 
            </span>
          ),
        },
        {
          title: "status",
          dataIndex: "status",
        }
      ];
    
      useEffect(() => {
        getAppointmentsData();
      }, []);


  return (
    <Layout>
        <h1 className="page-title">Appointments</h1>
        <hr/>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments