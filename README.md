# Cashfree Cashgram Integration Kit for Node

Below is an integration flow on how to use Cashfree's payout node SDK.
Please go through the payout docs [here](https://dev.cashfree.com/payouts).
<br/>
This kit is linked to the Cashgram flow. Go [here](https://dev.cashfree.com/payouts/integrations/cashgram) to get a better understanding.
<br/>

## Functionalities

The following kit contains the following functionalities:
    <ol>
    <li> Init: to initialize the SDK.
    <li> Cashgram.CreateCashgram: to create a cashgram.
    <li> Cashgram.GetCashgramStatus: get the status of the created cashgram.
    </ol>

## Build Steps

follow the following build steps to compile the Integration kit:
  1. Download the code and cd into the directory containing the code.
  2. run the following command from your terminal to install all the dependencies:
      ```
      npm install
      ```

## Set Up

### Pre Requisites:
The following kit uses information stored in a config file. Before running the code for the first time open the config.json file
and add the relevant details:
  1. ClientId: This is a unique identifier that identifies the merchant. For more information please go [here](https://dev.cashfree.com/development/api/credentials).
  2. ClientSecret: Corresponding secret key for the given ClientId that helps Cashfree identify the merchant. For more information please go [here](https://dev.cashfree.com/development/api/credentials).
  3. Environment: Environment to be hit. The following values are accepted prod: for production, test: for the test environment.

### IP Whitelisting:

Your IP has to be whitelisted to hit Cashfree's server. For more information please go [here](https://dev.cashfree.com/development/api/ip-whitelisting).

### Cashgram

The following kit needs Cashgram details to create a cashgram. To know more information on how to create cashgrams please go [here](https://dev.cashfree.com/api-reference/payouts-api#create-cashgram-request).

The kit picks up the cashgram details from the app.js file cashgram object.
Required fields are:
  1. cashgramId: unique Id of the created cashgram.
  2. amount: amount to be transferred.
  3. name: name of the contact.
  4. phone: phone number of the contact.

## Usage

Once the app.js file is setup you can run the executable, to run the entire flow. Authorize, create a cashgram 
and check the status of the created cashgram.

run the following command from the terminal to run the script:
```
  node app.js
```

You can change the necessary values in the app.js file as per your requirements and re-run the script whenever needed.

## Doubts

Reach out to techsupport@cashfree.com in case of doubts.
 


