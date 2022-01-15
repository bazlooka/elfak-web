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
                        Naziv = $"[ {p.Kruzer.RegBroj} ] {p.DatumPocetka.ToString("dd.MM.yyyy.")}  "
                                    + $"-  {p.PolaznaLuka.Oznaka} -> {p.OdredisnaLuka.Oznaka}"
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
                                                    .ThenInclude(p => p.Putinci)
                                                .Include(p => p.Aktivnosti)
                                                    .ThenInclude(p => p.ClanoviPosade)
                                                .Include(p => p.ClanoviPosade)
                                                    .ThenInclude(p => p.ClanPosade)
                                                .FirstOrDefaultAsync();

            if(k == null)
                return BadRequest("Traženo krstarenje ne postoji!");

            k.Aktivnosti.ForEach(akt => {
                akt.PutinciId = akt.Putinci.Select(p => p.ID).ToList();
                akt.ClanoviPosadeId = akt.ClanoviPosade.Select(p => p.ID).ToList();
            });
            return Ok(k);
        }

        [Route("Kreiraj/{idKruzera}")]
        [HttpPost]
        public async Task<ActionResult> PreuzmiKrstarenje([FromBody] Krstarenje krstarenje, int idKruzera) {
            if(krstarenje.DatumZavrsetka < krstarenje.DatumPocetka)
                return BadRequest("Krstarenje ne može da se završi pre nego što je počelo!");
            
            Kruzer kruzer = await Context.Kruzeri.Include(p => p.Sobe.OrderBy(p => p.Broj))
                                                    .ThenInclude(p => p.KrstariSpoj)
                                                    .ThenInclude(p => p.Putnik)
                                                    .Where(p => p.ID == idKruzera)
                                                    .FirstOrDefaultAsync();
            if(kruzer == null)
                return BadRequest("Izabrani kruzer ne postoji!");

            krstarenje.Kruzer = kruzer;

            Context.Krstarenja.Add(krstarenje);
            await Context.SaveChangesAsync();

            krstarenje.UsputneLuke = new List<Luka>();
            krstarenje.ClanoviPosade = new List<AngazovanSpoj>();
            krstarenje.Aktivnosti = new List<Aktivnost>();

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

        [Route("DodajPutnika/{idKrstarenja}/{iSobe}/{brPasosa}")]
        [HttpPut]
        public async Task<ActionResult> DodajPutnika(int idKrstarenja, int iSobe, string brPasosa)
        {
            Krstarenje krstarenje = await Context.Krstarenja
                                            .Include(p => p.KrstariSpojevi)
                                            .Include(p => p.Kruzer)
                                                .ThenInclude(p => p.Sobe.OrderBy(p => p.Broj))
                                            .Where(p => p.ID == idKrstarenja)
                                                .FirstOrDefaultAsync();

            if(krstarenje == null)                  
                return BadRequest("Krstarenje kojem želite da dodate luke ne postoji!");

            Putnik putnik = await Context.Putnici
                                            .Where(p => p.BrojPasosa == brPasosa)
                                            .FirstOrDefaultAsync();

            if(putnik == null)                  
                return BadRequest("Putnik kojeg želite da dodate ne postoji!");

            if(krstarenje.Kruzer.Sobe.Count < iSobe)
                return BadRequest("Soba u koju želite da dodate putnika ne postoji!");

            foreach(KrstariSpoj spoj in krstarenje.KrstariSpojevi)
            {
                if(spoj.PutnikId == putnik.ID)
                    return BadRequest("Putnik kojeg želite da dodate već je na krstarenju!");
            }

            KrstariSpoj noviSpoj = new KrstariSpoj();
            noviSpoj.Krstarenje = krstarenje;
            noviSpoj.Putnik = putnik;
            noviSpoj.Soba = krstarenje.Kruzer.Sobe[iSobe];

            krstarenje.KrstariSpojevi.Add(noviSpoj);

            await Context.SaveChangesAsync();
            return Ok(noviSpoj);
        }

        [Route("ObrisiPutnika/{idKrstarenja}/{idPutnika}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiPutnika(int idKrstarenja, int idPutnika)
        {
            Krstarenje krstarenje = await Context.Krstarenja
                                            .Include(p => p.KrstariSpojevi)
                                            .Where(p => p.ID == idKrstarenja)
                                                .FirstOrDefaultAsync();

            if(krstarenje == null)                  
                return BadRequest("Krstarenje kojem želite da dodate luke ne postoji!");

            KrstariSpoj spoj = krstarenje.KrstariSpojevi.Where(p => p.PutnikId == idPutnika).FirstOrDefault();

             if(spoj == null)                  
                return BadRequest("Putnik kojeg želite da obrišete ne postoji na krstarenju!");

            krstarenje.KrstariSpojevi.Remove(spoj);

            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("DodajClanaPosade/{idKrstarenja}/{brLicence}/{honorar}")]
        [HttpPost]
        public async Task<ActionResult> DodajClanaPosade(int idKrstarenja, int brLicence, float honorar)
        {
            Krstarenje krstarenje = await Context.Krstarenja
                                            .Include(p => p.ClanoviPosade)
                                            .Where(p => p.ID == idKrstarenja)
                                                .FirstOrDefaultAsync();

            if(krstarenje == null)                  
                return BadRequest("Krstarenje kojem želite da dodate člana posade ne postoji!");
            
            ClanPosade clanPosade = await Context.ClanoviPosade
                                                .Where(p => p.BrLicence == brLicence)
                                                .FirstOrDefaultAsync();

            if(clanPosade == null)                  
                return BadRequest("Član posade kojeg želite da dodate ne postoji!");

            AngazovanSpoj angazovanSpoj = new AngazovanSpoj();
            angazovanSpoj.Krstarenje = krstarenje;
            angazovanSpoj.ClanPosade = clanPosade;
            angazovanSpoj.Honorar = honorar;

            krstarenje.ClanoviPosade.Add(angazovanSpoj);

            await Context.SaveChangesAsync();
            return Ok(angazovanSpoj);
        }

        [Route("ObrisiClanaPosade/{idKrstarenja}/{idClanaPosade}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiClanaPosade(int idKrstarenja, int idClanaPosade)
        {
            Krstarenje krstarenje = await Context.Krstarenja
                                            .Include(p => p.ClanoviPosade)
                                            .Where(p => p.ID == idKrstarenja)
                                                .FirstOrDefaultAsync();

            if(krstarenje == null)                  
                return BadRequest("Krstarenje kojem želite da dodate člana posade ne postoji!");
            
            ClanPosade clanPosade = await Context.ClanoviPosade
                                                .FindAsync(idClanaPosade);
            if(clanPosade == null)                  
                return BadRequest("Član posade kojeg želite da obrišete ne postoji!");

            AngazovanSpoj angazovanSpoj = krstarenje.ClanoviPosade
                                            .Where(p => p.ClanPosade.ID == idClanaPosade)
                                            .FirstOrDefault();

            if(angazovanSpoj == null)
                return BadRequest("Član posade kojeg želite da obrišete nije angažovan na krstarenju!");

            krstarenje.ClanoviPosade.Remove(angazovanSpoj);

            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
