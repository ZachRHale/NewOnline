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
        public Score GetScore(string id)
        {
            var newID = new Guid();
            return new Score(newID, "A New Composition");
        }

        [HttpPost("{id}")]
        public void SaveScore() {
            using (var context = new MetronomeContext())
            {

                var id = new Guid();
                var score = new Score(id, "Testing");
                
                context.Score.Add(score);
                context.SaveChanges();
            }
        }


    }
}
