import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import db from "../db"; // Your MySQL connection
import { generateOTP, sendOTPEmail } from "../utils/mailer";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined in .env");
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// -------------------------
// REGISTER USER + SEND OTP
// -------------------------
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role = "user" } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [rows]: any = await db.query("SELECT * FROM otp_users WHERE email = ?", [email]);

    if (rows.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result]: any = await db.query(
      "INSERT INTO otp_users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    // Generate OTP only for non-admins
    if (role !== "admin") {
      const otp = generateOTP();
      const hashedOtp = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

      await db.query(
        "UPDATE otp_users SET otp_code=?, otp_expires_at=? WHERE id=?",
        [hashedOtp, expiresAt, result.insertId]
      );

      await sendOTPEmail(email, otp);
      console.log(`✅ OTP sent to ${email}: ${otp}`);
    }

    return res.status(201).json({
      success: true,
      message: "Registered successfully" + (role === "admin" ? "" : ". OTP sent to your email"),
    });
  } catch (err) {
    console.error("❌ Error registering user:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

// -------------------------
// VERIFY OTP
// -------------------------
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP are required" });

  try {
    const [rows]: any = await db.query("SELECT * FROM otp_users WHERE email=?", [email]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // Admins bypass OTP
    if (user.role === "admin") {
      return res.status(400).json({ message: "Admin does not need OTP verification" });
    }

    if (!user.otp_code) return res.status(400).json({ message: "OTP not generated" });
    if (new Date(user.otp_expires_at) < new Date()) return res.status(400).json({ message: "OTP expired" });

    const valid = await bcrypt.compare(otp.trim(), user.otp_code);

    if (!valid) return res.status(400).json({ message: "Invalid OTP" });

    // Clear OTP and mark verified
    await db.query(
      "UPDATE otp_users SET otp_code=NULL, otp_expires_at=NULL, verified=1 WHERE email=?",
      [email]
    );

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role || "user" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);

    return res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role || "user", avatar: user.avatar || "/default-avatar.png" }
    });
  } catch (err) {
    console.error("❌ Error verifying OTP:", err);
    return res.status(500).json({ message: "Server error during OTP verification" });
  }
};

// -------------------------
// LOGIN USER
// -------------------------
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const [rows]: any = await db.query("SELECT * FROM otp_users WHERE email=?", [email]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // Admins bypass OTP check
    if (user.role !== "admin" && !user.verified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role || "user" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role || "user", avatar: user.avatar || "/default-avatar.png" }
    });
  } catch (err) {
    console.error("❌ Error logging in:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};
