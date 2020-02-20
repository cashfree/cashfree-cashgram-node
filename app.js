
/*
Below is an integration flow on how to use Cashfree's sdk to use the cashgram feature.
Please go through the payout docs here: https://dev.cashfree.com/payouts

The following script contains the following functionalities :
    2.Cashgram.createCashgram() -> to create cashgram.
    3.Cashgram.cashgramGetStatus() -> to get the cashgrams status

To use the script please enter your enviornment and corresponding client id and client secret
*/

const cfSdk = require('cashfree-sdk');

const {Payouts} = cfSdk;
const {Cashgram} = Payouts;

const config = {
    Payouts: {
        "ClientID": "client_id",
        "ClientSecret": "client_secret",
        "ENV": "TEST",
    }
};

const handleResponse = (response) => {
    if(response.status === "ERROR"){
        throw {name: "handle response error", message: "error returned"};
    }
};

const cashgram = {
    cashgramId: "cf11",
    amount: "1.00",
    name: "sameera",
    email: "sameera@cashfree.com",
    phone: "9000000001",
    linkExpiry: "2020/01/12",
    remarks: "sample cashgram",
    notifyCustomer: 1
};

//main flow
(async ()=>{
    //init
    Payouts.Init(config.Payouts);
    //create cashgram
    try{
        const response = await Cashgram.CreateCashgram(cashgram);
        console.log("create cashgram response");
        console.log(response);
        handleResponse(response);
    }
    catch(err){
        console.log("err caught in creating cashgram");
        console.log(err);
        return;
    }
    //get cashgram status
    try{
        const response = await Cashgram.GetCashgramStatus({
            "cashgramId":cashgram.cashgramId
        });
        console.log("cashgram get status response");
        console.log(response);
        handleResponse(response);
    }
    catch(err){
        console.log("err caught in getting cashgram status");
        console.log(err);
    }
})();
