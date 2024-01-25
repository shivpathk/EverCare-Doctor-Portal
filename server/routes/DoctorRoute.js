const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const Doctor = require("../models/doctorModel")
const Appointment = require("../models/appointmentModel")
const User = require("../models/userModel")

router.post("/get-doctor-info-by-user-id", auth, async (req,res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.body.userId });
      user.password = undefined;
        res.status(200).send({
          success: true,
          masssage: "Doctor Info fetched Succcessfully",
          data: doctor,
        });
    } catch (error) {
      res
        .status(500)
        .send({ massage: "Error getting doctor info", success: false, error });
    }
  });
router.post("/get-doctor-info-by-id", auth, async (req,res) => {
    try {
      const doctor = await Doctor.findOne({ _id: req.body.doctorId });
      user.password = undefined;
        res.status(200).send({
          success: true,
          masssage: "Doctor Info fetched Succcessfully",
          data: doctor,
        });
    } catch (error) {
      res
        .status(500)
        .send({ massage: "Error getting doctor info", success: false, error });
    }
  });

  router.post("/update-doctor-profile", auth, async (req,res) => {
    try {
      const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId },req.body);
      user.password = undefined;
        res.status(200).send({
          success: true,
          masssage: "Doctor Profile Updated Succcessfully",
          data: doctor,
        });
    } catch (error) {
      res
        .status(500)
        .send({ massage: "Error getting doctor info", success: false, error });
    }
  });

  router.get("/get-appointments-by-doctor-id", auth , async (req, res) => {
    try {
      const doctor = await Doctor.findOne({userId:req.body.userId})
      const appointments = await Appointment.find({doctorId:doctor._id});
      res.status(200).send({
          massage:"Appointments fetched Successfully",
          success:true,
          data:appointments
      })
    } catch (error) {
      console.log(error);
      res.send(500).send({ massage: "Error getting appointments", success: false });
    }
  });

  router.post("/change-appointment-status", auth , async (req, res) => {
    try {
      const {appointmentId , status} = req.body;
      const appointment = await Appointment.findByIdAndUpdate(appointmentId,{
        status,
      })
      const user = await User.findOne({_id:appointment.userId})
      const unseenNotifications = user.unseenNotifications
    unseenNotifications.push({
      type:"appointment-request-changed",
      massage: `Your Appointment account has been ${status}`,
      onClickPath : "/appointments"
    })
    await user.save()


    res.status(200).send({
        massage:"Appointment status has updated successfully",
        success:true
    })
    } catch (error) {
      console.log(error);
      res.send(500).send({ massage: "Error changing the appointment status", success: false });
    }
  });




module.exports = router;