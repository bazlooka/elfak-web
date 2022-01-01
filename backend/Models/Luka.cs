using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("Luka")]
    public class Luka
    {
        #region Atributi

        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(5)]
        public string Oznaka { get; set; }

        [Required]
        public float VisinaTakse { get; set; }

        [MaxLength(30)]
        public string Naziv { get; set; }

        [MaxLength(30)]
        public string Drzava { get; set; }

        [MaxLength(30)]
        public string Grad { get; set; }

        #endregion

        // ========== Veze ==========

        #region Veze

        public List<Krstarenje> PolaznaLukaZa { get; set; }
        public List<Krstarenje> UsputnaLukaZa { get; set; }
        public List<Krstarenje> OdredisnaLukaZa { get; set; }

        #endregion
    }
}