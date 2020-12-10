using Microsoft.EntityFrameworkCore;
using serverApi.Domain.Entities;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Domain
{
    public class CustomDbContext : DbContext
    {
        public CustomDbContext(DbContextOptions<CustomDbContext> options)
            : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Nickname).IsUnique();
            modelBuilder.Entity<ChatMember>().HasKey(e => new { e.ChatId, e.UserId });

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<ResponseToAd> ResponsesToAd { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<NotificationAboutResponseToAd> NotificationsAboutResponseToAd { get; set; }

        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMember> ChatMembers { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        //public DbSet<Comment> Comments { get; set;}
        //public DbSet<Lang> Langs { get; set;}
    }
}
