using Microsoft.EntityFrameworkCore.Migrations;

namespace NewOnline.Migrations
{
    public partial class AddMeasureNumber2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "measureNumber",
                table: "Measure",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "measureNumber",
                table: "Measure");
        }
    }
}
