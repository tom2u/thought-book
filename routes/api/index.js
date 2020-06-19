const router = require("express").Router();
const commentRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const reactionRoutes = require("./reaction-routes");

router.use("/comments", commentRoutes);
// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionRoutes);

module.exports = router;
