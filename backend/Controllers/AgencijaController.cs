using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Agencija.Models;

namespace Agencija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AgencijaController : ControllerBase
    {
        public AgencijaContext Context {get; set;}

        public AgencijaController(AgencijaContext context)
        {
            Context = context;
        }
    }
}
