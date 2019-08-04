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
                
                var scoreCollection = context.Score.Where(s => s.id.ToString() == id);
                var score = scoreCollection.Count() != 0 ? scoreCollection.First() : null;

                if (score != null) {
                    return Json(score);
                } else {
                    return Json(new { error = "Nothing is here" });
                }

            }

        }

        [HttpPost]
        public IActionResult SaveScore(Score input) {
            using (var context = new MetronomeContext())
            {

                Boolean isUpdate = input.id == null;

                var score = new Score();


                if (!isUpdate) {
                    Guid id = new Guid();
                    score.id = id;
                    score.create_date = DateTime.Now;
                }

                score.creator = input.creator;
                score.composer = input.composer;
                score.title = input.title;
                
                if (isUpdate) {
                    context.Score.Update(score);
                } else {
                    context.Score.Add(score);
                }
                context.SaveChanges();
                return Ok("Score Created");
            }
        }


    }
}
