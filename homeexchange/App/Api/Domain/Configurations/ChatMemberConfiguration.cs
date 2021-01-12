using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Homeexchange.Models.Entities;

namespace Homeexchange.Domain.Configurations
{
    public sealed class ChatMemberConfiguration : IEntityTypeConfiguration<ChatMember>
    {
        public void Configure(EntityTypeBuilder<ChatMember> builder)
        {
            builder.HasKey(e => new { e.ChatId, e.UserId });
        }
    }
}
