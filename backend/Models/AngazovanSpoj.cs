using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("AngazovanSpoj")]
    public class AngazovanSpoj
    {
        #region Atributi

        [Key]
        public int ID { get; set; }

        [Required]
        public float Honorar { get; set; }

        #endregion

        // ========== Veze ==========

        #region Veze

        [Required]
        public ClanPosade ClanPosade { get; set; }

        [Required]
        public Krstarenje Krstarenje { get; set; }

        #endregion
    }
}