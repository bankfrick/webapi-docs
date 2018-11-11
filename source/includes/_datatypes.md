# Data Types

## Account

> Response

```json          
{
  "account" : "00012345/001.000.001",
  "type" : "CURRENT ACCOUNT",
  "iban" : "LI6808811000000001234",
  "customer" : "00012345 Max Muster",
  "currency" : "CHF",
  "balance" : -1321.0,
  "available" : 0.0
}
```

A single account instance

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| account |	string |	required |	The account number of the account |
| type |	string |	required |	The type of the account |
| iban |	string |	 |	The iban of the account if exists |
| customer |	string |	required |	The customer data of the account which consists of the customer number and name |
| currency |	string |	required |	The account currency |
| balance |	number |	required |	The current account balance |
| available |	number |	 |	The available amount of the account as defined in the online banking |

## Accounts

> Response

```json          
{
  "date" : "2018-12-31",
  "moreResults" : false,
  "resultSetSize" : 2,
  "accounts" : [ {
    "account" : "00012345/001.000.001",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000001234",
    "customer" : "00012345 Max Muster",
    "currency" : "CHF",
    "balance" : -1321.0,
    "available" : 0.0
  }, {
    "account" : "00012345/001.000.001",
    "type" : "CURRENT ACCOUNT",
    "iban" : "LI6808811000000001234",
    "customer" : "00012345 Max Muster",
    "currency" : "CHF",
    "balance" : -1321.0,
    "available" : 0.0
  } ]
}
```

The accounts message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| date|	string |	required |	The balance date (today) |
| moreResults |	boolean |	required |	Attribute indicates that more results are available on the server |
| resultSetSize |	number |	required |	Number of results in the returned result set |
| accounts |	array of [Account](#data-types-account)	| |	The list of accounts |

## Approval

> Response

```json          
{
  "contact" : "1234 Max Muster",
  "group" : 1,
  "dateOfApproval" : "2018-08-22T10:07:02"
}
```

A approval of a transaction.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| contact |	string | |	The contact information about the user who gave the approval |
| group |	number | |	The contacts group if a special group policy applies |
| dateOfApproval |	string | |	The date the approval was given |

## AuthBody

> Response

```json          
{
  "contactnr" : "1234",
  "password" : "secret"
}
```

Authentication message body

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| contactnr |	string |	required |	The contact number |
| password |	string |	required |	The contact password |

## Authorize

> Response

```json          
{
  "key" : "1234567890abcdefgHIJKLMN",
  "password" : "secret"
}
```

The authorization message request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| key |	string |	required |	The previously generated API-Key (Personal Access Token) |
| password |	string |	required |	The current user password |

## AuthorizeResponse

> Response

```json          
{
  "token" : "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJCYW5rIEZyaWNrIFdlYkFQSSIsInN1YiI6IlRhZ2VzYWJzY2hsdXNzIiwiY29udGFjdCI6IjY3ODkiLCJuYW1lIjoiTWF4IE11c3RlciIsInBlcm1pc3Npb25zIjpbImFjY291bnRzIiwidHJhbnNhY3Rpb25zIiwiY2FtdDA1MiIsImNhbXQwNTMiXSwiYXVkIjoicHJvZHVjdGlvbiIsImV4cCI6MTU0NjMwMDgwMCwiaWF0IjoxNTMzMTA5MzIzfQ.DlxpBZMGAZx1xK-UdA-s9SrHMrEIt60waF1kLYG6kCuTRMrcDiS3KR8p0bAyZaLUWlfSJF3TCMb2Tup5MyLFWc0fZRJfu0mBEyz74ZwbSN9iTrwzzsfIuX2E1d895hR1MgsMy2i1Qu-vwZgsW0WivnNCHBMLZH0jM94v1czt7f0"
}
```

The authorization message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| token |	string |	required |	The assigned JWT for the login request |

## Charge

Enum values for the 'charge' field.

**Properties**

| value | description |
| ----- | ----------- |
| BEN |	beneficiary pays costs |
| OUR |	sender pays costs |
| SHA |	shared costs |

## CreateTransaction

> Response

```json          
{
  "transactions" : [ {
    "customId" : "4711",
    "type" : "FOREIGN",
    "amount" : 1321.0,
    "currency" : "EUR",
    "express" : true,
    "reference" : "some individual text",
    "charge" : "SHA",
    "debitor" : {
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Max Muster",
      "iban" : "DE12500105170648489890",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    }
  }, {
    "customId" : "4711",
    "type" : "ORANGE",
    "amount" : 1321.0,
    "currency" : "EUR",
    "express" : true,
    "reference" : "some individual text",
    "charge" : "BEN",
    "debitor" : {
      "iban" : "LI6808811000000001234"
    },
    "creditor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Max Muster",
      "iban" : "DE12500105170648489890",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    }
  } ]
}
```

The create transactions request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| transactions | array of [Transaction (new instance)](#data-types-transaction-new-instance) |	required |	the list of transactions to be created |

## DeleteRequestTan

> Response

```json          
{
  "challengeId" : "c6f8dd20-aad0-11e8-98d0-529269fb1459"
}
```

The delete request tan request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| challengeId	| string |	required |	The challenge ID to be deleted, cancels the TAN challenge |

## DeleteTransaction

> Response

```json          
{
  "orderIds" : [ 12345, 12345 ]
}
```

The delete transactions request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderIds |	array of number |	required |	The order ids (as assigned from the server) to be deleted |

## ErrorMessage

> Response

```json          
{
  "message" : "Parameter iban is missing",
  "code" : "request_body_validation_error"
}
```

A single error message instance.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| message |	string |	required |	An explanation about the error |
| code |	string |	required |	An internal error code |

## Errors

> Response

```json          
{
  "errors" : [ {
    "message" : "Parameter iban is missing",
    "code" : "request_body_validation_error"
  }, {
    "message" : "Parameter iban is missing",
    "code" : "request_body_validation_error"
  } ]
}
```

The error message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| errors |	array of [ErrorMessage](#data-types-errormessage) |	required |	the list of error messages |

## Info

> Response

```json          
{
  "version" : "2.2.5-20180831-1144",
  "environment" : "production",
  "messages" : [ {
    "title" : "Maintenance",
    "message" : "Due to maintenance work, online banking will not be available on 26.07.2018 from 05:00 to 06:00. We apologize for any inconvenience."
  }, {
    "title" : "Maintenance",
    "message" : "Due to maintenance work, online banking will not be available on 26.07.2018 from 05:00 to 06:00. We apologize for any inconvenience."
  } ]
}
```

The info response message body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| version |	string |	required |	The version information of the webapi service |
| environment |	string |	required |	The webapi environment |
| messages |	array of [InfoMessage](#data-types-infomessage) | |	The list of messages |

## InfoMessage

> Response

```json          
{
  "title" : "Maintenance",
  "message" : "Due to maintenance work, online banking will not be available on 26.07.2018 from 05:00 to 06:00. We apologize for any inconvenience."
}
```

A single info message instance.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| title |	string ||	The message title |
| message |	string ||	The message content |

## Method

Enum values for the 'method' field

**Properties**

| value | description |
| ----- | ----------- |
| SMS_TAN |	TAN send by SMS |

## RequestTan

> Response

```json          
{
  "orderIds" : [ 12345, 12345 ],
  "method" : "SMS_TAN"
}
```

The request tan request body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderIds | array of number |	required |	The order ids (as assigned from the server) to request a tan for |
| method |	[Method](#data-types-method) |	required |	The TAN method to be used for sending the TAN |

## RequestTanResponse

> Response

```json          
{
  "challange" : "c6f8dd20-aad0-11e8-98d0-529269fb1459",
  "expires" : "2018-08-22T10:07:02.895"
}
```

The request tan response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| challange |	string |	required |	A challenge id which must be returned to the server when resolving the tan request |
| expires |	string |	required |	The time until the tan challenge must be resolved |

## SignTransactionsWithTan

> Response

```json          
{
  "challengeId" : "zRsFYey8/uVscFn3UVxmpisAlbigLEsvy1M5crtRhMc=",
  "tan" : "123456"
}
```

The sign transactions with tan request body message.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| challengeId |	string |	required |	The challenge id as given in the requestTan response message |
| tan |	string |	required |	The received (SMS-)TAN |

## State 

Enum values for the 'state' field.

**Properties**

| value | description |
| ----- | ----------- |
| PREPARED |	The transaction is stored but not yet processed |
| IN_PROGRESS	| The transaction is being processed |
| DELETED |	The transaction was deleted |
| EXPIRED |	The transaction expired |
| EXECUTED |	The transaction was executed |
| REJECTED |	The transaction was rejected |
| ERROR |	The transaction was faulty |

## Transaction (new instance)

> Response

```json          
{
  "customId" : "4711",
  "type" : "BANK_INTERNAL",
  "amount" : 1321.0,
  "currency" : "EUR",
  "express" : true,
  "reference" : "some individual text",
  "charge" : "BEN",
  "debitor" : {
    "iban" : "LI6808811000000001234"
  },
  "creditor" : {
    "accountNumber" : "00012345/001.000.001",
    "name" : "Max Muster",
    "iban" : "DE12500105170648489890",
    "bic" : "INGDDEFFXXX",
    "creditInstitution" : "ING-DiBa",
    "esr" : "961116900000006600000009284"
  }
}
```

A single transaction instance to be created.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| customId |	string |	required, max size: 50, min size: 0 |	Unique custom id for a transaction given by the client |
| type |	[Type](#data-types-type) |	required |	The type of the payment order |
| amount |	number |	required, min: 0.01, max digits: 12 (integer), 2 (fraction) |	The amount of the transaction |
| currency |	string |	required, max size: 3, min size: 0 |	The transaction currency |
| express |	boolean |	required |	Information if it is a express transaction |
| reference |	string |	max size: 140, min size: 0 |	The reference text or individual note |
| charge |	[Charge](#data-types-charge)	| | 	The charging type |
| debitor |	[TransactionDebitorAccount](#data-types-transactiondebitoraccount) |	required |	The client information about the transaction |
| creditor |	[TransactionCreditorAccount](#data-types-transactioncreditoraccount) |	required |	The beneficiary information about the transaction |

## Transaction (existing instance)

> Response

```json          
{
  "orderId" : 20222,
  "customId" : "4711",
  "type" : "FOREIGN",
  "state" : "EXECUTED",
  "amount" : 1321.0,
  "currency" : "EUR",
  "valuta" : "2018-08-27",
  "express" : true,
  "reference" : "Some Individual Text",
  "charge" : "SHA",
  "debitor" : {
    "accountNumber" : "00012345/001.000.001",
    "name" : "Max Muster",
    "iban" : "LI6808811000000001234",
    "bic" : "INGDDEFFXXX",
    "creditInstitution" : "ING-DiBa",
    "esr" : "961116900000006600000009284"
  },
  "creditor" : {
    "accountNumber" : "00012345/001.000.001",
    "name" : "Max Muster",
    "iban" : "LI6808811000000001234",
    "bic" : "INGDDEFFXXX",
    "creditInstitution" : "ING-DiBa",
    "esr" : "961116900000006600000009284"
  },
  "creator" : "1234 Max Muster",
  "createDate" : "2018-08-22T10:07:02",
  "right" : "Bevollmächtigter kollektiv zu 2",
  "groupPolicy" : "Group intern",
  "group" : 1,
  "quorum" : 2,
  "approvals" : [ {
    "contact" : "1234 Max Muster",
    "group" : 1,
    "dateOfApproval" : "2018-08-22T10:07:02"
  }, {
    "contact" : "1234 Max Muster",
    "group" : 1,
    "dateOfApproval" : "2018-08-22T10:07:02"
  } ]
}
```

A single transaction existing instance.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| orderId	| number	| |  The order id as assigned by the system |
| customId | string	 | | Unique custom id for a transaction given by the client |
| type |	[Type](#data-types-type) |	required |	The type of the payment order |
| state |	[State](#data-types-state)	| required |	The state of the payment order |
| amount |	number |	required |	The amount of the transaction |
| currency |	string |	required |	The transaction currency |
| valuta |	string |	required |	The (est.) valuta date of the transaction |
| express |	boolean |	required |	Information if it is a express transaction |
| reference |	string	| |	The reference text of individual notes |
| charge |	[Charge](#data-types-charge)	| |	The charging system of the transaction |
| debitor |	[TransactionAccount](#data-types-transactionaccount) |	required |	The client information about the transaction |
| creditor |	[TransactionAccount](#data-types-transactionaccount) |	required |	The beneficiary information about the transaction |
| creator |	string |	required |	The creator contact information |
| createDate |	string	| |	The create date |
| right |	string |	required |	The write privilege of the creator in regards to the customer |
| groupPolicy |	string	| |	Information about applied group policy |
| group |	number	| |	Information about the creators group in case a group policy applies |
| quorum |	number	| |	The total number of approvals required for the transaction |
| approvals |	array of [Approval](#data-types-approval)	| |	A list of approvals given to the payment order |

## TransactionAccount

> Response

```json          
{
  "accountNumber" : "00012345/001.000.001",
  "name" : "Max Muster",
  "iban" : "LI6808811000000001234",
  "bic" : "INGDDEFFXXX",
  "creditInstitution" : "ING-DiBa",
  "esr" : "961116900000006600000009284"
}
```

Debitor or creditor account information of the transaction.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| accountNumber	| string | |	The account number of the corresponding account |
| name |	string | |	The name of the client or recipient |
| iban |	string | |	The iban of the corresponding account |
| bic |	string | |	The bic of the corresponding accounts credit institution |
| creditInstitution	| string | |	The name of the credit institution |
| esr	| string | |	The esr number in case of type = ORANGE |

## TransactionCreditorAccount

> Response

```json          
{
  "accountNumber" : "00012345/001.000.001",
  "name" : "Max Muster",
  "iban" : "DE12500105170648489890",
  "bic" : "INGDDEFFXXX",
  "creditInstitution" : "ING-DiBa",
  "esr" : "961116900000006600000009284"
}
```

The transactions beneficiary account information.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| accountNumber	| string |	max size: 30, min size: 0 |	The account number of the recipient |
| name |	string |	required |	The name of the recipient |
| iban |	string |	max size: 34, min size: 0	| The iban if the recipient account |
| bic |	string |	max size: 11, min size: 0 |	The bic of the recipient credit institution |
| creditInstitution	| string |	max size: 50, min size: 0 |	The recipient credit institution |
| esr	| string |	max size: 27, min size: 0 |	The esr number in case of type = ORANGE |

## TransactionDebitorAccount

> Response

```json          
{
  "iban" : "LI6808811000000001234"
}
```

The transactions client account information.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| iban |	string |	required, max size: 34, min size: 0	| the account iban of the sender |

## Transactions

> Response

```json          
{
  "moreResults" : false,
  "resultSetSize" : 2,
  "transactions" : [ {
    "orderId" : 20222,
    "customId" : "4711",
    "type" : "FOREIGN",
    "state" : "EXPIRED",
    "amount" : 1321.0,
    "currency" : "EUR",
    "valuta" : "2018-08-27",
    "express" : true,
    "reference" : "Some Individual Text",
    "charge" : "OUR",
    "debitor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    },
    "creditor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    },
    "creator" : "1234 Max Muster",
    "createDate" : "2018-08-22T10:07:02",
    "right" : "Bevollmächtigter kollektiv zu 2",
    "groupPolicy" : "Group intern",
    "group" : 1,
    "quorum" : 2,
    "approvals" : [ {
      "contact" : "1234 Max Muster",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    }, {
      "contact" : "1234 Max Muster",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    } ]
  }, {
    "orderId" : 20222,
    "customId" : "4711",
    "type" : "ORANGE",
    "state" : "ERROR",
    "amount" : 1321.0,
    "currency" : "EUR",
    "valuta" : "2018-08-27",
    "express" : true,
    "reference" : "Some Individual Text",
    "charge" : "OUR",
    "debitor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    },
    "creditor" : {
      "accountNumber" : "00012345/001.000.001",
      "name" : "Max Muster",
      "iban" : "LI6808811000000001234",
      "bic" : "INGDDEFFXXX",
      "creditInstitution" : "ING-DiBa",
      "esr" : "961116900000006600000009284"
    },
    "creator" : "1234 Max Muster",
    "createDate" : "2018-08-22T10:07:02",
    "right" : "Bevollmächtigter kollektiv zu 2",
    "groupPolicy" : "Group intern",
    "group" : 1,
    "quorum" : 2,
    "approvals" : [ {
      "contact" : "1234 Max Muster",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    }, {
      "contact" : "1234 Max Muster",
      "group" : 1,
      "dateOfApproval" : "2018-08-22T10:07:02"
    } ]
  } ]
}
```

The transactions message response body.

**Properties**

| name | data type | constraints | description |
| ---- | --------- | ----------- | ----------- |
| moreResults |	boolean	| required |	Attribute indicates that more results are available on the server |
| resultSetSize |	number |	required |	Number of results in the returned result set |
| transactions |	array of [Transaction (existing instance)](#data-types-transaction-existing-instance) |	required |	the list of transactions |

## Type

Enum values for the 'type' field

**Properties**

| value | description |
| ----- | ----------- |
| INTERNAL |	Internal Transfer |
| BANK_INTERNAL |	Bank Internal Transfer |
| SEPA |	SEPA Payment |
| FOREIGN	| International Transfer |
| RED |	Red Payment Slip |
| ORANGE |	Orange Payment Slip |