﻿using Microsoft.EntityFrameworkCore;
using HomeexchangeApi.Domain.Configurations;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Domain
{
    public class CustomDbContext : DbContext
    {
        public CustomDbContext(DbContextOptions<CustomDbContext> options)
            : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new ChatMemberConfiguration());
            modelBuilder.ApplyConfiguration(new PrivateRoomConfiguration());

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<ResponseToAd> ResponsesToAd { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<Notification> NotificationsAboutResponseToAd { get; set; }
        public DbSet<Img> Imgs { set; get; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMember> ChatMembers { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<PrivateRoom> PrivateRooms { get; set; }
    }
}
