"use strict";

const express = require("express");
const { buildTx, sendTx } = require("../controllers/tx");

const router = express.Router();

router.post("/build", buildTx);
router.post("/send", sendTx);

module.exports = router;
