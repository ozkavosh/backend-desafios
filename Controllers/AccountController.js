export default class AccountController {
  async getIndex(ctx) {
    await ctx.render("layouts/index", { nombre: ctx.state.user.username });
  }

  async getLogin(ctx) {
    if (ctx.isUnauthenticated()) {
      await ctx.render("layouts/login", { error: ctx.flash('error')[0] });
    } else {
      ctx.redirect("/");
    }
  }

  postLogin(ctx) {
    ctx.redirect("/");
  }

  async getSignUp(ctx) {
    await ctx.render("layouts/signup", { error: ctx.flash('error')[0] });
  }

  postSignUp(ctx) {
    ctx.redirect("/login");
  }

  getLogout(ctx) {
    ctx.logout({ keepSessionInfo: false }, (err) => {
      if (err) console.log(err);
      ctx.redirect("/login");
    });
  }
}
