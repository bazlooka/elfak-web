using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("ClanPosade")]
    public class ClanPosade
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Range(1, 10000)]
        public int BrLicence { get; set; }

        [Required]
        [MaxLength(30)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(30)]
        public string Prezime { get; set; }

        [MaxLength(30)]
        public string Cin { get; set; }

        // ========== Veze ==========

        public List<AngazovanSpoj> AngazovanNa { get; set; }

        public List<Aktivnost> Aktivnosti { get; set; }
    }
}