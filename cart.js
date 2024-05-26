let label = document.getElementById("label");
let shoppingCart=document.getElementById('shopping-cart');
//  console.log(shopItemsData);
let basket=JSON.parse(localStorage.getItem("data"))||[];
console.log(basket);
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
           <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
         </div>
         <div class="buttons">  
         <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
         <div  id=${id} class="quantity">${item}</div>
         <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
     </div>
         
         <h3>$ ${item*search.price}</h3>
         
         </div>
        </div>
        `;
        //   console.log("basket is not empty");  
     })
     .join(""));}
    else
    {
        shoppingCart.innerHTML=``;
        label.innerHTML=`
         <h2> Cart is Empty </h2>
         <a href="index.html">
          <button class="HomeBtn">Back to Home<button>

         </a>`;
        // console.log("basket is totally empty");
    }
   }
   generateCartItems();
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
     generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
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
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};
let update=(id)=>{
    // console.log("the update function is running");
    // console.log(id);
    let search=basket.find((x)=>x.id===id);
    // console.log(search);
    console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    TotalAmount();
};
let removeItem=(id)=>{
 let selectedItem=id;
//  console.log(selectedItem);
 console.log(selectedItem.id);
 basket=basket.filter((x)=>x.id!==selectedItem.id);
 generateCartItems();
 TotalAmount();
 calculation();
 localStorage.setItem("data",JSON.stringify(basket));
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
    } 
    else return;
  };
  let clearCart=()=>{
    basket=[];
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
  };  
 
TotalAmount();