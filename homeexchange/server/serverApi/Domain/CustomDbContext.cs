﻿using Microsoft.EntityFrameworkCore;
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

            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<User>();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<ResponseToAd> ResponsesToAd { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<NotificationAboutResponseToAd> NotificationsAboutResponseToAd { get; set; }
        //public DbSet<Comment> Comments { get; set;}
        //public DbSet<Lang> Langs { get; set;}
    }
}
