using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Server.Hubs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly MemoryCacheEntryOptions _cacheEntryOptions;
        private readonly AppSettings _appSettings;

        private readonly ILogger<AccountController> _logger;

        private readonly IHubContext<ChatHub> _hubContext;

        private const string USERS_CACHE_KEY = "users";

        public AccountController(IMemoryCache memoryCache, IOptions<AppSettings> appSettings, 
                                    ILogger<AccountController> logger, IHubContext<ChatHub> hubContext)
        {
            _cache = memoryCache;
            _cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(10))
                .RegisterPostEvictionCallback(callback: EvictionCallback, state: this);

            _appSettings = appSettings.Value;
            _logger = logger;
            _hubContext = hubContext;
        }

        private static void EvictionCallback(object key, object value, EvictionReason reason, object state)
        {
            // (state as AccountController)._cache.Remove(key);

            //      List<ApplicationUser> users = (state as AccountController)._cache.GetOrCreate(USERS_CACHE_KEY, 
            //             (e) => new List<ApplicationUser>()).Where(a => a.UserId != ((ApplicationUser)value).UserId).ToList();

            // (state as AccountController)._cache.Set(USERS_CACHE_KEY, users);

            // (state as AccountController)._hubContext
            //                     .Clients
            //                     .Client(((ApplicationUser)value).ConnectionId).SendAsync("logout");

            // (state as AccountController)._hubContext
            //                     .Clients.All.SendAsync("updateUserList");
                                             
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post([FromBody] SignInDto user)
        {
            _logger.LogCritical("LOGGER", user.Username);

            try
            {
                if(_cache.GetOrCreate(USERS_CACHE_KEY, 
                        (e) => new List<ApplicationUser>()).Any(a => a.Username.Equals(user.Username)))
                {
                    return StatusCode(409);
                } else {

                    ApplicationUser appUser = new ApplicationUser(user.Username);
                    
                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                    byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[] 
                        {
                            new Claim("name", user.Username),
                            new Claim("uniqueId", appUser.UserId.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(10),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                    appUser.Token = tokenHandler.WriteToken(token);
                    UpdateCache(appUser);

                    return Ok(new {
                        AccessToken = appUser.Token
                    });
                }

            } catch(Exception) {

            } 

            return NoContent();
        }

        private void UpdateCache(ApplicationUser appUser){
            List<ApplicationUser> users = _cache.GetOrCreate(USERS_CACHE_KEY, 
                        (e) => new List<ApplicationUser>());

            users.Add(appUser);
            _cache.Set(USERS_CACHE_KEY, users);
            _cache.Set(appUser.Token, appUser, _cacheEntryOptions);
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {

            return Ok(
                        _cache.GetOrCreate(USERS_CACHE_KEY, (e) => new List<ApplicationUser>())
                            .Where(a => a.UserId != Guid.Parse(User.Claims.FirstOrDefault(f => f.Type == "uniqueId").Value))
                            .Select(s => new ApplicationUserDto(){
                                UserId = s.UserId,
                                Username = s.Username
                            }).ToArray()
                    );
        }
    }
}
