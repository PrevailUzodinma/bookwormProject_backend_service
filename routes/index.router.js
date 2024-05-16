const router = require ("express").Router();
const userRouter = require("./routes/user.router.js");
const ebookRouter = require("./routes/ebook.router.js");

router.use("/users", userRouter);
router.use("/ebooks", ebookRouter);

module.exports = router; 
