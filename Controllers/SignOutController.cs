using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace NewOnline.Controllers
{
    [Route("api/[controller]")]
    public class SignOutController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public SignOutController(
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration
            )
        {
            _signInManager = signInManager;
            _configuration = configuration;
        }


        [HttpPost]
        public void SignOut([FromBody] SignInUser model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName
            };
            
            _signInManager.SignOutAsync();

            
            //throw new ApplicationException("UNKNOWN_ERROR");
        }
    }
}
