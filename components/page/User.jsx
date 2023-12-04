"use client";
import { db, auth } from "@/firebase/firebase";
import { deleteUser } from "firebase/auth";
import { onSnapshot, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
function User() {
  const [users, setUsers] = useState(null);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const user = onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(snapshot.docs.map((e) => e.data()))
    );
    return () => {
      user();
    };
  }, []);

  const removeUser = async (uid) => {
    try {
      await deleteUser(auth, uid); // Call the deleteUser function with the auth instance and user's UID
      setAlert(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="product-container">
      {alert && (
        <Alert onClose={() => setAlert(false)} variant="primary" dismissible>
          Delete User Success
        </Alert>
      )}
      <h3>Users</h3>
      {users && (
        <Table bordered hover striped="columns" responsive variant="dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {" "}
                  <img
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      borderRadius: "100%",
                    }}
                    src={item.photo}
                  ></img>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default User;
