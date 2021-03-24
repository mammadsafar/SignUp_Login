$(document).ready(function () {





    $("#update_btn").click(function (e) {

        let email = $("#exampleInputEmail1").val();
        let password = $("#exampleInputPassword1").val();
        let gender = $("#gender").val();
        console.log(email);
        console.log(typeof password);
        console.log(typeof gender);
        let pass;
        let emailConf;
        if (!$("#exampleInputPassword1").val()) {
            pass = 0;
        } else {
            pass = $("#exampleInputPassword1").val();
        }
        if (!$("#exampleInputEmail1").val()) {
            emailConf = 0;
        } else {
            emailConf = $("#exampleInputEmail1").val();
        }


        let user_update = {
            userName: $($("#userName")).html(),
            email: emailConf,
            password: pass,
            gender: $("#gender").val()
        }

        $.ajax({
            type: "POST",
            url: "/login/update",
            data: JSON.stringify(user_update),
            // dataType: "dataType",
            success: function (response) {
                console.log(response);
                if (pass !== 0) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your password successfully changed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.replace("/login");
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your data successfully changed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.replace("/profile");
                }
            },
            error: function (err) {
                console.log(err);
            }
        });



    });




    $("#logOut_btn").click(function (e) {
        let login_name = $("#userName");




        let user = {
            userName: $(login_name).html(),
        }
        $.ajax({
            type: "POST",
            url: "/login/logout",
            data: JSON.stringify(user),
            // dataType: "application/json",
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your are Log Out now',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.replace("/login");
            },

            error: function (err) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'This user or password is invalid',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(err);
            },
        });


    });



});