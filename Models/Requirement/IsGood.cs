using Microsoft.AspNetCore.Authorization;

public class IsGoodRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }

    public IsGoodRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}