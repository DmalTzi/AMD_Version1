const router = require("express").Router()
const {update_drug_para, findSerial, usedSerial} = require("../controllers/drugController")
const {student} = require("../middlewares/auth")

router.post("/create",student, update_drug_para)

router.post("/find/serial", findSerial)

router.post("/used/serial", usedSerial)

module.exports = router