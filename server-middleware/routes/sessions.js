const { Router } = require("express");
const router = Router();

require("dotenv").config();
const fetch = require("node-fetch");
const crypto = require("crypto");

const Session = require("../modals/session");
const User = require("../modals/user");
const Token = require("../modals/token");

router.get("/me", middleware("authenticated"), (req, res) => {
  res.json(req.user);
});

router.delete("/me", middleware("authenticated"), async (req, res) => {
  await Session.remove({ session: req.cookies.token });
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ ok: "logged out" });
});

const Auth = {};

router.put("/login", async (req, res) => {
  console.log("e", process.env.studioId);
  let resp = await fetch(
    `https://api.scratch.mit.edu/studios/${
      process.env.studioId || 30078251
    }/comments?limit=40`
  );
  let comments = await resp.json();

  let tk = await Token.findOne({ private: req.body.private });
  if (!tk) return res.status(400).json({ message: "invalid token" });

  for (let comment of comments) {
    if (comment.content.trim() == tk.public) {
      await Token.deleteOne({ private: req.body["private"] });
      let { username } = comment.author;

      let user = User.findOne({ username });
      if (!user) {
        let scratchUser = await fetch(
          `https://api.scratch.mit.edu/users/${username}`
        ).then((res) => res.json());

        if (scratchUser.code == "NotFound") {
          res.status(400).json({ message: "User is not a scratch user!" });
        }

        user = new User({
          id: scratchUser.id,
          username: scratchUser.username,
          admin: false,
        });
        try {
          await user.save();
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }

      let session = crypto.randomBytes(20).toString("hex");
      res.cookie("token", session, { path: "/" });

      let userSession = new Session({ username, session });
      try {
        res.status(201).json(await userSession.save());
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

      return;
    }
  }

  res.status(400).json({ message: "comment in studio not found" });
});

router.put("/init", async (req, res) => {
  let publicCode = crypto.randomBytes(20).toString("hex");
  let privateCode = crypto.randomBytes(40).toString("hex");
  let token = new Token({
    public: publicCode,
    private: privateCode,
    createdAt: { type: Date, expires: 5 },
  });
  try {
    res.status(201).json(await token.save());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function middleware(type) {
  return async function (req, res, next) {
    console.log("start");
    let session = await Session.findOne({ session: req.cookies.token });
    if (!session) return res.status(403).json({ message: "Not logged in" });

    let user = await User.findOne({ username: session.username });
    console.log("middle");
    if (
      (user && user.admin && type == "admin") ||
      (user && type == "authenticated")
    ) {
      req.user = user;

      next();
      console.log("finish");
      return;
    }
    return res.status(403).json({ message: "Forbidden" });
  };
}
module.exports = router;
