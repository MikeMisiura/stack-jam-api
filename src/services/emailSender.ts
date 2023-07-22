// import nodemailer from "nodemailer";
// import Mail from "nodemailer/lib/mailer";
// import { hostname, username, password, email } from "../personal/emailLogin";
// // const nodemailer = require("nodemailer");

// async function main() {

//     const transporter = nodemailer.createTransport({
//         host: hostname,
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//             user: username,
//             pass: password,
//         },
//         logger: true
//     })

//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: `Stack Jam Test <${email}>`,
//         to: "mikemisiura@gmail.com",
//         subject: "Hello from node",
//         text: "Hello, world?",
//         html: "<strong>Hello, world?</strong>",
//         headers: { 'x-myheader': 'test header' }
//     });

//     console.log("Message sent: %s", info.response);
// }


// export default main