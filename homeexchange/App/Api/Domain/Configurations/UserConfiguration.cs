using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homeexchange.Domain.Configurations
{
    public sealed class UserConfiguration 
        : IEntityTypeConfiguration<User>
    {
        public void Configure(
            EntityTypeBuilder<User> builder
            )
        {
            builder.HasIndex(u => u.Email).IsUnique();
            builder.HasIndex(u => u.Nickname).IsUnique();
        }
    }
}
