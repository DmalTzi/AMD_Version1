const router = require("express").Router()
const {mergePersonnelApi} = require("../controllers/drugController")
const {detailPersonnel, accept, unaccept, toExcel} = require("../controllers/adminController")
const {mergePersonnelAppointmentApi, mergePersonnelEmergencyApi, mergePersonnelReportApi} = require("../controllers/featureController")
const {admin} = require("../middlewares/auth")
const { sendMessageToUserByAdmin } = require("../controllers/lineController")

router.get("/merge", admin, mergePersonnelApi)
router.get("/merge/appointment", admin, mergePersonnelAppointmentApi)
router.get("/merge/emergency", admin, mergePersonnelEmergencyApi)
router.get("/merge/report", admin, mergePersonnelReportApi)

router.get("/detail/:username", admin, detailPersonnel)
router.get("/export/excel", admin, toExcel)

router.put("/detail/accept/:serial", admin, accept)
router.put("/detail/unaccept/:serial", admin, unaccept)
router.post("/send/line/msg/admin", admin, sendMessageToUserByAdmin)

module.exports = router