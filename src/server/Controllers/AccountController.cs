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
        private readonly IHubContext<DashboardHub, IDashboardClient> _hubClients;

        private const string USERS_CACHE_KEY = "users";

        public AccountController(IMemoryCache memoryCache, IOptions<AppSettings> appSettings,
                                    ILogger<AccountController> logger, IHubContext<DashboardHub, IDashboardClient> hubClients)
        {
            _cache = memoryCache;
            _cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(60));

            _appSettings = appSettings.Value;
            _logger = logger;
            _hubClients = hubClients;
        }

        public string GetCurrentUserId
        {
            get
            {
                return User.Claims.FirstOrDefault(f => f.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post([FromBody] SignInDto user)
        {
            try
            {
                if (_cache.GetOrCreate(USERS_CACHE_KEY,
                        (e) => new List<ApplicationUser>()).Any(a => a.Username.Equals(user.Username)))
                {
                    return StatusCode(409);
                }
                else
                {

                    ApplicationUser appUser = new ApplicationUser(user.Username);

                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                    byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, user.Username)
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(10),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                    UpdateCache(appUser);

                    return Ok(new
                    {
                        AccessToken = tokenHandler.WriteToken(token)
                    });
                }

            }
            catch (Exception e)
            {
                _logger.LogCritical("Error", e);
            }

            return NoContent();
        }

        private void UpdateCache(ApplicationUser appUser)
        {
            List<ApplicationUser> users = _cache.GetOrCreate(USERS_CACHE_KEY,
                        (e) => new List<ApplicationUser>());

            _hubClients.Clients.All.UpdateUsers(users.Count);
            users.Add(appUser);
            _cache.Set(USERS_CACHE_KEY, users);
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {

            return Ok(
                        _cache.GetOrCreate(USERS_CACHE_KEY, (e) => new List<ApplicationUser>())
                            .Where(a => !a.Username.Equals(GetCurrentUserId))
                            .Select(s => new ApplicationUserDto()
                            {
                                Username = s.Username
                            }).ToArray()
                    );
        }
    }
}
