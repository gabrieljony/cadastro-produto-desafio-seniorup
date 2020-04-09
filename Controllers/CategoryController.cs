using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreComputers.Models;
using StoreComputers.Data;

namespace StoreComputers.Controllers
{
  [ApiController]
  [Route("v1/categories")]

  public class CategoryController : ControllerBase
  {
    [HttpGet]
    [Route("")]

    public async Task<ActionResult<List<Category>>> Get([FromServices] DataContext context)
    {
      var categories = await context.Categories.ToListAsync();
      return categories;
    }


    [HttpPost]
    [Route("")]

    public async Task<ActionResult<Category>> Post([FromServices] DataContext context,
        [FromBody] Category model)
    {
      if (ModelState.IsValid)
      {
        context.Categories.Add(model);
        await context.SaveChangesAsync();
        return model;
      }
      else
      {
        return BadRequest(ModelState);
      }
    }

    [HttpGet]
    [Route("{id:int}")]

    public async Task<ActionResult<Category>> GetById([FromServices] DataContext context, int id)
    {
      var category = await context.Categories
          .AsNoTracking()
          .FirstOrDefaultAsync(x => x.Id == id);
      return category;
    }

    [HttpPut]
    [Route("{id:int}")]

    public async Task<ActionResult<Category>> Put([FromServices] DataContext context, int id,
                [FromBody]Category model)
    {
      if (!ModelState.IsValid || !id.Equals(model.Id))
      {
        return BadRequest(ModelState);
      }
      else
      {
        context.Categories.Update(model);
        await context.SaveChangesAsync();
        return model;
      }
    }

    [HttpDelete]
    [Route("{id:int}")]

    public async Task<ActionResult<Category>> Delete([FromServices] DataContext context, int id,
                [FromBody]Category model)
    {
      if (model == null || !id.Equals(model.Id))
                return NotFound();
      
      context.Categories.Remove(model);
      await context.SaveChangesAsync();
      return NoContent();
    }

  }
}