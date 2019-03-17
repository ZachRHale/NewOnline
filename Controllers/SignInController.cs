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
    public class SignInController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IConfiguration _configuration;

        public SignInController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration
            )
        {
            _signInManager = signInManager;
            _configuration = configuration;
            _userManager = userManager;
        }


        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] SignInUser model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            var password = await _userManager.CheckPasswordAsync(user, model.Password);
            
            if (password)
            {
                await _signInManager.SignInAsync(user, false, "jwt");
                var token = await GenerateJwtToken(model.UserName, user);
                var result = new { token = token };
                return Ok(result); 
            }
            
            throw new ApplicationException("UNKNOWN_ERROR");
        }

        private async Task<object> GenerateJwtToken(string email, ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return  new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
