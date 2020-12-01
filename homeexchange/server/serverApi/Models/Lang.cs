using System.ComponentModel.DataAnnotations;

namespace serverApi.Models
{
    public class Lang
    {
        
        [Key]
        public int Id;

        public string Name;
        public Rang rang;
    }

    public enum Rang
    {
        A1,
        A2,
        B1,
        B2,
        C1,
        C2
    }
}