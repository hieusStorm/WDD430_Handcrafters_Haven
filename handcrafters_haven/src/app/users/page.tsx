"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

export default function UsersPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is signed in and is an admin
    const checkAdminAccess = () => {
      const storedUser = localStorage.getItem("user");
      
      if (!storedUser) {
        // If no user logged in, redirect to account page
        router.push("/account");
        return;
      }

      const user = JSON.parse(storedUser);
      
      // Check if user is an admin
      if (user.authorization !== "admin") {
        // redirect to home
        router.push("/");
        return;
      }

      // Grant access if user is admin!
      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminAccess();
  }, [router]);

  if (loading) {
    return (
      <main style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading...</p>
      </main>
    );
  }
  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>User Management</h1>
      <AddUser />
      <UserList />
    </main>
  );
}
