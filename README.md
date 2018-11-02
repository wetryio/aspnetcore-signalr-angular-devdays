# aspnetcore-signalr-angular-devdays
A sample webchat application in ASP.NET Core with SignalR and Angular

## Controller
### Account Controller

#### Connect new User
POST /api/v1/account  
Body Params : 
```csharp
    public IActionResult Post([FromBody] string value)
```
