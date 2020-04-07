using System.ComponentModel.DataAnnotations;

namespace StoreComputers.Models
{
  public class Product
  {
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Este campo é obrigatório")]
    [MaxLength(60, ErrorMessage = "Este campo é obrigatório")]
    [MinLength(3, ErrorMessage = "Este campo é obrigatório")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Este campo é obrigatório")]
    [MaxLength(1024, ErrorMessage = "Este campo é obrigatório")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Este campo é obrigatório")]
    [Range(1, int.MaxValue, ErrorMessage = "Este campo é obrigatório")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "Este campo é obrigatório")]
    [Range(1, int.MaxValue, ErrorMessage = "Este campo é obrigatório")]
    public int CategoryId { get; set; }
    public Category Category { get; set; }
  }
}