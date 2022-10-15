const authRoute = (ctx, next) => {
    if(ctx.isAuthenticated()){
        return next();
    }
    return ctx.redirect('/login');
}

export default authRoute;