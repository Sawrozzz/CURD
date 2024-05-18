const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "access denied" });
  }
  try {
    // console.log("token", token);
    const isCorrect = jwt.verify(token, "shh");
    console.log(isCorrect);
    req.body.userid = isCorrect.userid;

    req.body.email = isCorrect.email;

    next();
  } catch (error) {
    res.status(401).json({
      error: {
        errormessage: error,
      },
    });
  }
}

module.exports = authenticate;
