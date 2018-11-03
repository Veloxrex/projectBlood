const nodeMailer = require('nodemailer');
module.exports={
    connectHost: "mongodb://localhost/blood-db",
    secret: "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    sendEmail,
    errorHandler
};

function sendEmail(message) {
    var auth = {
        type: 'OAuth2',
        user: 'hienviluong125@gmail.com',
        clientId: '343022202252-oagtg55hvlopr46l46jalleu46nd003t.apps.googleusercontent.com',
        clientSecret: 'Fceguvgx_y6e2Y06i4bXYCuC',
        accessToken: 'ya29.GltBBn8Gymch6bXycJH2soOER3m30bH0jvM0OycetAnEi6T1-F8gJ3swv7VX-UpaRPhxr8hBcyERujobCp6_0mhOTXskJeWB-QyUWrtVQGAaM6zlGxMViSslOncI',
        refreshToken: '1/71wZwtIHhvqMBj0ahRTONwCw34JCgfA4tfOmYF8pfPg',
    };

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: auth
    });

    transporter.sendMail(message, (error, info) => {
        console.log(error?error:'Email sent: ' + info.response);
    });
}

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}