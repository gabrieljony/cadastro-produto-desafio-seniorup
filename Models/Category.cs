using System.ComponentModel.DataAnnotations;

namespace StoreComputers.Models
{
  public class Category
  {
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Este campo é obrigatório")]
    [MaxLength(60, ErrorMessage = "Este campo é obrigatório")]
    [MinLength(3, ErrorMessage = "Este campo é obrigatório")]
    public string Title { get; set; }
  }
}