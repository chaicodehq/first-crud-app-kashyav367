import { Todo } from "../models/todo.model.js";

/**
 * TODO: Create a new todo
 * - Extract data from req.body
 * - Create todo in database
 * - Return 201 with created todo
 */
export async function createTodo(req, res, next) {
  try {
    // Your code here
    
    const todo = await Todo.create(req.body)
    return res.status(201).json(todo)

  } catch (error) {
    next(error);
  }
}

/**
 * TODO: List todos with pagination and filters
 * - Support query params: page, limit, completed, priority, search
 * - Default: page=1, limit=10
 * - Return: { data: [...], meta: { total, page, limit, pages } }
 */
export const getTodos = async (req, res) => {
  const { page = 1, limit = 10, completed, priority, search } = req.query;

  const query = {};


  if (completed !== undefined) {
    query.completed = completed === "true";
  }

  if (priority) {
    query.priority = priority;
  }

  
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const total = await Todo.countDocuments(query);

  const todos = await Todo.find(query)
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(Number(limit));

  res.status(200).json({
    data: todos,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

/**
 * TODO: Get single todo by ID
 * - Return 404 if not found
 */
export const getTodoById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: { message: "Invalid ID" } });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({
      error: { message: "Todo not found" }
    });
  }

  res.status(200).json(todo);
};

/**
 * TODO: Update todo by ID
 * - Use findByIdAndUpdate with { new: true, runValidators: true }
 * - Return 404 if not found
 */
export const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: { message: "Invalid ID" } });
  }

  const updated = await Todo.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({
      error: { message: "Todo not found" }
    });
  }

  res.status(200).json(updated);
};

/**
 * TODO: Toggle completed status
 * - Find todo, flip completed, save
 * - Return 404 if not found
 */
export const toggleTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: { message: "Invalid ID" } });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({
      error: { message: "Todo not found" }
    });
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.status(200).json(todo);
};

/**
 * TODO: Delete todo by ID
 * - Return 204 (no content) on success
 * - Return 404 if not found
 */
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: { message: "Invalid ID" } });
  }

  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({
      error: { message: "Todo not found" }
    });
  }

  return res.status(204).send(); 
};
