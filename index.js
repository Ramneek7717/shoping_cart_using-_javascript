let shop=document.getElementById("shop");
console.log(shop);
let shop1=document.getElementById("shop1");
console.log(shop1);
// let basket=[];
let basket=JSON.parse(localStorage.getItem("data"))||[];
let generateShop=()=>{
 return (shop.innerHTML=shopItemsData.map((x)=>{
    let{id,name,price,desc,img}=x;
    let search=basket.find((x)=>x.id===id)||[];
    
    return `
    
    <div class="item" id=product-id-${id}>
        <img src=${img} alt="img1" width="220">
        <div class="details">
        <h3><!--${x.name}-->
            ${name}           </h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$<!--${x.price}-->
                 ${price}</h2>
            <div class="buttons">  
                <!--<i onclick="decrement(${id})" class="fa-solid fa-minus"></i>-->
                <div  id=${id} class="quantity"><button onclick="increment(${id})" >add cart</button></div>
                
               <!-- <i onclick="increment(${id})" class="fa-solid fa-plus" class="quantity"></i>-->
            </div>
        </div>
        </div>
    </div>`
 }) 
 .join(""));

};
generateShop();
let increment=(id)=>{
    // console.log("increment");
    // console.log(id);
    let selectedItem=id;
    // console.log(selectedItem.id);
    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search===undefined)
    {
        basket.push({
            id:selectedItem.id,
            item:1,
    });}
    else
    {
        search.item+=1;
    }
    // basket.push({
    //     id:selectedItem.id,
    //     item:1,
   // });
    // console.log(basket);
        //localStorage.setItem("anyname to data-this is the key of data ");
     //   localStorage.setItem("data",basket); //not read the data if we read add json.stringify 
    
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
};
let decrement=(id)=>{
    // console.log("decrement");
    // console.log(id);
      let selectedItem=id;
    // console.log(selectedItem.id);
    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search===undefined) return;//stop the process 
    else if(search.item===0)//search===undefined
   { 
    return;
    // {
    //     basket.push({
    //         id:selectedItem.id,
    //         item:1,
    // })}
   }else
    {
        search.item-=1;
    }

    // console.log(basket);
    update(selectedItem.id);
    basket=basket.filter((x)=>x.item!==0);
 
    localStorage.setItem("data",JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
};
let update=(id)=>{
    // console.log("the update function is running");
    // console.log(id);
    let search=basket.find((x)=>x.id===id);
    // console.log(search);
    console.log(search.item);
    //document.getElementById(id).innerHTML=search.item;
    calculation();
    generateCartItems();

    

};

let calculation=()=>{
 {
    let cartIcon=document.getElementById("cartAmount");
    // console.log("calculation function is running");
    // console.log(basket);
    // console.log(basket.map(()=>x.item));
    //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);

};
}
calculation();
let label = document.getElementById("label");
let shoppingCart=document.getElementById('shopping-cart');
//  console.log(shopItemsData);
console.log(basket);
let generateCartItems = () => {
    if (basket.length !== 0) {
     return (shoppingCart.innerHTML=basket.map((x)=>{
        // console.log(x);
        let {id,item}=x;
        let search=shopItemsData.find((y)=>y.id===id)||[];
         let {img,name,price}=search;
        return `
        <!-- <div class="cart-item">hello</div>-->
        <div class="cart-item">
        <img width="100px" src=${img} alt="">
         <div class="details">
          
         <div class="title-price-x">
           <h4 class="title-price">
            <p>${name}</p>
            <p class="cart-item-price">$ ${price}</p>
           </h4>
           <i onclick="removeItem(${id})" class="fa-solid fa-trash-can"></i>
          
         </div>
         <div class="buttons">  
         <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
         <div  id=${id} class="quantity">${item}</div>
         <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
     </div>
         
         <h6>$ ${item*search.price}</h6>
         
         </div>
        </div>
        `;
        //   console.log("basket is not empty");  
     
    })
     .join(""));

    }
    else
    {
        shoppingCart.innerHTML=``;
        label.innerHTML=`
         
         <img  class="img1" src="images1/shopingcartmen.png" alt="Shopping cart men"> 
         <h2 class="h21" >You don't have any items in your cart </h2>
         <!--<p class="p1">Your favourite items are just a click away</p>
         <a href="index.html">
            <button class="HomeBtn">cart is epmty<button>
         </a>-->`;
        // console.log("basket is totally empty");
        
    }
    
    
   }   
generateCartItems();
let removeItem=(id)=>{
 let selectedItem=id;
//  console.log(selectedItem);
 console.log(selectedItem.id);
 basket=basket.filter((x)=>x.id!==selectedItem.id);
 generateCartItems();
 TotalAmount();
 calculation();
 localStorage.setItem("data",JSON.stringify(basket));
 generateCartItems();
 TotalAmount();
};
let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket.map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        }).reduce((x, y) => x + y, 0);
      // console.log(amount);
     label.innerHTML=`
     <h2>Total Bill:$ ${amount}</h2>
     <button class="checkout">Checkout</button>
     <button onclick="clearCart()" class="removeAll"> clear Cart</button>
     `;
    } else return  ;
  };
  let clearCart=()=>{
    basket=[];
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
    generateCartItems();
 };  
 
TotalAmount();
function function1()
{
    var x = document.getElementById('shopping-cart1');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } 
    else {
      x.style.visibility = 'hidden';
    }

}
function function2()
{
    var x = document.getElementById('shopping-cart1');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } 
    else {
      x.style.visibility = 'hidden';
    }

}

// // Get a reference to the shopping cart icon
// const cartIcon = document.querySelector('.fa-cart-shopping');

// // Get a reference to the shopping cart element
// const shoppingCart2 = document.getElementById('shopping-cart1');

// // Hide the shopping cart initially
// shoppingCart2.style.display = 'none';

// // Add an event listener to the cart icon
// cartIcon.addEventListener('click', function () {
//     // Toggle the visibility of the shopping cart
//     if (shoppingCart2.style.display === 'none') {
//         shoppingCart2.style.display = 'flex';
//     } else {
//         shoppingCart2.style.display = 'none';
//     }
// });
