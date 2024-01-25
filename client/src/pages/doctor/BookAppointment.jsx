import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";

const BookAppointment = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.massage);
        navigate('/appointments')
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error Booking Appointment");
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-3" align="middle">
          <Col span={8} sm={24} xs={24} lg={8}>
              <img src="https://c8.alamy.com/comp/TC9R47/finger-press-book-now-button-booking-and-online-reservation-icon-TC9R47.jpg" alt="book now" width="100%" height="400"  />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <p>
                <b>Specialization : </b>
                {doctor.specialization}
              </p>
              <p>
                <b>Experience : </b>
                {doctor.experience}
              </p>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>
              <p>
                <b>Fee per visit : </b>
                {doctor.feePerConsultation}
              </p>
              <div className="d-flex flex-column pt-2">
                <DatePicker format="DD-MM-YYYY" />
                <TimePicker.RangePicker format="HH:mm" className="mt-3" />
                <Button className="primary-button mt-3" onClick={bookNow}>
                  Book Appointment
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
