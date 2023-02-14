# Endpoint: /add-user

Create a new user.

## HTTP Method

`POST`

## Request Body

| Name        | Type   | Required | Description                   |
|-------------|--------|----------|-------------------------------|
| name      | string | Yes      | The Name Of The user   |
| phoneNumber        | number | Yes      | Phone Number Of The User   |
| password   | string    | Yes      | Password of the user     |

## Response

### Success

If The user is created and stored successfully in the database it will return a message `Successfull SignUp` along with a jwt, userId and phoneNumber.

### Error

If the request is missing required parameters or the phoneNumber is Duplicate or Invalid then it will send a message `Error Happened`

## Example Request

```
POST /add-user HTTP/1.1
Content-Type: application/json
{
    "name": "Anirban",
    "phoneNumber": "7365082177",
    "password": "*********"
}
```

## Example Response
```
{
    "message": "Successfull SignUp",
    "user_id": "63eb0fcdb53b1d2c4d45ede2",
    "phoneNumber": "7365082177",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5pcmJhbiIsInBob25lTnVtYmVyIjo3MzY1MDgyMTc3LCJfaWQiOiI2M2ViMGZjZGI1M2IxZDJjNGQ0NWVkZTIiLCJpYXQiOjE2NzYzNDkzOTAsImV4cCI6MTY3NjQzNTc5MH0.bBdSBM-x-2S-1j4ZqmIEasV8kLLt-oF7OJWPyL0P7OU"
}
```

# Endpoint: /login-user

A user Can Login

## HTTP Method

`POST`

## Request Body

| Name        | Type   | Required | Description                   |
|-------------|--------|----------|-------------------------------|
| phoneNumber       | number | Yes      | Unique phone number of the user     |
| password   | string    | Yes      | Password of the user     |

## Response

### Success

If the user exists , then a success message `Successfull SignIn` will be returned.

### Error

If the user Doesnot exist or the password of the given user is wrong then `Username or Password is Wrong` message will be returned.

## Example Request

```
POST /login-user HTTP/1.1
Content-Type: application/json
{
    "phoneNumber": "7365082177",
    "password": "*********"
}
```

## Example Response
```
{
    "user_id": "63eb7006f95a9dccd3485f0a",
    "phoneNumber": 8016832468,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGh5c2ljcyIsInBob25lTnVtYmVyIjo4MDE2ODMyNDY4LCJfaWQiOiI2M2ViNzAwNmY5NWE5ZGNjZDM0ODVmMGEiLCJpYXQiOjE2NzYzODI2NzAsImV4cCI6MTY3NjQ2OTA3MH0.hxBbNJWF1DtaMjDJYuCMhtWvGyhQYmboedEgCz4h1UA",
    "message": "Successfull SignIn"
}
```

# Endpoint: /add-order

Create a new order.

## HTTP Method

`POST`

## Headers

| Name           | Type   | Required | Description                   |
|----------------|--------|----------|-------------------------------|
| Authorization  | string | Yes      | JWT token for authentication. |

## Request Body

| Name        | Type   | Required | Description                   |
|-------------|--------|----------|-------------------------------|
| phoneNumber        | number | Yes      | Phone Number Of The User   |
| user_id        | string | Yes      | User Id of the user   |
| item        | string | Yes      | Item Name  |
| subTotal        | Number | Yes      | Number Of Orders Placed   |


## Response

### Success

If the user is valid user and places a order then a success message `success` will be passed.

### Error

If the user is not authorised then `Please Login to add/view order` message will be sent or if the user id doesn't match then `No Such User Id Exists or PhoneNumber Exists` message will be passed.

Status Code: `401 Unauthorized`

If the JWT token is invalid or has expired, the API will return a `401 Unauthorized` response.

## Example Request

```
POST /add-order HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
Content-Type: application/json
{
    "phoneNumber": "7365082177",
    "user_id": "63eb0fcdb53b1d2c4d45ede2",
    "item" : "burger",
    "subTotal" : 2
}
```

## Example Response
```
{
    "message": "success"
}
```

# Endpoint: /get-order

Get The Orders Placed By User

## HTTP Method

`GET`

## Headers

| Name           | Type   | Required | Description                   |
|----------------|--------|----------|-------------------------------|
| Authorization  | string | Yes      | JWT token for authentication. |

## Request Params

| Name        | Type   | Required | Description                   |
|-------------|--------|----------|-------------------------------|
| user_id        | string | Yes      | User Id of the user   |


## Response

### Success

If the user is valid user then list of orders will be sent.

### Error

If the user is not authorised then `Please Login to add/view order` message will be sent or if the user id doesn't match then `No Such User Id Exists or PhoneNumber Exists` message will be passed.

Status Code: `401 Unauthorized`

If the JWT token is invalid or has expired, the API will return a `401 Unauthorized` response.

## Example Request

```
GET /get-order?user_id=63eb0fcdb53b1d2c4d45ede2 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
Content-Type: application/json
```

## Example Response
```
{
    "message": "success",
    "orders": [
        {
            "orderName": "pizza",
            "total": 2,
            "_id": "63eb103c0c6a79d8dc49f9b4"
        },
        {
            "orderName": "burger",
            "total": 2,
            "_id": "63eb11050c6a79d8dc49f9bb"
        }
    ]
}
```

# Endpoint: /getUserFromToken

get user details from token

## HTTP Method

`GET`

## Headers

| Name           | Type   | Required | Description                   |
|----------------|--------|----------|-------------------------------|
| Authorization  | string | Yes      | JWT token for authentication. |

## Response

### Success

If the user is valid user then a success message `Successfully Validated` will be passed along with user details.

### Error

If the user is not authorised then `Please Login to add/view order` message will be sent.

Status Code: `401 Unauthorized`

If the JWT token is invalid or has expired, the API will return a `401 Unauthorized` response.

## Example Request

```
GET /getUserFromToken HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
Content-Type: application/json
```

## Example Response
```
{
    "phoneNumber": 7365082177,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5pcmJhbiIsInBob25lTnVtYmVyIjo3MzY1MDgyMTc3LCJfaWQiOiI2M2VhN2VmYTk5YzgxOWM1ZDU5Y2RkN2UiLCJpYXQiOjE2NzYzMTIzMjIsImV4cCI6MTY3NjM5ODcyMn0.dvrYNY8OVcBuUq7DUVMaK9ViO-qNHbqypb4Zpj7ocX8",
    "user_id": "63ea7efa99c819c5d59cdd7e",
    "message": "Successfully Validated"
}
```

## Sample UI to show orders placed by user

