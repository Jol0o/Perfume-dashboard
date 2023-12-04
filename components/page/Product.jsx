"use client";
import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import AddProductModal from "./../modal/AddProductModal";
import Link from "next/link";

/**
 * Renders the Product component.
 * This component displays a table of products including pastries and coffee.
 * It allows users to add, delete, and edit products.
 */
function Product() {
  const [pastries, setPastries] = useState(null);
  const [coffee, setCoffee] = useState(null);
  const [alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  // Update Product
  const updateProduct = async (id) => {
    await updateDoc(doc(db, "perfume", id), {
      id: id,
      itemData,
    });
  };

  //
  useEffect(() => {
    /**
     * Represents the coffee data fetched from the database.
     */
    const coffee = onSnapshot(collection(db, "perfume"), (snapshot) =>
      setCoffee(snapshot.docs.map((e) => e.data()))
    );
    return () => {
      coffee();
    };
  }, []);

  useEffect(() => {
    /**
     * Represents an array of pastries.
     */
    const pastries = onSnapshot(collection(db, "pastries"), (snapshot) =>
      setPastries(snapshot.docs.map((e) => e.data()))
    );
    return () => {
      pastries();
    };
  }, []);

  //Delete item
  const delData = async (id) => {
    const resultCoffee = await deleteDoc(doc(db, "perfume", id));
    setAlert(!alert);
  };

  return (
    <div className="product-container">
      {alert && (
        <Alert onClose={() => setShow(false)} variant="primary" dismissible>
          Delete Item Successfully
        </Alert>
      )}
      <div className="product-nav">
        <h3>Products</h3>
        <Button variant="secondary" onClick={handleShow}>
          Add Product
        </Button>
      </div>
      <AddProductModal show={show} setShow={setShow} handleShow={handleShow} />
      {coffee && pastries && (
        <Table bordered hover striped="columns" responsive variant="dark">
          <thead>
            <tr>
              <th>Product name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {coffee.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      borderRadius: "100%",
                    }}
                    src={item.imageUrl}
                  ></img>
                </td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>
                  <BsTrash onClick={() => delData(item.id)} />
                </td>
                <td>
                  <Link href={`/product/${item.id}`}>
                    <AiOutlineEdit />
                  </Link>
                </td>
              </tr>
            ))}
            {pastries.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      borderRadius: "100%",
                    }}
                    src={item.imageUrl}
                  ></img>
                </td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>
                  <BsTrash onClick={() => delData(item.id)} />
                </td>
                <td>
                  <Link href={`/product/${item.id}`}>
                    <AiOutlineEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Product;
