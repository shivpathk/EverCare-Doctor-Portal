const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const User = require("../models/userModel");
const Doctor = require("../models/doctorModel")
const Appointment = require("../models/appointmentModel")

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .send(200)
        .send({ massage: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // console.log(req.body.password);
    const newuser = new User(req.body);
    await newuser.save();
    console.log("user created");
    res.send(200).send({ massage: "User Created Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error Creating User", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findone({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ massage: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ massage: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ massage: "Login Successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ massage: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", auth, async (req,res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ massage: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ massage: "Error getting user info", success: false, error });
  }
});

router.post("/apply-doctor-account",auth ,async (req, res) => {
  try {
    const newdoctor = new Doctor({...req.body,status:"pending"})
    await newdoctor.save();
    const adminUser = await User.findOne({isAdmin:true})
    const unseenNotifications = adminUser.unseenNotifications
    unseenNotifications.push({
      type:"new-doctor-request",
      massage: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data:{
        doctorId : newdoctor._id,
        name : newdoctor.firstName + " " + newdoctor.lastName
      },
      onClickPath : "/admin/doctorslist"
    })
    await User.findByIdAndUpdate(adminUser._id , {unseenNotifications})
    res.status(200).send({
      success:true,
      massage:"Doctor Account Applied Successfully"
    })
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error Applying The Doctor Account", success: false });
  }
});

router.post("/mark-all-notifications-as-seen",auth ,async (req, res) => {
  try {
    const user = await User.findOne({_id:req.body.userId})
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications)
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save()
    updatedUser.password = undefined
    res.status(200).send({
      success:true,
      massage:"All notifications are marked as seen",
      data : updatedUser
    })
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error Applying The Doctor Account", success: false });
  }
});

router.post("/delete-all-notifications",auth ,async (req, res) => {
  try {
    const user = await User.findOne({_id:req.body.userId})
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save()
    updatedUser.password = undefined
    res.status(200).send({
      success:true,
      massage:"All notifications are cleared",
      data : updatedUser
    })
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error Applying The Doctor Account", success: false });
  }
});

router.get("/get-all-approved-doctors", auth , async (req, res) => {
  try {
    const doctors = await Doctor.find({status:"approved"});
    res.status(200).send({
        massage:"Doctors fetched Successfully",
        success:true,
        data:doctors
    })
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error applying doctor account", success: false });
  }
});

router.post("/book-appointment", auth , async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save()
    // pushing notification to doctor based on his id
    const user = await User.findOne({_id:req.body.doctorInfo.userId})
    user.unseenNotifications.push({
      type:"new-appointment-request",
      massage:`${newAppointment.req.body.userInfo.name} has requested an appointment`,
      onClickPath : '/doctor/appointments'
    })
    await user.save()
    res.status(200).send({
      massage:"Appointment booked Successfully",
      success:true
    })
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error booking appointment", success: false });
  }
});

router.get("/get-appointments-by-user-id", auth , async (req, res) => {
  try {
    const appointments = await Appointment.find({userId : req.body.userId});
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

module.exports = router;
