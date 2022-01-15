using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Agencija.Models;

namespace Agencija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SobaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public SobaController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Izmeni/{idSobe}/{kapacitet}/{cena}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniSobu(int idSobe, int kapacitet, float cena)
        {    
            if(kapacitet > 10)
                return BadRequest("Kapacitet sobe je preveliki!");

            if(cena > 10000)
                return BadRequest("Cena noćenja sobe je prevelika!");

            Soba soba = await Context.Sobe.FindAsync(idSobe);
            if(soba == null)
                return BadRequest("Soba koju želite da izmenite ne postoji!");

            soba.Kapacitet = kapacitet;
            soba.CenaNocenja = cena;

            await Context.SaveChangesAsync();
            return Ok(soba);
        }
    }
}
