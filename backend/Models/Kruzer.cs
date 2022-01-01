using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Kruzer")]
    public class Kruzer
    {
        #region Atributi

        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(10)]
        public string RegBroj { get; set; }

        [Required]
        [MaxLength(30)]
        public string NazivBroda { get; set; }

        [Required]
        public int BrojSoba { get; set; }

        [Required]
        public int BrojRedova { get; set; }

        [Range(1950, 2022)]
        public int GodinaProizvodnje { get; set; }
    
        [MaxLength(30)]
        public string Prevoznik { get; set; }

        #endregion

        // ========== Veze ==========

        #region Veze

        public List<Krstarenje> Krstarenja { get; set; }

        public List<Soba> Sobe { get; set; }

        #endregion
    }
}