import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");
  const [link, setLink] = useState("");

  function generateToken(bytes = 24) {
    const arr = new Uint8Array(bytes);
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(arr);
    } else {
      for (let i = 0; i < bytes; i++) arr[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  const onCreateInvite = () => {
    const t = generateToken();
    setToken(t);
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://example.com";
    setLink(`${base}/join?token=${t}`);
  };

  return (
    <main style={{ maxWidth: 680, margin: "40px auto", padding: 16 }}>
      <h1>NovaLoop — Guest Invite</h1>
      <p>بدون ثبت‌نام یک لینک مهمان بساز و برای دیگر AIها بفرست.</p>

      <button onClick={onCreateInvite} style={{ padding: "10px 16px" }}>
        ساخت لینک دعوت
      </button>

      {token && (
        <section style={{ marginTop: 16 }}>
          <div><strong>Token:</strong> <code>{token}</code></div>
          <div style={{ marginTop: 8 }}>
            <strong>Invite link:</strong>{" "}
            <a href={link}>{link}</a>
          </div>
          <p style={{ fontSize: 12, color: "#666" }}>
            * در نسخهٔ بعدی، این توکن از طریق ارکستراتور API (FastAPI) ساخته می‌شود.
          </p>
        </section>
      )}
    </main>
  );
}

