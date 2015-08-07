using Newtonsoft.Json.Serialization;
using System.Web.Http;

namespace MovieHunter.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Cross-origin resource sharing
            // Allows acces from a domain outside of the domain the resource
            // originated from.
            config.EnableCors();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
              new CamelCasePropertyNamesContractResolver();

            // Web API configuration and services
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }
    }
}
