$(".log-in").click(function () {
    $(".signIn").addClass("active-dx");
    $(".signUp").addClass("inactive-sx");
    $(".signUp").removeClass("active-sx");
    $(".signIn").removeClass("inactive-dx");
});
$(".back").click(function () {
    $(".signUp").addClass("active-sx");
    $(".signIn").addClass("inactive-dx");
    $(".signIn").removeClass("active-dx");
    $(".signUp").removeClass("inactive-sx");
});



$(document).ready(function () {
    let i = 1;

    $("#signUp_name").on("click", () => {

        $("#signUp_name").css({
            "border-bottom": "1px solid #ffc185",
        })
    })
    $("#signUp_email").on("click", () => {
        $("#signUp_email").css({
            "border-bottom": "1px solid #ffc185",
        })
    })
    $("#signUp_pass").on("click", () => {
        $("#signUp_pass").css({
            "border-bottom": "1px solid #ffc185",
        })
    })
    $("#signUp_verify").on("click", () => {
        $("#signUp_verify").css({
            "border-bottom": "1px solid #ffc185",
        })
    })
    $("#gender").on("click", () => {
        $("#gender").css({
            "border-bottom": "1px solid #ffc185",
        })
    })

    $("login_name").on("click", () => {
        console.log(11111111111111);
        $("login_name").css({
            "border-bottom": "1px solid #ffc185",
        })
    })
    $("login_pass").on("click", () => {
        $("login_pass").css({
            "border-bottom": "1px solid #ffc185",
        })
    })
    $("#signUp_btn").click(function (e) {
        let signUp_name = $("#signUp_name");
        let signUp_email = $("#signUp_email");
        let signUp_pass = $("#signUp_pass");
        let signUp_verify = $("#signUp_verify");
        let gender = $("#gender");

        let array = [signUp_name, signUp_email, gender, signUp_pass, signUp_verify];
        let array2 = ["signUp_name", "signUp_email", "gender", "signUp_pass", "signUp_verify"];
        for (const key in array) {
            console.log(key);
            console.log(array[key].val());

            if (array[key].val() === "" || array[key].val() === "Gender") {

                $(`#${array2[key]}`).css({
                    "border-bottom": "2px solid #ff1818",
                })

            } else if (array[key].val() !== "" || array[key].val() !== "Gender") {

                $(`#${array2[key]}`).css({
                    "border-bottom": "1px solid #ffc185",
                })

            }
        }

        if (check_input(array) === true) {
            let user = {
                userName: $(signUp_name).val(),
                password: $(signUp_pass).val(),
                email: $(signUp_email).val(),
                gender: $(gender).val(),
                isLoggedIn: false,
                user_agent: ""
            }
            $.ajax({
                type: "POST",
                url: "/login/signUpUser",
                data: JSON.stringify(user),
                // dataType: "application/json",
                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: `${$(signUp_name).val()}`,
                        text: 'Your Account was successfully signed in',
                        // footer: '<a href>Why do I have this issue?</a>'
                    })
                    window.location.replace("/login");
                },

                error: function (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'UserName or Password is incorrect!',
                        // footer: '<a href>Why do I have this issue?</a>'
                    })
                },
            });
        }

    });
    $("#login_btn").click(function (e) {
        let login_name = $("#login_name");
        let login_pass = $("#login_pass");
        let array = [login_name, login_pass];
        let array2 = ["login_name", "login_pass"];


        for (const key in array) {
            if (array[key].val() === "") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please fill in all fields',
                    showConfirmButton: false,
                    timer: 1500
                })
                $(`#${array2[key]}`).css({
                    "border-bottom": "2px solid #ff1818",
                })

            } else {

                $(`#${array2[key]}`).css({
                    "border-bottom": "1px solid #ffc185",
                })

            }
        }




        if (login_name.val() !== "", login_pass.val() !== "") {
            let user = {
                userName: $(login_name).val(),
                password: $(login_pass).val(),
            }
            $.ajax({
                type: "POST",
                url: "/login/LoginUser",
                data: JSON.stringify(user),
                // dataType: "application/json",
                success: function (response) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your are login now',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location.replace("/profile");
                },

                error: function (err) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'This user or password is invalid',
                        showConfirmButton: false,
                        timer: 1500
                    })

                },
            });
        }


    });









})




function check_input(array) {

    if ($(signUp_name).val() !== "" && $(signUp_email).val() !== "" && $(signUp_pass).val() !== "" && $(signUp_verify).val() !== "" && $(gender).val() !== "Gender") {
        if ($(signUp_pass).val() !== $(signUp_verify).val()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Password is not match!',
                footer: '<a href>Why do I have this issue?</a>'
            })
            return false;
        }
        return true;
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please fill in all fields',
            showConfirmButton: false,
            timer: 1500
        })
        return false;
    }

}