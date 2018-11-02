# aspnetcore-signalr-angular-devdays
A sample webchat application in ASP.NET Core with SignalR and Angular

## Controller
### Account Controller

#### Connect new user

POST /api/v1/account

Body Params : 
```csharp
    public IActionResult Post([FromBody] string username)
```

Response :
```
200 : User connected, return a json token
```
```json
        test
```

```    
400 : Username is empty or validation failed
409 : User with this username already exist
```


#### Get list of connected users

GET /api/v1/account

Response :
```
200 : User connected
400 : Username is empty or validation failed
409 : User with this username already exist
```