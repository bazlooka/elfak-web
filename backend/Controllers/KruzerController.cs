using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Agencija.Models;

namespace Agencija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KruzerController : ControllerBase
    {
        public AgencijaContext Context { get; set; }

        public KruzerController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Dodaj/{cenaNocenja}/{kapacitetSoba}")]
        [HttpPost]
        public async Task<ActionResult> DodajKruzer([FromBody] Kruzer kruzer, float cenaNocenja, int kapacitetSoba)
        {
            if (kruzer.BrojRedova > kruzer.BrojSobaPoRedu)
            {
                return BadRequest("Broj redova ne može biti veći od broja soba!");
            }

            try
            {
                var uBazi = Context.Kruzeri.Where(p => p.RegBroj == kruzer.RegBroj);
                if (uBazi.Count() > 0)
                    return BadRequest("Kruzer koji pokušavate da kreirate već postoji!");

                List<Soba> sobe = new List<Soba>(kruzer.BrojRedova * kruzer.BrojSobaPoRedu);
                for (int i = 1; i <= kruzer.BrojRedova * kruzer.BrojSobaPoRedu; i++)
                {
                    Soba s = new Soba();
                    s.Broj = i;
                    s.CenaNocenja = cenaNocenja;
                    s.Kapacitet = kapacitetSoba;
                    sobe.Add(s);
                }

                kruzer.Sobe = sobe;

                Context.Kruzeri.Add(kruzer);
                await Context.SaveChangesAsync();
                return Ok($"Kruzer {kruzer.RegBroj} je uspešno dodat!");
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("Izmeni/{cenaNocenja}/{kapacitetSoba}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniKruzer([FromBody] Kruzer kruzer, float cenaNocenja, int kapacitetSoba)
        {
            if (kruzer.BrojRedova > kruzer.BrojSobaPoRedu)
            {
                return BadRequest("Broj redova ne može biti veći od broja soba!");
            }

            try
            {
                var kruzerUBazi = await Context.Kruzeri.Where(p => p.RegBroj == kruzer.RegBroj)
                                                    .FirstOrDefaultAsync();

                if (kruzerUBazi == null)
                    return BadRequest("Kruzer koji pokušavate da izmenite ne postoji!");

                if (kruzerUBazi.BrojRedova > kruzer.BrojRedova)
                {
                    return BadRequest("Ne možete smanjiti broj redova u kruzeru!");
                }

                if (kruzerUBazi.BrojSobaPoRedu > kruzer.BrojSobaPoRedu)
                {
                    return BadRequest("Ne možete smanjiti broj soba u kruzeru!");
                }

                kruzerUBazi.NazivBroda = kruzer.NazivBroda;
                kruzerUBazi.BrojSobaPoRedu = kruzer.BrojSobaPoRedu;
                kruzerUBazi.BrojRedova = kruzer.BrojRedova;
                await Context.SaveChangesAsync();
                return Ok($"Kruzer {kruzerUBazi.RegBroj} je uspešno izmenjen!");
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("PreuzmiListu")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiListu()
        {
            try
            {
                return Ok
                (
                    await Context.Kruzeri.Select(p =>
                        new
                        {
                            ID = p.ID,
                            Naziv = $"[{p.RegBroj}] {p.NazivBroda} - {p.BrojRedova} x {p.BrojSobaPoRedu}"
                        }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("Obrisi/{regBroj}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiKruzer(string regBroj)
        {
            try
            {
                var kruzer = await Context.Kruzeri.Where(p => p.RegBroj == regBroj).FirstOrDefaultAsync();
                if (kruzer == null)
                    return BadRequest("Kruzer koji želite da obrišete ne postoji!");

                Context.Kruzeri.Remove(kruzer);
                await Context.SaveChangesAsync();
                return Ok($"Kruzer {regBroj} je uspešno obrisan!");
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }
    }
}
