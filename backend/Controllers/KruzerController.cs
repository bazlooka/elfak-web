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
    public class KruzerController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public KruzerController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Dodaj")]
        [HttpPost]
        public async Task<ActionResult> DodajKruzer([FromBody] Kruzer kruzer)
        {
            if(kruzer.BrojRedova > kruzer.BrojSoba)
            {
                return BadRequest("Broj redova ne može biti veći od broja soba!");
            }
            if(kruzer.GodinaProizvodnje < 1900 && kruzer.GodinaProizvodnje > DateTime.Now.Year)
            {
                return BadRequest("Godina proizvodnje nije ispravna!");
            }

            try
            {
                var uBazi = Context.Kruzeri.Where(p => p.RegBroj == kruzer.RegBroj);
                if(uBazi.Count() > 0)
                    return BadRequest("Kruzer koji pokušavate da kreirate već postoji!");

                Context.Kruzeri.Add(kruzer);
                await Context.SaveChangesAsync();
                return Ok($"Kruzer {kruzer.RegBroj} je uspešno dodat!");      
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Izmeni")]
        [HttpPut]
        public async Task<ActionResult> IzmeniKruzer([FromBody] Kruzer kruzer)
        {
            if(kruzer.BrojRedova > kruzer.BrojSoba)
            {
                return BadRequest("Broj redova ne može biti veći od broja soba!");
            }
            if(kruzer.GodinaProizvodnje < 1900 && kruzer.GodinaProizvodnje > DateTime.Now.Year)
            {
                return BadRequest("Godina proizvodnje nije ispravna!");
            }

            try
            {
                var kruzerUBazi = await Context.Kruzeri.Where(p => p.RegBroj == kruzer.RegBroj)
                                                    .FirstOrDefaultAsync();

                if(kruzerUBazi == null)
                    return BadRequest("Kruzer koji pokušavate da izmenite ne postoji!");

                kruzerUBazi.NazivBroda = kruzer.NazivBroda;
                kruzerUBazi.BrojSoba = kruzer.BrojSoba;
                kruzerUBazi.BrojRedova = kruzer.BrojRedova;
                kruzerUBazi.GodinaProizvodnje = kruzer.GodinaProizvodnje;
                kruzerUBazi.Prevoznik = kruzer.Prevoznik;
                await Context.SaveChangesAsync();
                return Ok($"Kruzer {kruzerUBazi.RegBroj} je uspešno izmenjen!");      
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiSve")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKruzere()
        {
            var kruzeri = await Context.Kruzeri.ToListAsync();
            return Ok(kruzeri);
         }

        [Route("Obrisi/{regBroj}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiKruzer(string regBroj)
        {
            var kruzer = await Context.Kruzeri.Where(p => p.RegBroj == regBroj).FirstOrDefaultAsync();
            if(kruzer == null)
                return BadRequest("Kruzer koji želite da obrišete ne postoji!");

            Context.Kruzeri.Remove(kruzer);
            await Context.SaveChangesAsync();
            return Ok($"Kruzer {regBroj} je uspešno obrisan!");
        }
    }
}
