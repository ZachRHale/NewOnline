using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;

namespace NewOnline.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        // [HttpGet("{id}")]
        // public IActionResult GetUsersByFirstName(string first_name)
        // {
        //     using (var context = new MetronomeContext()) {
        //         List<User> result = context.User.Where(u => u.first_name == first_name).ToList();
        //         return Ok(result);
        //     }
            
        // }

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
