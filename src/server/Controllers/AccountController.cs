using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Server.Models;
using System.Collections.Generic;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly MemoryCacheEntryOptions _cacheEntryOptions;

        private const string USERS_CACHE_KEY = "users";

        public AccountController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            _cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetPriority(CacheItemPriority.NeverRemove);
        }

        [HttpPost]
        public IActionResult Post([FromBody] string username)
        {
            return Ok();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cache.GetOrCreate(USERS_CACHE_KEY, (e) => new List<ApplicationUser>()));
        }
    }
}
