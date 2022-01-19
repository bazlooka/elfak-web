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
    public class AktivnostController : ControllerBase
    {
        public AgencijaContext Context { get; set; }

        public AktivnostController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Dodaj/{idKrstarenja}/{naziv}/{cena}/{honorar}")]
        [HttpPost]
        public async Task<ActionResult> DodajAktivnost(int idKrstarenja, string naziv, float cena, float honorar)
        {
            try
            {
                Krstarenje krstarenje = await Context.Krstarenja.Include(p => p.Aktivnosti)
                                                                .Where(p => p.ID == idKrstarenja)
                                                                .FirstOrDefaultAsync();
                if (krstarenje == null)
                    return BadRequest("Krstarenje za koje želite da dodate aktivnost ne postoji!");

                Aktivnost aktivnost = new Aktivnost();
                aktivnost.Naziv = naziv;
                aktivnost.Cena = cena;
                aktivnost.Honorar = honorar;
                aktivnost.Krstarenje = krstarenje;

                krstarenje.Aktivnosti.Add(aktivnost);
                Context.Aktivnosti.Add(aktivnost);

                await Context.SaveChangesAsync();

                aktivnost.Putinci = new List<Putnik>();
                aktivnost.PutinciId = new List<int>();
                aktivnost.ClanoviPosade = new List<ClanPosade>();
                aktivnost.ClanoviPosadeId = new List<int>();

                return Ok(aktivnost);
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("DodajPutnika/{idAktivnosi}/{idPutnika}")]
        [HttpPost]
        public async Task<ActionResult> DodajPutnika(int idAktivnosi, int idPutnika)
        {
            try
            {
                Aktivnost aktivnost = await Context.Aktivnosti.Where(p => p.ID == idAktivnosi)
                                                                    .Include(p => p.Putinci)
                                                                    .FirstOrDefaultAsync();

                if (aktivnost == null)
                    return BadRequest("Aktivnost u koju želite da dodate putnika ne postoji!");

                Putnik putnik = await Context.Putnici.FindAsync(idPutnika);
                if (putnik == null)
                    return BadRequest("Putnik kojeg želite da dodate ne postoji!");

                aktivnost.Putinci.Add(putnik);

                await Context.SaveChangesAsync();
                return Ok(putnik);
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("ObrisiPutnika/{idAktivnosi}/{idPutnika}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiPutnika(int idAktivnosi, int idPutnika)
        {
            try
            {
                Aktivnost aktivnost = await Context.Aktivnosti.Include(p => p.Putinci)
                                                                          .Where(p => p.ID == idAktivnosi)
                                                                          .FirstOrDefaultAsync();
                if (aktivnost == null)
                    return BadRequest("Aktivnost iz koju želite da obrišete putnika ne postoji!");

                Putnik putnik = await Context.Putnici.FindAsync(idPutnika);
                if (putnik == null)
                    return BadRequest("Putnik kojeg želite da obrišete ne postoji!");

                aktivnost.Putinci.Remove(putnik);

                await Context.SaveChangesAsync();
                return Ok(putnik);
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }


        [Route("DodajClanaPosade/{idAktivnosi}/{idClanaPosade}")]
        [HttpPost]
        public async Task<ActionResult> DodajClanaPosade(int idAktivnosi, int idClanaPosade)
        {
            try
            {
                Aktivnost aktivnost = await Context.Aktivnosti.Include(p => p.ClanoviPosade)
                                                                .Where(p => p.ID == idAktivnosi)
                                                                .FirstOrDefaultAsync();
                if (aktivnost == null)
                    return BadRequest("Aktivnost u koju želite da dodate člana posade ne postoji!");

                ClanPosade clanPosade = await Context.ClanoviPosade.FindAsync(idClanaPosade);
                if (clanPosade == null)
                    return BadRequest("Član posade kojeg želite da dodate ne postoji!");

                aktivnost.ClanoviPosade.Add(clanPosade);

                await Context.SaveChangesAsync();
                return Ok(clanPosade);
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("ObrisiClanaPosade/{idAktivnosi}/{idClanaPosade}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiClanaPosade(int idAktivnosi, int idClanaPosade)
        {
            try
            {
                Aktivnost aktivnost = await Context.Aktivnosti.Include(p => p.ClanoviPosade)
                                                            .Where(p => p.ID == idAktivnosi)
                                                            .FirstOrDefaultAsync();
                if (aktivnost == null)
                    return BadRequest("Aktivnost iz koje želite da obrišete člana posade ne postoji!");

                ClanPosade clanPosade = await Context.ClanoviPosade.FindAsync(idClanaPosade);
                if (clanPosade == null)
                    return BadRequest("Član posade kojeg želite da obrišete ne postoji!");

                aktivnost.ClanoviPosade.Remove(clanPosade);

                await Context.SaveChangesAsync();
                return Ok(clanPosade);
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }
    }
}
