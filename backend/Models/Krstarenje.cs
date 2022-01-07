using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Krstarenje")]
    public class Krstarenje
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime DatumPocetka { get; set; }

        [Required]
        public DateTime DatumZavrsetka { get; set; }

        // ========== Veze ==========

        public Kruzer Kruzer { get; set; }

        public List<AngazovanSpoj> ClanoviPosade { get; set; }

        public List<Aktivnost> Aktivnosti { get; set; }

        public Luka PolaznaLuka { get; set; }

        public Luka OdredisnaLuka { get; set; }

        public List<Luka> UsputneLuke { get; set; }
    }
}