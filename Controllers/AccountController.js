export default class AccountController {
  getIndex(req, res) {
    res.render("layouts/index", { nombre: req.user.username });
  }

  getLogin(req, res) {
    if (req.isUnauthenticated()) {
      res.render("layouts/login", { error: req.flash("error")[0] });
    } else {
      res.redirect("/");
    }
  }

  postLogin(req, res) {
    res.redirect("/");
  }

  getSignUp(req, res) {
    res.render("layouts/signup", { error: req.flash("error")[0] });
  }

  postSignUp(req, res) {
    res.redirect("/login");
  }

  getLogout(req, res) {
    req.logout({ keepSessionInfo: false }, (err) => {
      if (err) console.log(err);
      res.redirect("/login");
    });
  }
}
