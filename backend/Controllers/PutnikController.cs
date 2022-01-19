using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Agencija.Models;

namespace Agencija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PutnikController : ControllerBase
    {
        public AgencijaContext Context { get; set; }

        public PutnikController(AgencijaContext context)
        {
            Context = context;
        }

        [Route("Dodaj")]
        [HttpPost]
        public async Task<ActionResult> DodajPutnika([FromBody] Putnik putnik)
        {
            if (string.IsNullOrEmpty(putnik.BrojPasosa))
                return BadRequest("Morate uneti broj pasoša putnika!");

            if (putnik.BrojPasosa.Length < 4)
                return BadRequest("Broj pasoša putnika je prekratak! Kompletni broj pasoša "
                + "se sastoji od troslovne skraćenice države i broja pasoša.");

            if (!putnik.BrojPasosa.Substring(0, 3).All(Char.IsLetter))
                return BadRequest("Broj pasoša mora da počinje sa troslovnom skraćenicom države!");

            if (!putnik.BrojPasosa.Substring(3).All(Char.IsDigit))
                return BadRequest("Broj pasoša nije ispravan! Nakon skraćenice države dozvoljene su samo cifre!");

            if (putnik.Pol != "m" && putnik.Pol != "z")
                return BadRequest("Pol putnika nije ispravan!");
            try
            {
                var uBazi = Context.Putnici.Where(p => p.BrojPasosa == putnik.BrojPasosa);
                if (uBazi.Count() > 0)
                    return BadRequest("Putnik kojeg pokušavate da kreirate već postoji!");

                Context.Putnici.Add(putnik);
                await Context.SaveChangesAsync();
                return Ok($"Putnik {putnik.Ime} {putnik.Prezime} je uspešno dodat!");
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("Izmeni")]
        [HttpPut]
        public async Task<ActionResult> IzmeniPutnika([FromBody] Putnik putnik)
        {
            if (string.IsNullOrEmpty(putnik.BrojPasosa))
                return BadRequest("Morate uneti broj pasoša putnika!");

            if (putnik.BrojPasosa.Length < 4)
                return BadRequest("Broj pasoša putnika je prekratak! Kompletni broj pasoša "
                + "se sastoji od troslovne skraćenice države i broja pasoša.");

            if (!putnik.BrojPasosa.Substring(0, 3).All(Char.IsLetter))
                return BadRequest("Broj pasoša mora da počinje sa troslovnom skraćenicom države!");

            if (!putnik.BrojPasosa.Substring(3).All(Char.IsDigit))
                return BadRequest("Broj pasoša nije ispravan! Nakon skraćenice države dozvoljene su samo cifre!");

            try
            {
                var putnikUBazi = await Context.Putnici.Where(p => p.BrojPasosa == putnik.BrojPasosa)
                                                    .FirstOrDefaultAsync();

                if (putnikUBazi == null)
                    return BadRequest("Putnik kojeg pokušavate da izmenite ne postoji!");

                putnikUBazi.Ime = putnik.Ime;
                putnikUBazi.Prezime = putnik.Prezime;
                putnikUBazi.Pol = putnik.Pol;
                putnikUBazi.DatumRodjenja = putnik.DatumRodjenja;
                await Context.SaveChangesAsync();
                return Ok($"Putnik {putnikUBazi.Ime} {putnikUBazi.Prezime} je uspešno izmenjen!");
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }

        [Route("Obrisi/{brPasosa}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiPutnika(string brPasosa)
        {
            try
            {
                var putnik = await Context.Putnici.Where(p => p.BrojPasosa == brPasosa).FirstOrDefaultAsync();
                if (putnik == null)
                    return BadRequest("Putnik kojeg želite da obrišete ne postoji!");

                string ime = putnik.Ime;
                string prezime = putnik.Prezime;

                Context.Putnici.Remove(putnik);
                await Context.SaveChangesAsync();
                return Ok($"Putnik {ime} {prezime} je uspešno obrisan!");
            }
            catch (Exception e)
            {
                return BadRequest("Došlo je do greške: " + e.Message);
            }
        }
    }
}
