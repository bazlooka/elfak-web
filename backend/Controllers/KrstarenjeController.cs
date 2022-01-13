using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Agencija.Models;

namespace Agencija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KrstarenjeController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public KrstarenjeController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiListu")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiListu()
        {      
            return Ok
            (
                await Context.Krstarenja.Select(p => 
                    new {
                        ID = p.ID,
                        Naziv = $"[{p.Kruzer.RegBroj}] {p.DatumPocetka.ToString("dd.MM.yyyy.")}  -  {p.PolaznaLuka.Oznaka} -> {p.OdredisnaLuka.Oznaka}"
                    }).ToListAsync()
            );
        } 

        [Route("Preuzmi/{id}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKrstarenje(int id) {
            Krstarenje k = await Context.Krstarenja.Where(p => p.ID == id)
                                                .Include(p => p.Kruzer)
                                                    .ThenInclude(p => p.Sobe.OrderBy(p => p.Broj))
                                                    .ThenInclude(p => p.KrstariSpoj.Where(p => p.Krstarenje.ID == id))
                                                    .ThenInclude(p => p.Putnik)
                                                .Include(p => p.PolaznaLuka)
                                                .Include(p => p.OdredisnaLuka)
                                                .Include(p => p.UsputneLuke)
                                                .Include(p => p.Aktivnosti)
                                                .Include(p => p.ClanoviPosade)
                                                .FirstOrDefaultAsync();
            if(k == null)
                return BadRequest("Traženo krstarenje ne postoji!");
            return Ok(k);
        }

        [Route("Kreiraj/{idKruzera}")]
        [HttpPost]
        public async Task<ActionResult> PreuzmiKrstarenje([FromBody] Krstarenje krstarenje, int idKruzera) {
            if(krstarenje.DatumZavrsetka < krstarenje.DatumPocetka)
                return BadRequest("Krstarenje ne može da se završi pre nego što je počelo!");
            
            Kruzer kruzer = await Context.Kruzeri.FindAsync(idKruzera);
            if(kruzer == null)
                return BadRequest("Izabrani kruzer ne postoji!");

            krstarenje.Kruzer = kruzer;

            Context.Krstarenja.Add(krstarenje);
            await Context.SaveChangesAsync();
            return Ok(krstarenje);
        }

        [Route("PostaviLuke/{idKrstarenja}")]
        [HttpPut]
        public async Task<ActionResult> PostaviLuke(int idKrstarenja, [FromQuery] int? idPolazneLuke, 
        [FromQuery] int? idOdredisneLuke, [FromQuery] int[] idUsputneLuke)
        {
            Krstarenje krstarenje = await Context.Krstarenja
                                            .Include(p => p.PolaznaLuka)
                                            .Include(p => p.UsputneLuke)
                                            .Include(p => p.OdredisnaLuka)
                                            .FirstOrDefaultAsync(p => p.ID == idKrstarenja);
            Luka polaznaLuka = null;
            Luka odredisnaLuka = null;
            List<Luka> usputneLuke = null;

            if(krstarenje == null)                  
                return BadRequest("Krstarenje kojem želite da dodate luke ne postoji!");
            
            if(idPolazneLuke != null)
            {
                polaznaLuka = await Context.Luke.FindAsync(idPolazneLuke);
                if(polaznaLuka == null)                  
                    return BadRequest("Početna luka koju želite da dodate ne postoji!");
            }

            if(idOdredisneLuke != null)
            {
                odredisnaLuka = await Context.Luke.FindAsync(idOdredisneLuke);
                if(odredisnaLuka == null)                  
                    return BadRequest("Odredišna luka koju želite da dodate ne postoji!");
            }
            
            if(idUsputneLuke != null)
            {
                usputneLuke = await Context.Luke.Where(p => idUsputneLuke.Contains(p.ID)).ToListAsync();

                if(usputneLuke.Count != idUsputneLuke.Length)
                    return BadRequest("Neka od usputnih luka koju želite da dodate ne postoji!");
            }
            
            krstarenje.PolaznaLuka = polaznaLuka;
            krstarenje.OdredisnaLuka = odredisnaLuka;
            krstarenje.UsputneLuke = usputneLuke;
            
            await Context.SaveChangesAsync();
            return Ok("Luke su uspešno sačuvane!");
        }

    }
}
