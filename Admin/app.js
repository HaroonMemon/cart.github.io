var dish_name= document.getElementById("pro_name");
var price= document.getElementById("pro_price");
var dish_img= document.getElementById("pro_img");
var add =document.getElementById("add");
var product= document.getElementById("product");


// add.addEventListener("click", async function(){
//   event.preventDefault();
//   var key = await firebase.database().ref("Dishes").push().key
//   var obj = {
//     Dish_Name:dish_name.value,
//     Price:price.value,
//     Img_Url:dish_img.value,
//     Product_Key:key
//   }
//   if(dish_name.value == null || price.value == null ||dish_img.value == ""){
//     alert("Please Fil All The Fields");
//   }
//   else{
//   firebase.database().ref("Dishes").child(key.toString()).set(obj)
//   console.log(obj);
//   }
// })


// add.addEventListener("click", async function () {
//   event.preventDefault();
//   var key = await firebase.database().ref("Dishes").push().key

//   var obj={
//     Dish_Name:dish_name.value,
//     Price:price.value,
//     Img_Url:dish_img.value,
//     Product_key: key
//   }

//   console.log(obj);
//   await  firebase.database().ref("Dishes/").child(key.toString()).set(obj);


// })

  

add.addEventListener("click", async function () {
  event.preventDefault()
    var key = await firebase.database().ref("Dishes").push().getkey();

    var obj={
        Dish_name:dish_name.value,
        Price:price.value,
        // Img_Url:imgurl,
        Product_key:key
    }
    console.log(obj);

    await firebase.database().ref("Dishes").child(key.tostring()).set(obj)
    window.location.reload();
})

    firebase.database().ref("Dishes").once("value",(snap)=>{
    // console.log(snap.toJSON())
    if(snap.toJSON()!=null){

    var value = Object.values(snap.toJSON())//object to array 
    // console.log(value)

    value.map((v,i)=>{
        console.log(v)
        product.innerHTML+=`
        <div class="col">
          <div class="card h-100 bg-dark">
            <img src="${v.img_Url}" class="card-img-top" alt="...">
            <div class="card-body bg-dark">
              <h5 class="card-title">${v.Dish_Name}</h5>
              <p class="card-text">${v.Price}</p>
            </div>
            <div class="card-footer bg-dark">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                id=${v.Product_Key} ONCLICK ="edit_pro(this)">Edit</button>
              <button type="button" class="btn btn-primary" id=${v.Product_Key} ONCLICK ="delete_pro(this)">Delete</button>
            </div>
          </div>
        </div>
        `
    })
    }
    
})

async function delete_pro(e){
    console.log(e.id)
   await  firebase.database().ref("Dishes").child(e.id).remove()
   window.location.reload()
}

function edit_pro(e){
    console.log(e.id)
    localStorage.setItem("Current_Pid",e.id)
    // window.location.href="Edit_Product.html"
}
function logout(){
  
}
