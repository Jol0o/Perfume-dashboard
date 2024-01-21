"use client";
import { db, auth } from "@/firebase/firebase";
import { deleteUser } from "firebase/auth";
import { onSnapshot, collection, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
function User() {
  const [users, setUsers] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const cart = onSnapshot(collection(db, "cart"), async (snapshot) => {
      const cartWithUserData = await Promise.all(
        snapshot.docs.map(async (cartDoc) => {
          const cartItem = { uID: cartDoc.id, ...cartDoc.data() };
          const userDoc = await getDoc(doc(db, "users", cartItem.uID));
          return { ...cartItem, user: userDoc.data() };
        })
      );
      setUsers(cartWithUserData);
    });
    return () => {
      cart();
    };
  }, []);

  // const removeUser = async (uid) => {
  //   try {
  //     await deleteUser(auth, uid); // Call the deleteUser function with the auth instance and user's UID
  //     setAlert(true);
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <div className="user-container">
      <h3>Users</h3>
      {users &&
        users.map((item) => (
          <>
            <h3 key={item.uID} className="text-md capitalize">
              {item.user?.email}
            </h3>
            <Table
              style={{ width: "100%" }}
              bordered
              hover
              striped="columns"
              responsive
              variant="dark"
              key={item.uID}
            >
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {item.cart.map((cart) => (
                  <tr key={cart.id}>
                    <td>{cart.name}</td>
                    <td>{cart.oilbaseAmount}</td>
                    <td>{cart.genderType}</td>
                    <td>
                      <img
                        style={{
                          maxHeight: "50px",
                          maxWidth: "50px",
                          borderRadius: "100%",
                        }}
                        src={cart.imageUrl}
                      ></img>
                    </td>
                    <td>{cart.quantity}</td>
                    <td>{cart.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ))}
    </div>
  );
}

export default User;
