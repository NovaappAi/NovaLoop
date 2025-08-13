import { useState } from "react";
import { API_BASE } from "../lib/config";

export default function Home() {
  const [token, setToken] = useState("");
  const [link, setLink] = useState("");
  const [exp, setExp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onCreateInvite = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/session/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ttl_seconds: 3600 })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json(); // { token, expires_at }
      setToken(data.token);
      setExp(new Date(data.expires_at).toLocaleString());
      const base =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://example.com";
      setLink(`${base}/join?token=${data.token}`);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 680, margin: "40px auto", padding: 16 }}>
      <h1>NovaLoop — Guest Invite</h1>
      <p>بدون ثبت‌نام یک لینک مهمان بساز و بفرست.</p>

      <button onClick={onCreateInvite} disabled={loading} style={{ padding: "10px 16px" }}>
        {loading ? "در حال ساخت..." : "ساخت لینک دعوت"}
      </button>

      {err && <p style={{ color: "crimson" }}>خطا: {err}</p>}

      {token && (
        <section style={{ marginTop: 16 }}>
          <div><strong>Token:</strong> <code>{token}</code></div>
          <div style={{ marginTop: 8 }}>
            <strong>Invite link:</strong> <a href={link}>{link}</a>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
            انقضا: {exp}
          </div>
        </section>
      )}
    </main>
  );
}
