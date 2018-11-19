---
title: Bank Frick webAPI Documentation

language_tabs: # must be one of https://git.io/vQNgJ
  - shell--sandbox: sandbox 
  - shell--production: production

toc_footers:
  - <a href='https://developers.bankfrick.li/signup'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/bankfrick/webapi-docs' target='_blank' rel='noopener'>Edit on GitHub</a>

includes:
  - accounts
  - authorize
  - info
  - requesttan
  - signtxwithtan
  - transactions
  - camt052
  - camt053
  - pain001
  - errors
  - datatypes

search: true
---

# Introduction

```nginx
  _   _      _ _        __        __         _     _ _ 
 | | | | ___| | | ___   \ \      / /__  _ __| | __| | |
 | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | |
 |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|
 |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_)                  
```

This is the Bank Frick online banking webAPI documentation. In this documentation the client can see what requirements must be fulfilled, which functionalities Bank Frick's online banking webAPI must have and how it must be set up.

The online banking webAPI enables to create and approve payment orders and receive account information in a simplified JSON format or standardized camt report without the requirement of logging in into the online banking frontend.

We have examples for the sandbox as well as for the production environment. You can view code examples in the dark area to the right, and you can switch the environment of the examples with the tabs in the top right.

# Getting Started

In order to use the online banking webAPI (Sandbox & Production), the client requires having an active account which allows him to access one or multiple customers depending on the user privileges and contact to customer assignments. Here you can set up your account: <a href="https://developers.bankfrick.li/signup" target="_blank" rel="noopener">Sign up</a>

After the Sign Up, you will receive the following three pieces of information by post to access your account and use the webAPI.

  * Contact number
  * Password
  * TAN

If you subsequently have an active Bank Frick account, you can start webAPI with the Online Banking setup.

Currently 2 environments are available

  * Production: <a href="https://olb.bankfrick.li/" target="_blank" rel="noopener">https://olb.bankfrick.li</a>
  * Sandbox: <a href="https://olbtest.bankfrick.li/" target="_blank" rel="noopener">https://olbtest.bankfrick.li</a>

The API will be available under the following path:<br>
BaseURL = \<Environment URL\>/webapi/

Schemes: https

## Signatures

Message payloads must be signed by the sender of the message and be verified by the receiver. The signature will be transmitted in the ‘Signature’ header field of the HTTP Request/Response. The signature is a Base64-encoded binary SHA signature of the content of the message-body. The 'algorithm' header parameter is used to specify the digital signature algorithm to use when generating the signature. Valid values for this parameter are [rsa-sha512, rsa-sha384, rsa-sha256]. If ‘algorithm’ is not provided by the client the server will assume rsa-sha512.

## Upload SSH Keys

The public key must be uploaded to the server using the online banking GUI manage SSH Key dialog and assigned to an access token. You must give a unique title respectively a name to the public key. The public key itself can be copied into the input field and added with the "Add SSH-Key" button. The following formats for the public key are accepted:

X.509 SubjectPublicKeyInfo (PEM header: BEGIN PUBLIC KEY)

A public/private key pair can be created using various tools, e.g. via openssl command line

`$ openssl genrsa -out private.key 4096`

`$ openssl rsa -in private.key -outform PEM -pubout -out public.pem`

![Upload API Keys](/images/documentation/bank-frick-webapi-upload-ssh-keys.png "Upload API Keys")

## Manage API Keys

Now, you are able to generate a personal API-Key for an application which uses the webAPI. The API-Key replaces the user contact number for requesting a JWT from the authorization server, however for each further request it is still required that the user account is still active and accessible. If the you lock the account e.g. via the “Lock Password” function or by entering false passwords at the login, all client JWTs will lose access privileges temporarily until the user is unlocked again from an advisor in the backend.

An API-Key is a personalized access token which will be generated once by the server using the settings provided by the contact. The settings describe the name, expire date and scope of the access token. Also a client public key must be defined which will be used by the server to validate the signature of the messages send by the client.

A generated access token will be displayed after a successful entered TAN challenge for a limited amount of time. After that, the token cannot be accessed again. Changing a token would require to delete the old token and create a new one. You are responsible to save and handle the access key securely. 
Additionally, you can limit the access to the WebAPI of your account to a specific IP address or subnet. For that, the firewall must be configured accordingly so that your IP address is passed to the application server (transparent proxy) in the “X-FORWARDED-FOR” or any other suitable request header field.

![Manage API Keys](/images/documentation/bank-frick-webapi-manage-api-keys.png "Manage API Keys")

## WebHooks

This dialog shows an overview of all created and active notification rules. You are able to define notification rules to be informed when a criteria matches, e.g. a charge or credit entry on an account or an executed payment order. New rules can be created, edited or deleted at any time. 

You are able to create or edit a notification rule which triggers on the defined event and notifies the user. You can define a rule for a specific customer or account or in a general case for all accounts. 
The notification rule condition is checked by the server in regular intervals and if a rule is fulfilled you are notified once via the selected method until the condition is reset and met again.

WebHooks allows the user to develop push notifications. These push notifications are simply an HTTP POST that is triggered by the defined action. The notification does contain information about the triggered notification rule but no further critical data. Also a signature of the body is added which can be verified by the server public key. 
The server will send a JSON message containing the relevant information about the rule.

If the message cannot be delivered, e.g. because the client server is not responding, the event will be discarded and not be send again until the notification condition is triggered again. The request is asynchronous meaning the server does not wait for a client response.

![WebHooks](/images/documentation/bank-frick-webapi-webhooks.png "WebHooks")

![WebHooks Details](/images/documentation/bank-frick-webapi-webhooks-details.png "WebHooks Details")