 const salary = (workingHours: any,price: any)=>{
    if(workingHours === "0"){
       return 0
    }else{
    let num = workingHours.split(":");
    //console.log("after split for working hours");
    //console.log(num);
    let num2 = Number(num[1]) / 60;
   //  console.log(num2);
   //  console.log(Number(num[0]) + num2);
     return (Number(num[0]) + num2) * Number(price)
    }
  
  }

  export default salary;
