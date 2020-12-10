using HomeexchangeApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Domain.Configurations
{

    public class PrivateRoomConfiguration : IEntityTypeConfiguration<PrivateRoom>
    {
        public void Configure(EntityTypeBuilder<PrivateRoom> builder)
        {
            builder.HasKey(pr => new { pr.Member1, pr.Member2 });
        }
    }
}
