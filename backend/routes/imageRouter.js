const controller = require("../controllers/imageController");

router.post("/", upload.single("image"), controller.post);
router.post("/test", console.log(req));
