import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedbacks from "./feedbacks.js";
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();

app.get("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  const feedbackCount = await feedbacks.getFeedbackCount(id);
  return c.text(`Feedback ${id}: ${feedbackCount}`);
});

app.post("/feedbacks/:id", async (c) => {
  const id = c.req.param("id");
  await feedbacks.incrementFeedbackCount(id);
  return c.redirect("/");
});


// Root path to display rating buttons using index.eta template
app.get("/", (c) => {
    return c.html(
      eta.render("index.eta", {})
    );
  });
  
  export default app;