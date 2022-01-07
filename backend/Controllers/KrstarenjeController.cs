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
                        Naziv = $"[{p.Kruzer.RegBroj}] {p.PolaznaLuka.Oznaka} - {p.OdredisnaLuka.Oznaka}  {p.DatumPocetka.ToShortDateString()}"
                    }).ToListAsync()
            );
        } 

        [Route("Preuzmi/{id}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKrstarenje(int id) {
            Krstarenje k = await Context.Krstarenja.FindAsync(id);
            if(k == null)
                return BadRequest("Traženo krstarenje ne postoji!");
            //TODO ovde će sigurno da stvara probleme
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


        [Route("Test")]
        [HttpGet]
        public ActionResult Test()
        {
            Kruzer kruzer = Context.Kruzeri.Where(p => p.ID == 1).FirstOrDefault();

            for(int i = 0; i < 5; i++)
            {
                Krstarenje k = new Krstarenje();
                k.DatumPocetka = DateTime.Now;
                k.DatumZavrsetka = DateTime.Now.AddDays(5);
                k.Kruzer = kruzer;
                Context.Krstarenja.Add(k);
            }
            Context.SaveChanges();
            return Ok();
        } 
    }
}
