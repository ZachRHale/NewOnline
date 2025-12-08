using Metronome.Server;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Metronome.Server.Controllers
{
    [Authorize]

    [Route("api")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly MetronomeContext _context;

        public SearchController(MetronomeContext context)
        {
            _context = context;
        }

        // GET: api/Score
        [HttpGet("Search")]
        public async Task<ActionResult> Search(string term)
        {

            var scores = await _context.Scores
                .Where(s => s.Title.Contains(term) ||
                            s.Composer!.FirstName.Contains(term) ||
                            s.Composer!.LastName.Contains(term) ||
                            s.User!.Username.Contains(term))
                .Include(s => s.Composer)
                .Include(s => s.User)
                .ToListAsync();
            return Ok(scores);
        }
    }
}
