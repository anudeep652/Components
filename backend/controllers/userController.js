const login = (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  if (!email)
    return res.status(400).json({ error: "please fill all the fields" });

  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
    return res.status(200).json({ user: email });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

module.exports = login;
