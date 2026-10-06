"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { getErrorMessage } from "../lib/errors";

export default function BlogLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid username or password.");
        setLoading(false);
        return;
      }

      window.location.href = "/blog/blogdashboard";
    } catch (err) {
      setError(getErrorMessage(err, "Failed to connect to server."));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-center items-center px-4 py-12 font-sans text-slate-900">
      <div className="w-full max-w-md bg-white border border-slate-300 rounded-2xl p-8 sm:p-10 shadow-xl">
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex mb-4">
            <Image
              src="/images/branding/logo1.webp"
              alt="Sanskriti Yogpeeth Logo"
              width={180}
              height={55}
              className="h-12 w-auto object-contain mx-auto"
              priority
            />
          </div>
          <h1 className="text-section font-bold text-slate-900 tracking-tight">
            Blog Admin Login
          </h1>
          <p className="text-body-sm font-medium text-slate-600 mt-1.5">
            Enter your credentials to access the blog dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-300 p-3.5 text-body-sm text-red-800 flex items-start gap-2">
            <span className="font-bold shrink-0">Error:</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-label font-bold text-slate-900 uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-3.5 py-3 bg-white border border-slate-300 rounded-lg text-body-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#00897b] focus:border-[#00897b] shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-label font-bold text-slate-900 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 bg-white border border-slate-300 rounded-lg text-body-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#00897b] focus:border-[#00897b] shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-600 hover:text-slate-900 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 px-4 bg-[#00897b] hover:bg-[#00796b] text-white font-bold text-body-sm rounded-lg shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-label font-medium text-slate-500">
        &copy; {new Date().getFullYear()} Sanskriti Yogpeeth, Rishikesh
      </div>
    </div>
  );
}
