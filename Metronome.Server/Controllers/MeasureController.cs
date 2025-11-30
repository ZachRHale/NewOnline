using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Metronome.Server;

namespace Metronome.Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class MeasureController : ControllerBase
    {
        private readonly MetronomeContext _context;

        public MeasureController(MetronomeContext context)
        {
            _context = context;
        }

        // GET: api/Measure
        [HttpGet("Measure")]
        public async Task<ActionResult<IEnumerable<Measure>>> GetMeasures()
        {
            return await _context.Measures.ToListAsync();
        }

        // GET: api/Measure/5
        [HttpGet("Measure/{id}")]
        public async Task<ActionResult<Measure>> GetMeasure(int id)
        {
            var measure = await _context.Measures.FindAsync(id);

            if (measure == null)
            {
                return NotFound();
            }

            return measure;
        }

        [HttpGet("Score/{scoreId}/Measures")]
        public async Task<ActionResult<IEnumerable<Measure>>> GetMeasuresForScore(int scoreId)
        {
            if (!_context.Scores.Any(s => s.ID == scoreId))
            {
                return NotFound();
            }

            return await _context.Measures.Where(m => m.ScoreID == scoreId).OrderBy(m => m.Number).ToListAsync();
        }

        // PUT: api/Measure/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Measure/{id}")]
        public async Task<IActionResult> PutMeasure(int id, Measure measure)
        {
            if (id != measure.ID)
            {
                return BadRequest();
            }

            _context.Entry(measure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Measure
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Measure")]
        public async Task<ActionResult<Measure>> PostMeasure(Measure measure)
        {
            _context.Measures.Add(measure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeasure", new { id = measure.ID }, measure);
        }

        // DELETE: api/Measure/5
        [HttpDelete("Measure/{id}")]
        public async Task<IActionResult> DeleteMeasure(int id)
        {
            var measure = await _context.Measures.FindAsync(id);
            if (measure == null)
            {
                return NotFound();
            }

            _context.Measures.Remove(measure);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeasureExists(int id)
        {
            return _context.Measures.Any(e => e.ID == id);
        }
    }
}
