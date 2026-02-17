import { Schema } from "mongoose";

const noteSchema = Schema(
  {
    title: {
      type: string,
    },
    content: {
      type: string,
    },
    userId: { type: string },
  },
  {
    timestamps: true,
    strictQuery: true,
  },
);
