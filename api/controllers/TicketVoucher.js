const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const {google} = require('googleapis');
// const transport = require('../transport.json')

// function ticketVoucher (req,res,next){
//     const {id} = req.query
//     // const {name , username ,email } = req.body

//     // try 
//     {
        // const Comprador = User.findByPk(id)
        // const contentHtml=`
        // <h1>Recibo de Compra</h1>
        //     <ul>
        //         <li>${Comprador.name}</li>
        //         <li> ${Comprador.username} </li>
        //         <li> ${Comprador.email} </li>
        //     </ul>
        // `


        // const service = "gmail";
        // const type = "OAuth2";
        // const user = "concerteck@gmail.com"
        const redirectUri= "https://developers.google.com/oauthplayground";
        const clientId = "421836283137-tak7au16v1h3ap6t7l3lmqnj84te9pd3.apps.googleusercontent.com";
        const clientSecret = "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";
        const refreshToken = "1//04X65eKwpBusXCgYIARAAGAQSNwF-L9Ir54iJjshB2BqBe_smNpBY1olg34KkhxmlOrk4IlhgzcXJ2nCvCKNmaGeifDThJsiHk4E";

    const oAuth2client = new google.auth.OAuth2(clientId,clientSecret,redirectUri) 

    oAuth2client.setCredentials({refresh_token:refreshToken});


const diego = async (user) => {
        try {
            console.log(user)
            const accessToken = await oAuth2client.getAccessToken()
            const transporter =nodemailer.createTransport(
                {
                    service:'gmail',
                    auth:{
                        type:"OAuth2",
                        user:"concerteck@gmail.com",
                        clientId:clientId,
                        clientSecret:clientSecret,
                        refreshToken:refreshToken,
                        accessToken:accessToken},
                })
            const mailOptions ={
                from:"concerteck <concerteck@gmail.com>",
                to:`${user.email}`,
                subject:"Compra de entradas Prueba",
                html:'<h1>"hola"</h1>'
            };

            const result = await transporter.sendMail(mailOptions);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    // sendmail(Comprador)
    // .then(result => res.status(200).send('enviado'))
    // .catch(error => console.log({error: error.message}))
    // res.send(contentHtml,'recibo enviado con exito')
    // } catch (error) {
    //     console.log(error)
    // }



// module.exports={ticketVoucher}
module.exports= diego