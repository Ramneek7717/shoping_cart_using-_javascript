// silder start
const left=document.querySelector('.left');
const right=document.querySelector('.right');
const silder=document.querySelector('.silder');
let slideNumber=1;
const images=document.querySelectorAll('.image');
const length=images.length;
const bottom=document.querySelector('.bottom');
// start form dots
for(let i=0;i<length;i++)
{
   const div=document.createElement('div');
   div.className='button';
   bottom.appendChild(div);
}
const buttons=document.querySelectorAll('.button');
buttons[0].style.backgroundColor='white';
const resetBg=()=>{
   buttons.forEach((button)=>{
       button.style.backgroundColor='transparent';
       button.addEventListener('mouseover',stopSlideShow);
       button.addEventListener('mouseout',startSlideShow);
   });
};
buttons.forEach((button,i)=>
{
  button.addEventListener('click',()=>{
   
    silder.style.transform=`translateX(-${i*800}px)`;
   //  console.log(silder.style.transform=`translateX(-${i*800}px)`);
     resetBg();
     slideNumber=i+1;
     button.style.backgroundColor='white';   
  });
});
const chanegcolor=()=>{
   resetBg();
   buttons[slideNumber-1].style.backgroundColor='white';
};
//ends dots
const nextSlide=()=>{
   silder.style.transform=`translateX(-${slideNumber*800}px)`;
   slideNumber++;
}
const getFirstSilde=()=>{
   silder.style.transform=`translateX(0px)`;
   slideNumber=1; 
}
const prevSlide=()=>{
   silder.style.transform=`translateX(-${(slideNumber-2)*800}px)`;
   slideNumber--;
}
const getLastSilde=()=>{
   silder.style.transform=`translateX(-${(length-1)*800}px)`;
   slideNumber=length; 
}
right.addEventListener('click',()=>{
   if(slideNumber<length)
   {
     nextSlide();
   }
   else
   {
       getFirstSilde();
   }
   // slideNumber<length?nextSlide():getFirstSilde();
   chanegcolor();    
});
left.addEventListener('click',()=>{
   slideNumber>1?prevSlide():getLastSilde();
   chanegcolor(); 
});
//start Auto slider
let slideInterval;
const startSlideShow=()=>{
   slideInterval=setInterval(()=>{
       slideNumber<length?nextSlide():getFirstSilde();  
       chanegcolor();
   },2000);

};
const stopSlideShow=()=>{
   clearInterval(slideInterval);
};
const playimagesong=()=>{
    console.log(silder);
  };
startSlideShow();
silder.addEventListener('click',playimagesong)
silder.addEventListener('mouseover',stopSlideShow);
silder.addEventListener('mouseout',startSlideShow);
left.addEventListener('mouseover',stopSlideShow);
left.addEventListener('mouseout',startSlideShow);
right.addEventListener('mouseover',stopSlideShow);
right.addEventListener('mouseout',startSlideShow);
// end slider
