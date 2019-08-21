﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NewOnline.Models;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace NewOnline.Migrations
{
    [DbContext(typeof(MetronomeContext))]
    [Migration("20190804164111_AddMeasureNumber2")]
    partial class AddMeasureNumber2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("NewOnline.Models.Composer", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("birth_date");

                    b.Property<string>("first_name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("last_name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("id");

                    b.ToTable("Composer");
                });

            modelBuilder.Entity("NewOnline.Models.Measure", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("beats");

                    b.Property<int>("bottom");

                    b.Property<int>("measureNumber");

                    b.Property<Guid>("score");

                    b.Property<double>("tempo");

                    b.Property<int>("top");

                    b.HasKey("id");

                    b.ToTable("Measure");
                });

            modelBuilder.Entity("NewOnline.Models.Score", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("composer");

                    b.Property<DateTime>("create_date");

                    b.Property<Guid>("creator");

                    b.Property<string>("title");

                    b.HasKey("id");

                    b.ToTable("Score");
                });

            modelBuilder.Entity("NewOnline.Models.User", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("create_date");

                    b.Property<string>("first_name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("handle")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("last_name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("id");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}