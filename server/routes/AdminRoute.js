const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const User = require("../models/userModel");
const Doctor = require("../models/doctorModel")

router.get("/get-all-doctors", auth , async (req, res) => {
  try {
    const doctors = await Doctor.find({});
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

router.get("/get-all-users", auth , async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
        massage:"Users fetched Successfully",
        success:true,
        data:users
    })
  } catch (error) {
    console.log(error);
    res.send(500).send({ massage: "Error applying user account", success: false });
  }
});

router.post("/change-doctor-account-status", auth , async (req, res) => {
    try {
      const {doctorId , status} = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId,{
        status,
      })
      const user = await User.findOne({_id:doctor.userId})
      const unseenNotifications = user.unseenNotifications
    unseenNotifications.push({
      type:"new-doctor-request-changed",
      massage: `Your Doctor account has been ${status}`,
      onClickPath : "/notifications"
    })
    user.isDoctor = status === "approved" ? true : false;
    await user.save()


    res.status(200).send({
        massage:"Doctor status has updated successfully",
        success:true,
        data:doctor
    })
    } catch (error) {
      console.log(error);
      res.send(500).send({ massage: "Error applying user account", success: false });
    }
  });


module.exports = router;
