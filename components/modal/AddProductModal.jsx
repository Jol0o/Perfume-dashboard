"use client";
import { db, storage } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AddProductModal({ show, setShow, handleShow }) {
  const [itemData, setItemData] = useState({
    name: "NA",
    price: 1,
    description: "NA",
    imageUrl: "",
  });
  const [error, setError] = useState(null);
  const [handleImage, setHandleImage] = useState(null);

  console.log(handleImage?.name);

  /**
   * Uploads a file to the storage and updates the item data with the image URL.
   */
  const uploadFile = async (e) => {
    const file = handleImage;
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = await uploadBytes(storageRef, file);
      if (uploadTask) {
        const downloadURL = await getDownloadURL(uploadTask.ref);
        setItemData({ ...itemData, imageUrl: downloadURL });
      }
    }
  };

  const addCoffee = async () => {
    if (!itemData.name || !itemData.price || !itemData.description) {
      setError("All fields must have a value.");
      return;
    }

    if (handleImage) {
      uploadFile();
    }

    if (!itemData.imageUrl) return;

    const collectionRef = collection(db, "perfume");
    // Get all documents in the collection
    const snapshot = await getDocs(collectionRef);

    // Check if a document with the same name already exists
    const duplicateDoc = snapshot.docs.find(
      (doc) => doc.data().name.toLowerCase() === itemData.name.toLowerCase()
    );

    // If a duplicate document does not exist, add a new document
    if (!duplicateDoc) {
      const docRef = await addDoc(collectionRef, itemData);

      await updateDoc(doc(db, "perfume", docRef.id), {
        id: docRef.id, // Add the ID to the document
      });
      setError(null);
    } else {
      setError("A document with the same name already exists.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const parsedValue = type === "number" ? parseFloat(value) : value;

    setItemData({ ...itemData, [name]: parsedValue });
  };
  return (
    <Modal show={show} centered onHide={handleShow} variant="dark">
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Add Product</h3>
          {!!error && (
            <p
              style={{ fontSize: 15, color: "red", fontWeight: 400, margin: 0 }}
            >
              {error}
            </p>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form">
          <input
            required
            type="text"
            name="name"
            placeholder="Item Name"
            onChange={handleInputChange}
          />

          <input
            required
            type="file"
            name="imageUrl"
            placeholder="Image File"
            accept="image/*"
            onChange={(e) => setHandleImage(e.target.files[0])}
          />

          <input
            required
            type="number"
            name="price"
            placeholder="Item Price"
            onChange={handleInputChange}
          />
          <input
            required
            type="number"
            name="rating"
            placeholder="Item Rating"
            onChange={handleInputChange}
          />

          <input
            required
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
          />
          <button onClick={addCoffee}>Add Product</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;
