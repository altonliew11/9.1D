const express = require("express");
const request = require("request");

const app = express();

//////////////////////////////////////////////////////////////////////////////
// When port 3002 receives a GET request, it will send another POST request //
// with n1 and n2 as the body                                               //
// to the calculator microservice on port 3001.                             //
//////////////////////////////////////////////////////////////////////////////

app.get("/" , (req, res) => {
    request.post({
        uri: "http://host.docker.internal:3001/add", 
        json: true,
        body: {
            "n1": 49,
            "n2": 400
        },
    }, (error, response) => {
        if (error) {
            return res.send("Error occured");
        }
        res.send(response);
    });
});

const port = 3002;
app.listen(port, () => {
    console.log("Please send a GET request to: http://localhost:" + port);
})