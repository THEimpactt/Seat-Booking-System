exports.mainDashboard = (req, res) => {
  res.render('dashboard', { isLoggedin: req.session.isLoggedin || false });
}