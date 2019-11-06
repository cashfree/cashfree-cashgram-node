
/*
Below is an integration flow on how to use Cashfree's cashgram feature.
Please go through the payout docs here: https://docs.cashfree.com/docs/payout/guide/

The following script contains the following functionalities :
    1.getToken() -> to get auth token to be used in all following calls.
    2.createCashgram() -> to create cashgram.
    3.cashgramGetStatus() -> to get the cashgrams status


All the data used by the script can be found in the config.json file. This includes the clientId, clientSecret, cashgram object.
You can change keep changing the values in the config file and running the script.
Please enter your clientId and clientSecret, along with the appropriate enviornment and bank details
*/

/**
 * Please note that this script has a dependency on the request library.
 */


const util = require('util');
const request = require("request");

const postAsync = util.promisify(request.post);
const getAsync = util.promisify(request.get);

const config = require('./config.json');

const {env, url, clientId, clientSecret} = config;
const baseUrl = config["baseUrl"][env];
const headers = {
    "X-Client-Id": clientId,
    "X-Client-Secret": clientSecret
}


//helper function to create the options that will be passed to the request library
function createOptions(action, headers, json){
    const finalUrl = baseUrl + url[action];
    json = json? json: {};
    return {url: finalUrl, headers, json};
}

function createHeader(token){
    return {...headers,'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token};
}

//function to get auth token
//token is alive for 5 mins
async function getToken(){
    try{
        const r = await postAsync(createOptions('auth', headers));
        const {status, subCode, message} = r.body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
        const {data: {token}} = r.body;
        return token;
    }
    catch(err){
        console.log("err in getting token");
        throw err;
    }
}

//function to create cashgram
async function createCashgram(token){
    try{
        const r = await postAsync(createOptions('createCashgram',createHeader(token), config.cashgramDetails));
        const {status, subCode, message} = r.body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
        console.log("cashgram successfully created");
        console.log(r.body);
        return;
    }
    catch(err){
        console.log("err in creating cashgram");
        throw err;
    }
}

//function to check status of cashgram
async function cashgramGetStatus(token){
    try{
        const {cashgramDetails:{cashgramId}} = config
        const queryString = "?cashgramId="+cashgramId;
        const finalUrl = baseUrl + url['getCashgramStatus'] + queryString;
        const r = await getAsync(finalUrl, {headers: {...headers, 'Authorization': 'Bearer ' + token}});
        const body = JSON.parse(r.body);
        const {status, subCode, message} = body;
        if(status !== 'SUCCESS' || subCode !== '200') throw {name: "incorectResponseError", message: "incorrect response recieved: " + message};
        console.log();
        console.log(body);
    }
    catch(err){
        console.log("err in getting cashgram status");
        throw err;
    }
}

/*
The flow executed below is:
1. fetching the auth token
2. creating a cashgram
3. getting the status of the cashgram
*/
(
    async () => {
        try{
            const token = await getToken();
            await createCashgram(token);
            await cashgramGetStatus(token);
        }
        catch(err){
            console.log("err caught in main loop");
            console.log(err);
        }
    }
)();