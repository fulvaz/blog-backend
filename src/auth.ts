import passport from 'koa-passport';

const fetchUser = (() => {
    // This is an example! Use password hashing in your project and avoid storing passwords in your code
    const user = { id: 1, username: 'test', password: 'test' }
    return async function () {
        return user
    }
})();

// 猜测: 前端每次都在HTTP header中放Authorization7 passport会自动帮我读取bearer的内容, 然后校验, 如果校验通过就执行1
// 但不科学的是1只有个token, 怎么取用户啊?
passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    try {
        
        const user = await fetchUser()
        done(null, user)
    } catch (err) {
        done(err)
    }
})

const Strategy = require('passport-http-bearer').Strategy
passport.use(new Strategy(
    // 1
    function (token, cb) {
        db.users.findByToken(token, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user);
        });
    })
);