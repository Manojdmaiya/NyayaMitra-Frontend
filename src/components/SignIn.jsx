import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        document.cookie = `authToken=${data.token}; path=/; secure; samesite=strict`;

        const role = data.role;
        if (role === "ADMIN") {
          navigate("/admin/home");
        } else if (role === "APPROVED_USER") {
          navigate("/approved/home");
        } else {
          navigate("/normal/home");
        }

        setMessage("Logged in successfully!");

      } else {
        setMessage(`Error: ${data.error || "Login failed"}`);
      }
    } catch (err) {
      setMessage("An unexpected error occurred");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authContainer}>
        <div className={styles.imageSection}>
          <img src="NM1.jpeg" alt="Login Visual" className={styles.authImage} />
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Welcome back</h2>
          <p className={styles.formSubText}>
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>

          {message && <div className={styles.messageBox}>{message}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={styles.inputField2}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={styles.inputField2}
              required
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={styles.inputField2}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className={styles.checkboxRow}>
              <input type="checkbox" />
              <label>Remember me</label>
            </div>

            <button type="submit" className={styles.primaryButton}>
              Log In
            </button>

            <div className={styles.divider}>
              ────────────── Or log in with ──────────────
            </div>
            <div className={styles.oauthButtons}>
              <button type="button" className={styles.oauthBtn}>
                <img
                  src="googleicon.png"
                  className={styles.iconStyles}
                  alt="Google"
                />{" "}
                Google
              </button>
              <button type="button" className={styles.oauthBtn}>
                <img
                  src="appleicon.png"
                  className={styles.iconStyles}
                  alt="Apple"
                />{" "}
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
