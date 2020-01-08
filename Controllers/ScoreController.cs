using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace NewOnline.Controllers
{        
    [Authorize]
    [Route("api/[controller]")]
    public class ScoreController : Controller
    {

        [HttpGet("byUser")]
        public IActionResult GetScoresByUser(){
            using (var context = new MetronomeContext()) {
                var nameId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var scoreCollection = context.Score.Where(s => s.creator.ToString() == nameId);
                return Json(scoreCollection.ToList());
            }
        }

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

                score.creator = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
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
