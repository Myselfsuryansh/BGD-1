const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const { studentModel } = require("../BGD/model/models");
// const { leadSchema } = require("../BGD/model/models");
const leadModel = require("../BGD/model/models");

const app = express();
app.use(bodyParser.json());

// const cors = require('cors')

mongoose
  .connect("mongodb://127.0.0.1:27017/Login")
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch(`Not Connected`);

app.get("/", (req, res) => {
  model
    .find()

    .exec()

    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err,
      });
    });
});
app.post("/leadinfo", async (req, res) => {
  let data = req.body;
  const LeadData = new leadModel({
    name: data.name,
    email: data.email,
    phone: data.phone,
    other: req.other,
  });
  const leadData = await LeadData.save();

  res.send({
    result: leadData,
  });
});

app.post("/newLeadMember", async (req, res) => {
  let data = req.body;
  const mainLead = await leadModel.findOne({
    name: data.name,
    email: data.email,
    phone: data.phone,
    other: data.other
  });
  if (mainLead) {
    if (mainLead.webhookDetails == null) {
      mainLead.webhookDetails = [];
    }
    mainLead.webhookDetails.push({
      eventName: data.eventName,
      endpointUrl: data.endpointUrl,
    });
    mainLead: await leadModel.findOneAndUpdate(
      {
        name: mainLead.name,
        email: mainLead.email,
        phone: mainLead.phone,
        other: mainLead.other
      },
      req.body
    );
    mainLead,
      {
        returnOriginal: false,
      };
  } else {
    console.log("No Name");
  }

  res.send({
    result: mainLead,
  });
});

app.listen(3000, (req, res) => {
  console.log("Express API is running at port 3000");
});
