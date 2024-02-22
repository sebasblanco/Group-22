using System.Dynamic;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
namespace Company.Function
{
    public class GetRankedBySummonerID
    {
        private readonly ILogger<GetRankedBySummonerID> _logger;
        string ?API_KEY = System.Environment.GetEnvironmentVariable("API_KEY");


        public GetRankedBySummonerID(ILogger<GetRankedBySummonerID> logger)
        {
            _logger = logger;
        }

        [Function("GetRankedBySummonerID")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("GetRankedBySummonerID trigger function processed a request.");
            string? summonerId = req.Query["summonerId"];
            string url = $"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{summonerId}?api_key=RGAPI-f5d2da28-49bc-419e-9950-02dfc97929a8";
            _logger.LogInformation("url" + url);
            _logger.LogInformation("api key" + API_KEY);

            try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(url);

                var json = await response.Content.ReadAsStringAsync();

                dynamic ?responseData = JsonSerializer.Deserialize<List<dynamic>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                string responseMessage = string.IsNullOrEmpty(json)
                    ? "GetMatchData executed successfully"
                    : $"{json}";

                return new OkObjectResult(responseMessage);
            }
            catch (JsonException ex)
            {
                _logger.LogError($"Error during JSON deserialization: {ex.Message}");
                return new BadRequestObjectResult("Error during JSON deserialization");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"Error during HTTP request: {ex.Message}");
                return new BadRequestObjectResult("Error during HTTP request");
            }
        }
    }
}
