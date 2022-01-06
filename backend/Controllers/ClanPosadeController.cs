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
    public class ClanPosadeController : ControllerBase
    {
        public AgencijaContext Context { get; set; }

        public ClanPosadeController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Dodaj")]
        [HttpPost]
        public async Task<ActionResult> DodajClanaPosade([FromBody] ClanPosade clanPosade)
        {
            try
            {
                var uBazi = Context.ClanoviPosade.Where(p => p.BrLicence == clanPosade.BrLicence);
                if(uBazi.Count() > 0)
                    return BadRequest("Član posade kojeg pokušavate da kreirate već postoji!");

                Context.ClanoviPosade.Add(clanPosade);
                await Context.SaveChangesAsync();
                return Ok($"Ćlan posade {clanPosade.Ime} {clanPosade.Prezime} je uspešno dodat!");      
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Izmeni")]
        [HttpPut]
        public async Task<ActionResult> IzmeniClanaPosade([FromBody] ClanPosade clanPosade)
        {
            try
            {
                var clanPosadeUBazi = await Context.ClanoviPosade.Where(p => p.BrLicence == clanPosade.BrLicence)
                                            .FirstOrDefaultAsync();

                if(clanPosadeUBazi == null)
                    return BadRequest("Člana posade kojeg pokušavate da izmenite ne postoji!");

                clanPosadeUBazi.Ime = clanPosade.Ime;
                clanPosadeUBazi.Prezime = clanPosade.Prezime;
                clanPosadeUBazi.Cin = clanPosade.Cin;
                await Context.SaveChangesAsync();
                return Ok($"Član posade {clanPosadeUBazi.Ime} {clanPosadeUBazi.Prezime} je uspešno izmenjen!");      
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiSve")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiClanovePosade()
        {
            var clanoviPosade = await Context.ClanoviPosade.ToListAsync();
            return Ok(clanoviPosade);
         }

        [Route("Obrisi/{brLicence}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiClanaPosade(int brLicence)
        {
            var clanPosade = await Context.ClanoviPosade.Where(p => p.BrLicence == brLicence).FirstOrDefaultAsync();
            if(clanPosade == null)
                return BadRequest("Član posade kojeg želite da obrišete ne postoji!");

            string ime = clanPosade.Ime;
            string prezime = clanPosade.Prezime;

            Context.ClanoviPosade.Remove(clanPosade);
            await Context.SaveChangesAsync();
            return Ok($"Putnik {ime} {prezime} je uspešno obrisan!");
        }
    }
}
