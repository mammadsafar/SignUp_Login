const express = require('express');
const router = express.Router();
const path = require('path');

const fs = require('fs');


router.get('/', function (req, res) {

    fs.readFile(path.join(__dirname, "../database/users.json"), "utf8", (err, users) => {
        if (err) {
            return res.status("400").send("oops! something went wrong");
        };

        users = JSON.parse(users);

        for (const key in users) {

            if (users[key].isLoggedIn === true && users[key].user_agent === req.headers['user-agent']) {
                let user = users[key];
                res.redirect('/profile');

            }
        }

        res.render('pages/login');


    })

})
router.post('/logout', function (req, res) {

    req.on("data", function (User) {
        User = JSON.parse(User);

        fs.readFile(path.join(__dirname, "../database/users.json"), "utf8", (err, users) => {
            if (err) {
                return res.status("400").send("oops! something went wrong");
            };

            users = JSON.parse(users);

            if (!users) return res.status("404").send("users Not Found");




            // todo for cookies

            for (const key in users) {

                if (users[key].userName === User.userName && users[key].isLoggedIn === true && users[key].user_agent === req.headers['user-agent']) {

                    users[key].isLoggedIn = false
                    users[key].user_agent = ""
                    fs.writeFile(path.join(__dirname, "../database/users.json"), JSON.stringify(users), (err) => {
                        if (err) return res.status("404");
                        console.log("===========> ok write");
                    });
                    res.status(200);
                    return res.end();
                }
            }


            res.status("400").send("User Invalid");
            res.end();


        })
    })

})
router.post('/LoginUser', function (req, res) {

    req.on("data", function (User) {
        User = JSON.parse(User);



        fs.readFile(path.join(__dirname, "../database/users.json"), "utf8", (err, users) => {
            if (err) {
                return res.status("400").send("oops! something went wrong");
            };

            users = JSON.parse(users);
            if (!users) return res.status("404").send("users Not Found");

            if (check_user(User, users) === true) {

                // todo for cookies


                for (const key in users) {
                    if (users[key].userName == User.userName) {
                        users[key].user_agent = req.headers['user-agent'];
                        users[key].isLoggedIn = true;
                    }
                }


                fs.writeFile(path.join(__dirname, "../database/users.json"), JSON.stringify(users), (err) => {
                    if (err) return res.status("404");

                });
                res.status(200);

                res.end();
            } else {
                User.user_agent = "";
                User.isLoggedIn = false;
                res.status("400").send("User Invalid");
                res.end();
            }

        })
    })

})

router.post('/signUpUser', function (req, res) {


    req.on("data", function (nweUser) {
        nweUser = JSON.parse(nweUser);


        fs.readFile(path.join(__dirname, "../database/users.json"), "utf8", (err, users) => {
            if (err) {
                return res.status("400").send("oops! something went wrong");
            };
            users = JSON.parse(users);
            if (!users) return res.status("404").send("users Not Found");

            if (check_userName(nweUser, users) === false) {
                users.push(nweUser);

                fs.writeFile(path.join(__dirname, "../database/users.json"), JSON.stringify(users), (err) => {
                    if (err) return res.status("404");

                });

                res.status(200);
                res.send("salam")
                res.end();
            } else {
                res.status("400").send("User Invalid");
                res.end();
            }



        })
    })

})

router.post('/update', function (req, res) {
    req.on("data", function (User) {
        User = JSON.parse(User);

        fs.readFile(path.join(__dirname, "../database/users.json"), "utf8", (err, users) => {
            if (err) {
                return res.status("400").send("oops! something went wrong");
            };
            users = JSON.parse(users);
            if (!users) return res.status("404").send("users Not Found");



            console.log(User);
            if (User.password !== 0) {
                for (const key in users) {
                    if (users[key].userName == User.userName) {
                        if (users.email !== 0) {
                            users[key].email = User.email;
                            users[key].gender = User.gender;
                            users[key].password = User.password;
                            users[key].isLoggedIn = false;
                            users[key].user_agent = "";
                        } else {
                            users[key].gender = User.gender;
                            users[key].password = User.password;
                            users[key].isLoggedIn = false;
                            users[key].user_agent = "";
                        }
                    }
                }
                console.log("===================================");
                console.log(users);
                console.log("===================================");
                fs.writeFile(path.join(__dirname, "../database/users.json"), JSON.stringify(users), (err) => {
                    if (err) return res.status("404");
                });
                console.log(users);

                res.status(200);
                res.send("Passwordchanged")
                // res.redirect('/login');
                res.end();

            } else if (User.password === 0) {

                for (const key in users) {
                    if (users[key].userName == User.userName) {
                        console.log(users[key]);

                        if (users.email !== 0) {
                            users[key].email = User.email;
                            users[key].gender = User.gender;
                        } else {
                            users[key].gender = User.gender;
                        }
                    }
                }
                console.log("===================================");
                console.log(users);
                console.log("===================================");

                fs.writeFile(path.join(__dirname, "../database/users.json"), JSON.stringify(users), (err) => {
                    if (err) return res.status("404");
                });
                console.log(users);

                res.status(200);
                res.send("salam")
                res.end();
            } else {
                res.status("400").send("User Invalid");
                res.end();
            }



        })
    })
})


function check_userName(nweUser, users) {
    for (const key in users) {
        if (users[key].userName === nweUser.userName) {
            return true;
        }
    }
    return false;
}

function check_user(User, users) {
    for (const key in users) {
        if (users[key].userName === User.userName && users[key].password === User.password) {
            return true;
        }
    }
    return false;
}





module.exports = router;