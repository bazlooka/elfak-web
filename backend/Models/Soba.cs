using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Soba")]
    public class Soba
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int Broj { get; set; }

        [Required]
        public float CenaNocenja { get; set; }

        [Required]
        public int Kapacitet { get; set; } 

        // ========== Veze ==========

        
        public List<KrstariSpoj> KrstariSpoj { get; set; }

        [JsonIgnore]
        [Required]
        public Kruzer Kruzer { get; set; }
    }
}