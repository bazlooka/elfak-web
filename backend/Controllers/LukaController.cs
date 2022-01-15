using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using Agencija.Models;

namespace Agencija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LukaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public LukaController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Dodaj")]
        [HttpPost]
        public async Task<ActionResult> DodajLuku([FromBody] Luka luka)
        {
            try
            {
                var uBazi = Context.Luke.Where(p => p.Oznaka == luka.Oznaka);
                if(uBazi.Count() > 0)
                    return BadRequest("Luka koju pokušavate da kreirate je već postoji!");

                Context.Luke.Add(luka);
                await Context.SaveChangesAsync();
                return Ok($"Luka {luka.Oznaka} je uspešno dodata!");      
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Izmeni")]
        [HttpPut]
        public async Task<ActionResult> IzmeniLuku([FromBody] Luka luka)
        {
            try
            {
                var lukaUBazi = await Context.Luke.Where(p => p.Oznaka == luka.Oznaka)
                                                    .FirstOrDefaultAsync();

                if(lukaUBazi == null)
                    return BadRequest("Luka koju pokušavate da izmenite ne postoji!");

                lukaUBazi.Naziv = luka.Naziv;
                lukaUBazi.VisinaTakse = luka.VisinaTakse;
                lukaUBazi.Grad = luka.Grad;
                lukaUBazi.Drzava = luka.Drzava;
                await Context.SaveChangesAsync();
                return Ok($"Luka {lukaUBazi.Oznaka} je uspešno izmenjena!");      
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Preuzmi/{id}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKrstarenje(int id) {
            Luka l = await Context.Luke.FindAsync(id);
            if(l == null)
                return BadRequest("Tražena luka ne postoji!");
            return Ok(l);
        }

        [Route("PreuzmiSve")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiLuke()
        {
            var luke = await Context.Luke.ToListAsync();
            return Ok(luke);
         }

        [Route("PreuzmiListu")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiListu()
        {      
            return Ok
            (
                await Context.Luke.Select(p => 
                    new {
                        ID = p.ID,
                        Naziv = $"[ {p.Oznaka} ] {p.Naziv} - {p.Grad}"
                    }).ToListAsync()
            );
        } 

        [Route("Obrisi/{oznaka}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiLuku(string oznaka)
        {
            var luka = await Context.Luke.Where(p => p.Oznaka == oznaka).FirstOrDefaultAsync();
            if(luka == null)
                return BadRequest("Luka koju želite da obrišete ne postoji!");

            Context.Luke.Remove(luka);
            await Context.SaveChangesAsync();
            return Ok($"Luka {oznaka} je uspešno obrisana!");
        }
    }
}
