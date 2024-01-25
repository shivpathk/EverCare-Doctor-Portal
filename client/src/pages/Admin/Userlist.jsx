import React , {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import { Button, Col, Form, Input, Row, Table, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

const Userlist = () => {
  const [users , setUsers] = useState([])
  const dispatch = useDispatch();
  const getUsersData = async () =>{
    try {
      dispatch(showLoading())
      const response = await axios.get('/api/admin/get-all-users' , {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading())
      if(response.data.success){
        setUsers(response.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())

    }
  }

  useEffect(() => {
    getUsersData()
  }, [])
  
const columns = [
  {
    title:"Name",
    dataIndex:'name'
  },
  {
    title:'Email',
    dataIndex : 'email'
  },{
    title:'Created At',
    dataIndex : 'createdAt'
  },
  {
    title: 'Actions',
    dataIndex : 'actions',
    render : (text , record) =>(
      <div className="d-flex">
        <h1 className="anchor">Block</h1>
      </div>
    )
  }
]

  return (
    <Layout>
      <h1 className='page-header'>Users List</h1>
      <hr/>
      <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default Userlist