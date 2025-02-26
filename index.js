const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const nodemailer=require('nodemailer')


const server=express()
server.use(cors())
server.use(bodyParser.json())


server.post('/sendemail',async(req,res)=>{
    const{fullName,emailTo,subject,message}=req.body
    try{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"rishikamamdyal@gmail.com",
                pass:"zqqt ccrz tgtf czyh"
            }
        })
        
        const emailTemplate=`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
   <style>
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Lusitana:wght@400;700&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&display=swap');
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: Space Grotesk;
        }
        .container{
            width: 85%;
            padding: 0px 0px;
            margin: 20px auto;
            gap: 20px;
            border: 1px solid #c59d9d;
            background: aliceblue;
        }
        .header{
        
            background: teal;
            overflow: hidden;
            padding: 20px;
            text-align: center;
        }
        .header h2{
            font-size: 22px;
            color: aqua;
            font-weight: 500;
        }
        .container .mail-content{
    background: aliceblue;
            padding: 40px 30px;
            line-height: 30px;
            
        }
        .mail-content p{

            font-size: 15px;
            font-weight: 400;
        }
       .mail-content p strong{
        color: rgb(13, 73, 73);
        }
        .mail-footer{
            width: 100%;
            padding: 20px 30px;
            text-align: right;
            margin-right: 100px;
        }
        .mail-footer p{
            font-size: 15px;
            font-weight: 500;
        }
        .container .footer{
            margin-top: 30px;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Message From Your Portfolio Website..</h2>
        </div>
        <div class="mail-content">
            <p>Hello Rishika ..!! I am <strong> ${fullName}</strong></p>
            <h3> Email Address- ${subject}</h3>
            <p>I hope you're doing well. I just Want to tell you, </p>
                 <p>${message}</p>
        </div>
        <div class="mail-footer">
            <p>Best regards,</p>
            <p>${fullName}</p>
             
        </div>
        <div class="footer">
        All rights reserved 2025 &copy by : Rishika Mamdyal | Portfolio
        </div>
    </div>
    
</body>

</html>
            `

            const mailOptions={
                from:"Resume Portfolio <rishikamamdyal@gmail.com>",
                to:'rishikamamdyal@gmail.com',
                subject: `${fullName} is waving at you 👋`,
                message:message,
                html:emailTemplate,
                
        }
        
        await transporter.sendMail(mailOptions)
        res.status(200).send({status:true,message:"Email send successfully..!!"})
        
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:false,message:"Internal Server Error"})
    }
})

server.listen(5000,()=>{
    console.log("Server started listning on port no 5000")
})