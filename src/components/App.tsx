import { useState } from "react";
import "./App.css";
import qiitaData from "../../public/qiita.json";

type QiitaPosts = {
  created_at: string;
  likes_count: number;
  title: string;
  url: string;
};

function App() {
  const [result] = useState<QiitaPosts[]>(qiitaData);

  return (
    <main className="w-full">
      <h2 className="text-5xl font-bold">Qiita記事一覧</h2>

      <div className="grid gap-4 my-10 w-9/12 m-auto">
        {result.map((post, index) => (
          <article key={index} className="w-full">
            <a
              className="block p-5 text-left transition hover:bg-gray-800 rounded-lg border bg-fd-card text-fd-card-foreground shadow-md"
              href={post.url}
              target="_blank"
            >
              <p className="mb-2">{post.created_at}</p>
              <h3 className="text-xl mb-2">{post.title}</h3>
              <p>いいね数：{post.likes_count}</p>
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}

export default App;
