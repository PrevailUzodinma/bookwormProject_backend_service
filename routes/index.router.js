const router = require ("express").Router();
const userRouter = require("../routes/user.router.js");
const ebookRouter = require("../routes/ebook.router.js");
const aiRouter = require("../routes/aiRoutes.js");

router.use("/users", userRouter);
router.use("/ebooks", ebookRouter);
router.use("/ai", aiRouter);

module.exports = router; 
