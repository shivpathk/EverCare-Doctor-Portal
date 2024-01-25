import React from 'react'
import Layout from "../../components/Layout";
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';

const Notifications = () => {

    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.user)
    const dispatch = useDispatch();

    const markAllAsSeen = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/mark-all-notifications-as-seen',{userId:user._id},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading())
            if(response.data.success){
              toast.success(response.data.message)
              dispatch(setUser(response.data.data));
            }else{
              toast.error(response.data.message)
            }
          } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            toast.error("Something went wrong")
            
          }
    }
    const deleteAll = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/delete-all-notifications',{userId:user._id},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading())
            if(response.data.success){
              toast.success(response.data.message)
              dispatch(setUser(response.data.data));
            }else{
              toast.error(response.data.message)
            }
          } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            toast.error("Something went wrong")
            
          }
    }
   return <Layout>
    <h1 className="page-title">Notifications</h1>
    <hr/>

    <Tabs>

        <Tabs.TabPane tab="Unseen" key={1}>
            <div className='d-flex justify-content-end'>
                <h1 className="anchor" onClick={()=>markAllAsSeen()}>Mark all as seen</h1>
            </div>

            {user?.unseenNotifications.map((notification)=>{
                <div className='card p-2 mt-2' onClick={()=>{navigate(notification.onClickPath)}}>
                    <div className='card-text'>{notification.massage}
                    </div>
                </div>
            })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={2}>
            <h2>
            <div className='d-flex justify-content-end'>
                <h1 className="anchor" onClick={()=>deleteAll()}>Delete all</h1>
            </div>
            {user?.seenNotifications.map((notification)=>{
                <div className='card p-2 mt-2' onClick={()=>{navigate(notification.onClickPath)}}>
                    <div className='card-text'>{notification.massage}
                    </div>
                </div>
            })}
            </h2>
        </Tabs.TabPane>
    </Tabs>
  </Layout>;
}

export default Notifications