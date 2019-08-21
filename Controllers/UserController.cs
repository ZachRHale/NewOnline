using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;


namespace NewOnline.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetUserByHandle(User input) {
            using (var context = new MetronomeContext()) {
                IQueryable<User> result = context.User.Where(u => u.handle == input.handle);
                if (result.Count() > 0) {
                    return Ok(result.First());
                } else {
                    Response.StatusCode = 500;
                    return Ok("No handles found");
                }
            }
        }

        [HttpPost("byJWT")]
        public async Task<IActionResult> GetUserByJWT([FromBody] string jwt) {

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();  
            JwtSecurityToken jwtToken = (JwtSecurityToken) tokenHandler.ReadToken(jwt);  
            
            var user = await _userManager.FindByIdAsync(jwtToken.Id);

            if (user != null) {
                return Ok(user);
            } else {
                return Ok(new { errors = "No User Found"});
            }
        }

        [HttpPost]
        public IActionResult SaveUser(User inputData) {
            string result = "Data was saved";
            using (var context = new MetronomeContext())
            {

                Guid id = new Guid();

                User user = new User();

                var exists = context.User.Where(u => u.handle == inputData.handle).Count();

                if (exists > 0) {
                    Response.StatusCode = 500; 
                    result = "Already a user with that handle";
                } else {
                    user.id = id;
                    user.first_name = inputData.first_name;
                    user.last_name = inputData.last_name;
                    user.create_date = DateTime.Now;
                    user.handle = inputData.handle;
                    
                    context.User.Add(user);
                    context.SaveChanges();
                }

              
            }

            return Ok(result);
        }


    }
}
