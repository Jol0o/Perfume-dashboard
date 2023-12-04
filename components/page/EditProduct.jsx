"use client";
import { db } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  collection,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function EditProduct({ id }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  const getProductById = async () => {
    const productDocRefCoffees = doc(collection(db, "coffees"), id);
    const productDocRefPastries = doc(collection(db, "pastries"), id);

    const productDocCoffees = await getDoc(productDocRefCoffees);
    const productDocPastries = await getDoc(productDocRefPastries);

    if (productDocCoffees.exists()) {
      setProduct(productDocCoffees.data());
    } else if (productDocPastries.exists()) {
      setProduct(productDocPastries.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    if (product) {
      setItemData(product);
    }
  }, [product]);

  const [itemData, setItemData] = useState(product || {});
  console.log(itemData);
  const updateProduct = async (e) => {
    if (
      !itemData.name ||
      !itemData.price ||
      !itemData.description ||
      !itemData.imageUrl
    ) {
      return;
    }

    e.preventDefault();
    await updateDoc(doc(db, "perfume", id), {
      id: id,
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      rating: itemData.rating,
      imageUrl: itemData.imageUrl,
    });
    router.push("/product");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const parsedValue = type === "number" ? parseFloat(value) : value;

    setItemData({ ...itemData, [name]: parsedValue });
  };
  return (
    <>
      <form onSubmit={updateProduct} className="modal-form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          onChange={handleInputChange}
          value={itemData.name}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image Url"
          onChange={handleInputChange}
          value={itemData.imageUrl}
        />

        <input
          type="number"
          name="price"
          placeholder="Item Price"
          onChange={handleInputChange}
          value={itemData.price}
        />
        <input
          type="number"
          name="rating"
          placeholder="Item Rating"
          onChange={handleInputChange}
          value={itemData.rating}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          value={itemData.description}
        />

        <button>Update</button>
      </form>
    </>
  );
}

export default EditProduct;
