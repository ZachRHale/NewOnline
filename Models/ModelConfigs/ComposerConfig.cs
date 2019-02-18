
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NewOnline.Models.ModelConfigurations {
    public class ComposerConfig : IEntityTypeConfiguration<Composer>
    {
        public void Configure(EntityTypeBuilder<Composer> builder)
        {
            builder.HasKey(prop => prop.id);

            builder.Property(prop => prop.first_name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(prop => prop.last_name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(prop => prop.birth_date);
        }
    }
}