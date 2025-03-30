// scripts/fetch-qiita.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import "dotenv/config";

const API_URL =
  "https://qiita.com/api/v2/items?page=1&per_page=100&query=user:shun_shiratori";

const OUTPUT_PATH = path.resolve("public", "qiita.json");

(async () => {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_QIITA_API_KEY}`,
      },
    });

    const data = await res.json();

    const formatted = data.slice(0, 5).map((post) => ({
      title: post.title,
      likes_count: post.likes_count,
      created_at: new Date(post.created_at).toLocaleDateString(),
      url: post.url,
    }));

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(formatted, null, 2));
    console.log("✅ Qiitaデータを保存しました →", OUTPUT_PATH);
  } catch (err) {
    console.error("❌ 取得エラー:", err);
    process.exit(1);
  }
})();
