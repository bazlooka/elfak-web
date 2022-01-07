using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Agencija.Models
{
    [Table("KrstariSpoj")]
    public class KrstariSpoj
    {
        [Key]
        public int ID { get; set; }

        public Soba Soba { get; set; }

        [JsonIgnore]
        public Krstarenje Krstarenje { get; set; }

        public Putnik Putnik { get; set; }
    }
}