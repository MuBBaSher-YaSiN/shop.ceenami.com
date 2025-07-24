import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    images: {
      type: [String],
      required: [true, "At least two product images are required"],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length === 2;
        },
        message:
          "Exactly two images are required: one for default and one for hover.",
      },
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    brand: {
      type: String,
      default: "No Brand",
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
