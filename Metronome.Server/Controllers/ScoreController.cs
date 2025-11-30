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
    public class ScoreController : ControllerBase
    {
        private readonly MetronomeContext _context;

        public ScoreController(MetronomeContext context)
        {
            _context = context;
        }

        // GET: api/Score
        [HttpGet("Score")]
        public async Task<ActionResult<IEnumerable<Score>>> GetScores()
        {
            return await _context.Scores.ToListAsync();
        }

        // GET: api/Composer/1/Scores
        [HttpGet("Composer/{composerId}/Scores")]
        public async Task<ActionResult<IEnumerable<Score>>> GetScoresForComposer(int composerId)
        {
            return await _context.Scores.Where(m => m.ComposerID == composerId).ToListAsync();
        }

        // GET: api/Score/5
        [HttpGet("Score/{id}")]
        public async Task<ActionResult<Score>> GetScore(int id)
        {
            var score = await _context.Scores.FindAsync(id);

            if (score == null)
            {
                return NotFound();
            }

            return score;
        }

        // PUT: api/Score/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Score/{id}")]
        public async Task<IActionResult> PutScore(int id, Score score)
        {
            if (id != score.ID)
            {
                return BadRequest();
            }

            _context.Entry(score).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
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

        // POST: api/Score
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Score")]
        public async Task<ActionResult<Score>> PostScore(Score score)
        {
            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScore", new { id = score.ID }, score);
        }

        // DELETE: api/Score/5
        [HttpDelete("Score/{id}")]
        public async Task<IActionResult> DeleteScore(int id)
        {
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            _context.Scores.Remove(score);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScoreExists(int id)
        {
            return _context.Scores.Any(e => e.ID == id);
        }
    }
}
