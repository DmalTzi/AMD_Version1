const router = require("express").Router()
const {firstlogin, login, logout, sendMessageToUser, sendMessageToUserByAdmin} = require("../controllers/lineController")
const {appointment, emergency, report} = require("../controllers/featureController")
const {student, admin} = require("../middlewares/auth")

router.post("/first/login", firstlogin)
router.post("/login", login)
router.post("/logout",student, logout)

router.post("/send/line/msg", student, sendMessageToUser)
router.post("/appointment",student, appointment)
router.post("/emergency",student, emergency)
router.post("/report",student, report)

module.exports = router
