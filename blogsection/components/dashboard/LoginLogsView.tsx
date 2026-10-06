"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getInitials } from "./types";

interface LoginLog {
  id: string;
  username: string;
  name: string;
  role: string;
  ip: string;
  user_agent: string;
  status: "success" | "failed";
  created_at: string;
}

interface LoginLogsViewProps {
  showToast: (msg: string) => void;
}

export default function LoginLogsView({ showToast }: LoginLogsViewProps) {
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clearing, setClearing] = useState(false);

  // Ticking clock for the relative timestamps. Reading Date.now() directly in
  // render is impure and breaks memoisation, so the value is held in state and
  // refreshed on an interval instead.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog/login-logs");
      const data = await res.json();
      if (res.ok && data.success) {
        setLogs(data.logs || []);
      } else {
        showToast(data.message || "Could not fetch login activity logs.");
      }
    } catch {
      showToast("Error loading activity logs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetching on mount is a genuine async side effect, and `fetchLogs` is also
  // wired to the manual refresh button below.
  /* eslint-disable react-hooks/set-state-in-effect -- async fetch, not derived state */
  useEffect(() => {
    fetchLogs();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleClearLogs = async () => {
    if (!confirm("Are you sure you want to clear all login activity logs? This cannot be undone.")) {
      return;
    }
    setClearing(true);
    try {
      const res = await fetch("/api/blog/login-logs", { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setLogs([]);
        showToast("Login activity history cleared successfully.");
      } else {
        showToast(data.message || "Failed to clear logs.");
      }
    } catch {
      showToast("Server error while clearing logs.");
    } finally {
      setClearing(false);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesRole = roleFilter === "all" || log.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus = statusFilter === "all" || log.status.toLowerCase() === statusFilter.toLowerCase();
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        log.username.toLowerCase().includes(q) ||
        (log.name && log.name.toLowerCase().includes(q)) ||
        log.ip.toLowerCase().includes(q);

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [logs, roleFilter, statusFilter, search]);

  const stats = useMemo(() => {
    const total = logs.length;
    const success = logs.filter((l) => l.status === "success").length;
    const failed = logs.filter((l) => l.status === "failed").length;
    const lastLogin = logs[0]?.created_at
      ? new Date(logs[0].created_at).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No logins recorded";
    return { total, success, failed, lastLogin };
  }, [logs]);

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = now - new Date(isoString).getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      if (diffSecs < 60) return "Just now";
      const diffMins = Math.floor(diffSecs / 60);
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return "";
    }
  };

  const cleanBrowser = (ua: string) => {
    if (!ua || ua === "Browser") return "Web Browser";
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Google Chrome";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Apple Safari";
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Edg")) return "Microsoft Edge";
    if (ua.includes("curl") || ua.includes("Postman")) return "API Client";
    return "Web Browser";
  };

  return (
    <div className="max-w-[1320px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-label uppercase tracking-wider font-extrabold text-[#BF296A]">
              Admin Security Panel
            </span>
          </div>
          <h1 className="font-display text-section font-bold text-[#2A1621] leading-tight">
            Login Activity Logs
          </h1>
          <p className="text-body-sm text-[#6B5862] mt-1 max-w-2xl">
            Audit history showing who logged in, their assigned role, IP address, and exact time of dashboard access.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchLogs}
            disabled={loading}
            className="px-3.5 py-2 rounded-lg text-label font-bold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
          >
            <svg
              className={`w-3.5 h-3.5 text-[#6B5862] ${loading ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" />
            </svg>
            Refresh
          </button>
          <button
            type="button"
            onClick={handleClearLogs}
            disabled={clearing || logs.length === 0}
            className="px-3.5 py-2 rounded-lg text-label font-bold bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Clear History
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#e6ded2] shadow-2xs">
          <span className="text-label uppercase tracking-wider font-bold text-[#6B5862] block mb-1">
            Total Logins
          </span>
          <b className="text-subsection font-bold text-[#2A1621]">{stats.total}</b>
          <span className="text-label text-[#6B5862]/70 block mt-1">Recorded audit events</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6ded2] shadow-2xs">
          <span className="text-label uppercase tracking-wider font-bold text-emerald-700 block mb-1">
            Successful
          </span>
          <b className="text-subsection font-bold text-emerald-700">{stats.success}</b>
          <span className="text-label text-emerald-600/80 block mt-1">Authorized sessions</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6ded2] shadow-2xs">
          <span className="text-label uppercase tracking-wider font-bold text-red-600 block mb-1">
            Failed Attempts
          </span>
          <b className="text-subsection font-bold text-red-600">{stats.failed}</b>
          <span className="text-label text-red-500/80 block mt-1">Rejected attempts</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6ded2] shadow-2xs">
          <span className="text-label uppercase tracking-wider font-bold text-[#6B5862] block mb-1">
            Latest Login
          </span>
          <b className="text-body-sm font-bold text-[#2A1621] block truncate" title={stats.lastLogin}>
            {stats.lastLogin}
          </b>
          <span className="text-label text-[#6B5862]/70 block mt-1">Most recent activity</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden mb-6">
        <div className="p-3.5 sm:p-4 border-b border-[#e6ded2] bg-[#FAF6F0]/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-[240px]">
            <input
              type="search"
              placeholder="Search by username, name, or IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-sm px-3.5 py-2 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-[#e6ded2] rounded-lg text-label font-semibold text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
              aria-label="Filter by role"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-[#e6ded2] rounded-lg text-label font-semibold text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-[#e6ded2] bg-[#FAF6F0]/40 text-label uppercase tracking-wider font-bold text-[#6B5862]">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Login Time</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">Device / Browser</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-body-sm text-[#6B5862]/70 font-medium">
                    Loading login activity logs...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-body-sm text-[#6B5862]/70 font-medium">
                    No login logs match the current search or filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const roleCls =
                    log.role === "admin"
                      ? "bg-[#2A1621] text-white border-[#2A1621]"
                      : log.role === "editor"
                      ? "bg-[#BF296A]/10 text-[#BF296A] border-[#BF296A]/25"
                      : "bg-teal-50 text-teal-700 border-teal-200";

                  const fullDate = new Date(log.created_at).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
                    <tr key={log.id} className="border-b border-[#e6ded2] last:border-b-0 hover:bg-[#FAF6F0]/30 transition-colors">
                      {/* User */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BF296A] to-[#951248] text-white flex items-center justify-center font-bold text-label shrink-0 shadow-2xs">
                            {getInitials(log.name || log.username || "?")}
                          </span>
                          <div className="min-w-0">
                            <b className="font-bold text-[#2A1621] block text-body-sm leading-snug">
                              {log.name || log.username}
                            </b>
                            <span className="text-label text-[#6B5862]/70 font-mono">
                              @{log.username}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3.5 align-middle">
                        <span className={`text-label font-bold px-2.5 py-0.5 rounded-full border capitalize inline-block ${roleCls}`}>
                          {log.role}
                        </span>
                      </td>

                      {/* Login Time */}
                      <td className="px-4 py-3.5 align-middle">
                        <div className="text-body-sm font-semibold text-[#2A1621]">{fullDate}</div>
                        <span className="text-label text-[#6B5862]/70 font-medium">
                          {formatRelativeTime(log.created_at)}
                        </span>
                      </td>

                      {/* IP Address */}
                      <td className="px-4 py-3.5 align-middle">
                        <span className="font-mono text-label text-[#2A1621] bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#e6ded2]">
                          {log.ip}
                        </span>
                      </td>

                      {/* Device / Browser */}
                      <td className="px-4 py-3.5 align-middle text-label text-[#6B5862]">
                        <span className="font-medium text-[#2A1621] block">
                          {cleanBrowser(log.user_agent)}
                        </span>
                        <span className="text-label text-[#6B5862]/70 truncate block max-w-[200px]" title={log.user_agent}>
                          {log.user_agent}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 align-middle text-right">
                        {log.status === "success" ? (
                          <span className="inline-flex items-center gap-1.5 text-label font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-label font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-4 py-3 text-label text-[#6B5862] border-t border-[#e6ded2] bg-[#FAF6F0]/50">
          <span>
            Showing {filteredLogs.length} of {logs.length} login activities
          </span>
          <span className="text-[#6B5862]/70">Admin security audit trail</span>
        </div>
      </div>
    </div>
  );
}
