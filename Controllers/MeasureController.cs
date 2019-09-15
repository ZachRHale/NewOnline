using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;
using Microsoft.AspNetCore.Authorization;

namespace NewOnline.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    public class MeasureController : Controller
    {

        [HttpGet("{score}")]
        public IActionResult GetMeasures(string score)
        {
            using (var context = new MetronomeContext()) {
                
                var measures = context.Measure.Where(s => s.score.ToString() == score).ToList().OrderBy(measure => measure.measureNumber);
                return Json(measures);

            }

        }

        [HttpPost("single")]
        public IActionResult UpdateMeasure([FromBody] Measure measure) {
            using (var context = new MetronomeContext())
            {                        
                context.Measure.Update(measure);
                context.SaveChanges();
                return Ok(measure);
            }
        }


        [HttpPost]
        public IActionResult UpdateMeasures([FromBody] List<Measure> measures) {
            using (var context = new MetronomeContext())
            {           
                foreach(Measure measure in measures) {
                    if (measure.id == null) {
                        measure.id = new Guid();
                    }
                }    
                
                context.Measure.UpdateRange(measures);
                context.SaveChanges();
                return Ok(measures);
            }
        }


    }
}
