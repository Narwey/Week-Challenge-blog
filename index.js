const express = require('express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static('public'));

  const JwtStr = passportJWT.Strategy ;
  const ExtractJwt = passportJWT.ExtractJwt;

  passport.use(new JwtStr(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JwtStr,
    },
    (jwtPayload, done)=> {
        if(jwtPayload.id === users.id) {
            return done(null , users);
        }else{
            return done(null, false);
        }
    }

  )
    );

const blogRoutes = require('./blogRoutes.js');
const userRoutes = require('./userRoutes.js');

app.use(userRoutes);
app.use(blogRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  





    