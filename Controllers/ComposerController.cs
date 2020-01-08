using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;

namespace NewOnline.Controllers
{
    [Route("api/[controller]")]
    public class ComposerController : Controller
    {

        [HttpGet]
        public IActionResult GetComposers()
        {
            using (var context = new MetronomeContext())
            {
                var composers = context.Composer.Select(s => s).ToList();
                return Ok(composers);
            }
        }

        [HttpPost]
        public IActionResult SaveComposer(Composer inputData) {
            using (var context = new MetronomeContext())
            {

                if (inputData.id == null) {
                    var id = new Guid();
                    var composer = new Composer();
                    composer.id = id;
                    composer.first_name = inputData.first_name;
                    composer.last_name = inputData.last_name;
                    composer.birth_date = inputData.birth_date;
                    
                    context.Composer.Add(composer);
                    context.SaveChanges();
                } else {
                    context.Composer.Update(inputData);
                    context.SaveChanges();
                }
               
                return Ok("Done");
            }
        }


    }
}
