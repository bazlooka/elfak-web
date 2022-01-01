using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Aktivnost")]
    public class Aktivnost
    {
        #region Atributi
        
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(30)]
        public string Naziv { get; set; }

        [Required]
        public float Cena { get; set; }

        #endregion

        // ========== Veze ==========

        #region Veze

        [Required]
        public Krstarenje Krstarenje { get; set; }

        public List<Putnik> Putinci { get; set; }

        public List<ClanPosade> ClanoviPosade { get; set; }

        #endregion
    }
}