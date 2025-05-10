import supabase from "../supabase";

export const uploadImage = async (product) => {
  const { data, error } = await supabase.from("product_images").insert(
    {
      product_id: product.product_id,
      url: product.url,
      alt_text: product.alt_text,
    },
    { returning: "minimal" }
  );

  if (error) {
    throw new Error("Failed to upload image. Error:", error.message);
  }
  return data;
};
