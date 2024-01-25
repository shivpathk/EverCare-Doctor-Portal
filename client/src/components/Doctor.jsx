import React from "react";
import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor }) => {
    const navigate = useNavigate()
  return (
    <div className="card p-2 cursor-pointer" onClick={()=>navigate(`/book-appointment/${doctor?._id}`)}>
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr/>
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
    </div>
  );
};

export default Doctor;
