using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Metronome.Server;
using Microsoft.AspNetCore.Authorization;

namespace Metronome.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ComposerController : ControllerBase
    {
        private readonly MetronomeContext _context;

        public ComposerController(MetronomeContext context)
        {
            _context = context;
        }

        // GET: api/Composer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Composer>>> GetComposers()
        {
            return await _context.Composers.ToListAsync();
        }

        // GET: api/Composer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Composer>> GetComposer(int id)
        {
            var composer = await _context.Composers.FindAsync(id);

            if (composer == null)
            {
                return NotFound();
            }

            return composer;
        }

        // PUT: api/Composer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComposer(int id, Composer composer)
        {
            if (id != composer.ID)
            {
                return BadRequest();
            }

            _context.Entry(composer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComposerExists(id))
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

        // POST: api/Composer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Composer>> PostComposer(Composer composer)
        {
            _context.Composers.Add(composer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComposer", new { id = composer.ID }, composer);
        }

        // DELETE: api/Composer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComposer(int id)
        {
            var composer = await _context.Composers.FindAsync(id);
            if (composer == null)
            {
                return NotFound();
            }

            _context.Composers.Remove(composer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComposerExists(int id)
        {
            return _context.Composers.Any(e => e.ID == id);
        }
    }
}
