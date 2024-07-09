import { v4 as uuidv4 } from "https://deno.land/std@0.92.0/uuid/mod.ts";

const getAllCourses = async () => {
  const kv = await Deno.openKv();
  const list = await kv.list({ prefix: ["courses"] });
  const courses = [];
  for await (const entry of list) {
    courses.push({ id: entry.key[1], name: entry.value });
  }
  return courses;
};

const addCourse = async (name) => {
  const kv = await Deno.openKv();
  const id = uuidv4.generate();
  await kv.set(["courses", id], name);
};

const deleteCourse = async (id) => {
  const kv = await Deno.openKv();
  await kv.delete(["courses", id]);
};

const getCourse = async (id) => {
  const kv = await Deno.openKv();
  const entry = await kv.get(["courses", id]);
  return { id, name: entry?.value };
};

export { getAllCourses, addCourse, deleteCourse, getCourse };
