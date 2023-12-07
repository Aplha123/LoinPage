const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email= req.body.email

    console.log(firstName,lastName,email)
     const data={
        members:[
            {
              email_address:email,
              status:"subscribed",
              merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
              }
            }
        ]
    }

     const jsonData = JSON.stringify(data)
     const url = "https://us13.api.mailchimp.com/3.0/lists/a25c87e787"
     const options = { 
        method: "POST",
        auth: "chetanya123:a7db23a8ff4d0fc77131223dc0a06df6-us13"
     }

    const request= https.request(url,options,function(response){

        if ( response.statusCode ===200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })

       request.write(jsonData)
       request.end();
})

















app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at port 3000" )
})

// a7db23a8ff4d0fc77131223dc0a06df6-us13
// a3d39a42abaec41510af89f99c2443eb-us13
// a25c87e787

// 1083c33691b22bd6b28f8b9d1e92ea73-us13
