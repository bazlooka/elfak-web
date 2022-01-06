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
                        Naziv = $"[{p.BrPolaska}] {p.PolaznaLuka.Oznaka} - {p.OdredisnaLuka.Oznaka}  {p.DatumPocetka.ToShortDateString()}"
                    }).ToListAsync()
            );
        } 


        [Route("Test")]
        [HttpGet]
        public ActionResult Test()
        {
            Kruzer kruzer = Context.Kruzeri.Where(p => p.ID == 1).FirstOrDefault();

            for(int i = 0; i < 5; i++)
            {
                Krstarenje k = new Krstarenje();
                k.BrPolaska = i;
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
