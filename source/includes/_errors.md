# Errors

| code | condition | type |
| ---- | --------- | ---- |
| 400 | Validation of input parameters failed | [Errors](#data-types-errors) (JSON) |
| 401 | If no JWT was provided or JWT is invalid | [Errors](#data-types-errors) (JSON) |
| 403 | API key is invalid or any other condition hinders the login | [Errors](#data-types-errors) (JSON) |
| 423 | The authentication is valid but the user account is locked and cannot be accessed | [Errors](#data-types-errors) (JSON) |