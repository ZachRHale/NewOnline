using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;

namespace NewOnline.Controllers
{
    [Route("api/[controller]")]
    public class ScoreController : Controller
    {

        [HttpGet("{id}")]
        public IActionResult GetScore(string id)
        {
            using (var context = new MetronomeContext()) {
                
                var score = context.Score.Where(s => s.id.ToString() == id).First();
                return Json(score);

            }

        }

        [HttpPost]
        public IActionResult SaveScore(Score input) {
            using (var context = new MetronomeContext())
            {

                var id = new Guid();
                var score = new Score();

                score.id = id;
                score.creator = input.creator;
                score.composer = input.composer;
                score.create_date = DateTime.Now;
                score.title = input.title;
                
                context.Score.Add(score);
                context.SaveChanges();
                return Ok("Score Created");
            }
        }


    }
}
