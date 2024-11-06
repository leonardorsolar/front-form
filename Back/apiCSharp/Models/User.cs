using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MyApiProject.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [JsonPropertyName("name")] // Mapeia para a chave 'name' em minúsculas
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [JsonPropertyName("email")] // Mapeia para a chave 'email' em minúsculas
        public string Email { get; set; }

        [Required]
        [JsonPropertyName("password")] // Mapeia para a chave 'password' em minúsculas
        public string Password { get; set; }
    }
}
