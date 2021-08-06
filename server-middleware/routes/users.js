const { Router } = require("express");
const router = Router();

const User = require("../modals/user");

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  let user = await User.findOne({ username });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
