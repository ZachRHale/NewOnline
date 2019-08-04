// using System;
// using Microsoft.EntityFrameworkCore.Migrations;

// namespace NewOnline.Migrations
// {
//     public partial class InitialCreate : Migration
//     {
//         protected override void Up(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.CreateTable(
//                 name: "Composer",
//                 columns: table => new
//                 {
//                     id = table.Column<Guid>(nullable: false),
//                     first_name = table.Column<string>(maxLength: 200, nullable: false),
//                     last_name = table.Column<string>(maxLength: 200, nullable: false),
//                     birth_date = table.Column<DateTime>(nullable: false)
//                 },
//                 constraints: table =>
//                 {
//                     table.PrimaryKey("PK_Composer", x => x.id);
//                 });

//             migrationBuilder.CreateTable(
//                 name: "Measure",
//                 columns: table => new
//                 {
//                     id = table.Column<Guid>(nullable: false),
//                     score = table.Column<Guid>(nullable: false),
//                     top = table.Column<int>(nullable: false),
//                     bottom = table.Column<int>(nullable: false),
//                     tempo = table.Column<double>(nullable: false),
//                     beats = table.Column<string>(nullable: true)
//                 },
//                 constraints: table =>
//                 {
//                     table.PrimaryKey("PK_Measure", x => x.id);
//                 });

//             migrationBuilder.CreateTable(
//                 name: "Score",
//                 columns: table => new
//                 {
//                     id = table.Column<Guid>(nullable: false),
//                     title = table.Column<string>(nullable: true),
//                     composer = table.Column<Guid>(nullable: false),
//                     creator = table.Column<Guid>(nullable: false),
//                     create_date = table.Column<DateTime>(nullable: false)
//                 },
//                 constraints: table =>
//                 {
//                     table.PrimaryKey("PK_Score", x => x.id);
//                 });

//             migrationBuilder.CreateTable(
//                 name: "User",
//                 columns: table => new
//                 {
//                     id = table.Column<Guid>(nullable: false),
//                     first_name = table.Column<string>(maxLength: 200, nullable: false),
//                     last_name = table.Column<string>(maxLength: 200, nullable: false),
//                     handle = table.Column<string>(maxLength: 50, nullable: false),
//                     create_date = table.Column<DateTime>(nullable: false)
//                 },
//                 constraints: table =>
//                 {
//                     table.PrimaryKey("PK_User", x => x.id);
//                 });
//         }

//         protected override void Down(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.DropTable(
//                 name: "Composer");

//             migrationBuilder.DropTable(
//                 name: "Measure");

//             migrationBuilder.DropTable(
//                 name: "Score");

//             migrationBuilder.DropTable(
//                 name: "User");
//         }
//     }
// }
