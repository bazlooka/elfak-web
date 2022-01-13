using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Kruzer")]
    public class Kruzer
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(10)]
        public string RegBroj { get; set; }

        [Required]
        [MaxLength(30)]
        public string NazivBroda { get; set; }

        [Required]
        public int BrojSobaPoRedu { get; set; }

        [Required]
        public int BrojRedova { get; set; }
        

        // ========== Veze ==========

        [JsonIgnore]
        public List<Krstarenje> Krstarenja { get; set; }

        public List<Soba> Sobe { get; set; }
    }
}