import * as courseService from "./CourseService.js";
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const getCourses = async (c) => {
  const allCourses = await courseService.getAllCourses();
  return c.html(
    eta.render("courses.eta", { courses: allCourses })
  );
};

const addCourse = async (c) => {
  const { courseName } = await c.req.parseBody();
  await courseService.addCourse(courseName);
  return c.redirect("/courses");
};

const deleteCourse = async (c) => {
  const courseId = c.req.param("courseId");
  await courseService.deleteCourse(courseId);
  return c.redirect("/courses");
};

const getCourse = async (c) => {
  const courseId = c.req.param("courseId");
  const course = await courseService.getCourse(courseId);
  return c.html(
    eta.render("course.eta", { course })
  );
};

export { getCourses, addCourse, deleteCourse, getCourse };
