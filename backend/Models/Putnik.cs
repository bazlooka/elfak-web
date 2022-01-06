using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Putnik")]
    public class Putnik
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string BrojPasosa { get; set; }

        [Required]
        [MaxLength(30)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(30)]
        public string Prezime { get; set; }

        [Required]
        [MaxLength(1)]
        public string Pol { get; set; }

        public DateTime DatumRodjenja { get; set; }

        // ========== Veze ==========

        public List<KrstariSpoj> KrstariSpoj { get; set; }

        public List<Aktivnost> Aktivnosti { get; set; }
    }
}