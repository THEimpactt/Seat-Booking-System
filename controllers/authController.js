exports.getLogin = (req, res) => {
  res.render('auth/loginPage', { isLoggedin: req.session.isLoggedin || false });
}

exports.isLoggedin = (req, res) => {
  req.session.isLoggedin = true;
  res.redirect('/');
}

exports.logout = (req, res) => {
  req.session.destroy(()=>{
    res.redirect('/');
  });
}