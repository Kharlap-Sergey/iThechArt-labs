using Homeexchange.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homeexchange.Domain.Configurations
{

    public sealed class PrivateRoomConfiguration 
        : IEntityTypeConfiguration<PrivateRoom>
    {
        public void Configure(
            EntityTypeBuilder<PrivateRoom> builder
            )
        {
            builder.HasKey(pr => new { pr.Member1Id, pr.Member2Id });
        }
    }
}
