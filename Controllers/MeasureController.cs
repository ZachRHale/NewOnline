using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewOnline.Models;

namespace NewOnline.Controllers
{
    [Route("api/[controller]")]
    public class MeasureController : Controller
    {

        [HttpGet("{score}")]
        public IActionResult GetMeasures(string score)
        {
            using (var context = new MetronomeContext()) {
                
                var measures = context.Measure.Where(s => s.score.ToString() == score).ToList();
                return Json(measures);

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
