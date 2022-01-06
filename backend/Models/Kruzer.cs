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
        [Range(1, 200)]
        public int BrojSoba { get; set; }

        [Required]
        public int BrojRedova { get; set; }
        
        public int GodinaProizvodnje { get; set; }
    
        [MaxLength(30)]
        public string Prevoznik { get; set; }

        // ========== Veze ==========

        public List<Krstarenje> Krstarenja { get; set; }

        public List<Soba> Sobe { get; set; }
    }
}