
// const express = require('express');
// const axios = require('axios').default; 

// const usedRouter = express.Router();




// usedRouter.get('/usedcars/', (req,res)=>{
//   usedcarfunc(77001,50,res);
 
// })

// usedRouter.post('/usedcars/',(req,res) =>{
// console.log(req.body);
// usedcarfunc(req.body.zip,req.body.radius,res);
  
// // res.redirect('/usedcars')

// })

// const usedcarfunc = (zip,radius,res) =>{
// console.log(zip,radius)
//   let usedCar = { headers: { 
//             'Host': 'marketcheck-prod.apigee.net'
//           },
//         params: {
//           api_key: '2R1OVmDcZWEGzLQjI0McPJAi071xIWOn',
//           zip: zip,
//           radius: radius,
//           car_type: 'used',
//           start: 0,
//           rows: 40,
//           sort_order: 'asc',
    
    
//         }
//       }
    
//     axios.get('http://api.marketcheck.com/v2/search/car/active?',usedCar)
//     .then(function (response) {
//       // console.log(JSON.stringify(response.data));
      
     
     
//       res.render('usedcars.ejs',{
    
//         usedCarValue: response.data.listings
      
//       })
    
    
    
//     })
//     .catch(function (error) {
//         console.log(error);
//       });

// }

// module.exports = usedRouter;


