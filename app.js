var name1 = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var role = document.getElementById("role");
var signup = document.getElementById("signup");
var signin = document.getElementById("login");

// var getrole = role.value

signup.addEventListener("click", function () {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(async (user) => {
            // signed In
            alert("Sign Up Successfully")
            console.log(user.user.uid);
            var obj = {
                Name: name1.value,
                Email: email.value,
                Password: password.value,
                Role: role.value,
                Uid: user.user.uid
            }

            await firebase.database().ref(role.value + "/").child(user.user.uid).set(obj);
            if (role.value == "admin") {
                window.location.replace("./Admin/admin.html");
            }
            else {
                window.location.replace("./User/user.html");
            }

        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
});
signin.addEventListener("click", function () {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user1) => {
            // Signed In
            alert("login Successfully");
            firebase.database().ref("admin/").child(user1.user.uid)
            .once("value",(snap)=>{
                console.log(snap.toJSON());
                if(snap.toJSON() == null){
                    console.log("User Pannel");
                window.location.replace("./user/user.html");
            }
        
            else{
                console.log("Admin Pannel");
                window.location.replace("./Admin/admin.html");

            }
        })
        })
        .catch((err) => {
            console.log(err.code);
            alert(err.message);
        });
});