
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NewOnline.Models.ModelConfigurations {
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(prop => prop.id);

            builder.Property(prop => prop.first_name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(prop => prop.last_name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(prop => prop.handle)
                .HasMaxLength(50)
                .IsRequired();
            
            builder.Property(prop => prop.create_date);
        }
    }
}