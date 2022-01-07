using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("AngazovanSpoj")]
    public class AngazovanSpoj
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public float Honorar { get; set; }

        // ========== Veze ==========

        [Required]
        public ClanPosade ClanPosade { get; set; }

        [JsonIgnore]
        [Required]
        public Krstarenje Krstarenje { get; set; }
    }
}