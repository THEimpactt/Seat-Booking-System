exports.getAdminPage = (req, res) => {
  res.render('adminPage', { isLoggedin: req.session.isLoggedin || false });
}