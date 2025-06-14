import { useEffect, useRef } from "react";
import { Button } from "./Button";
import axios from "axios";

const CreateProductForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const ImageRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const submitData = async () => {
    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const image = ImageRef.current?.value || "";
    const price = priceRef.current?.value || "";
    const discountPrice = discountRef.current?.value || "";
    const stock = stockRef.current?.value || "";

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`,
        {
          title,
          description,
          image,
          price,
          discountPrice,
          stock,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      alert("Product created successfully");
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product");
    }
  };
      
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-[400px] h-[400px]">
        <input ref={titleRef} type="text" placeholder="Title" />
        <input ref={descriptionRef} type="text" placeholder="Description" />
        <input ref={ImageRef} type="text" placeholder="Image" />
        <input ref={priceRef} type="text" placeholder="Price" />
        <input
          ref={discountRef}
          type="text"
          placeholder="Discount (Optional)"
        />
        <input ref={stockRef} type="text" placeholder="stock" />

        <Button
          variant="primary"
          size="md"
          text="submit"
          onClick={submitData}
        />
      </div>
    </div>
  );
};

export default CreateProductForm;
