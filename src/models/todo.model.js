import mongoose from "mongoose";

/**
 * TODO: Define Todo schema
 *
 * Fields:
 * - title: String, required, trim, min 3, max 120 chars
 * - completed: Boolean, default false
 * - priority: Enum ["low", "medium", "high"], default "medium"
 * - tags: Array of Strings, max 10 items, default []
 * - dueDate: Date, optional
 *
 * Options:
 * - Enable timestamps
 * - Add index: { completed: 1, createdAt: -1 }
 */

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: {
      type: [String],
      validate: {
        validator: arrayLimit,
        message: "Cannot have more than 10 tags",
      },
      default: [],
    },
    dueDate: {
      type: Date,
    },
  },
  {
    // Schema options here
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

//* todoSchema.pre('save', function (next) {
//   if (this.tags.length > 10) {
//     this.tags = this.tags.slice(0, 10);
//   }
//   next()
// });

// TODO: Add index
todoSchema.index({ completed: 1, createdAt: -1 });
todoSchema.index({ title: 1, createdAt: -1 });

// TODO: Create and export the Todo model
export const Todo = mongoose.model("Todo", todoSchema);