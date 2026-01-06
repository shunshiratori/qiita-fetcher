# qiita-fetcher

Qiita APIから記事を取得し、Reactで一覧表示するWebアプリケーションです。GitHub Actionsを使用して、毎日自動的に最新の記事データを更新します。

## 機能

- Qiita APIから特定ユーザーの記事を取得
- 取得した記事の一覧を見やすく表示（タイトル、投稿日、いいね数）
- GitHub Actionsによる自動更新（毎日10:00 JST）
- レスポンシブデザイン（TailwindCSS使用）

## 技術スタック

- **フロントエンド**: React 19 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: TailwindCSS
- **API通信**: node-fetch
- **環境変数管理**: dotenv
- **自動化**: GitHub Actions

## セットアップ

### 前提条件

- Node.js 18以上
- Qiita APIトークン（[こちら](https://qiita.com/settings/tokens)から取得）

### インストール手順

1. リポジトリをクローン

```bash
git clone <repository-url>
cd qitta-fetcher
```

2. 依存パッケージをインストール

```bash
npm install
```

3. 環境変数を設定

`.env`ファイルを作成し、Qiita APIトークンを設定します。

```bash
VITE_QIITA_API_KEY=your_qiita_api_token_here
```

4. Qiita記事を取得

```bash
npm run fetch:qiita
```

このコマンドで`public/qiita.json`にデータが保存されます。

5. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開くとアプリケーションが表示されます。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクション用にビルド |
| `npm run preview` | ビルドしたアプリをプレビュー |
| `npm run lint` | ESLintでコードをチェック |
| `npm run fetch:qiita` | Qiita APIから記事データを取得 |

## GitHub Actionsによる自動更新

このプロジェクトは、GitHub Actionsを使用して毎日自動的にQiita記事を取得し、リポジトリを更新します。

### 設定方法

1. GitHubリポジトリの Settings → Secrets and variables → Actions に移動
2. New repository secret をクリック
3. 以下のシークレットを追加:
   - Name: `VITE_QIITA_API_KEY`
   - Secret: あなたのQiita APIトークン

### 動作

- **自動実行**: 毎日10:00 JST（1:00 UTC）に実行
- **手動実行**: GitHubのActionsタブから`workflow_dispatch`で手動実行も可能

## プロジェクト構成

```
qitta-fetcher/
├── .github/
│   └── workflows/
│       └── fetch-qiita.yml    # GitHub Actions設定
├── public/
│   └── qiita.json             # 取得したQiita記事データ
├── scripts/
│   └── fetch-qiita.js         # Qiita API取得スクリプト
├── src/
│   ├── components/
│   │   ├── App.tsx            # メインコンポーネント
│   │   └── App.css
│   ├── main.tsx               # エントリーポイント
│   └── index.css
├── .env                        # 環境変数（.gitignoreに追加推奨）
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## カスタマイズ

### 取得するユーザーの変更

`scripts/fetch-qiita.js`の8行目のユーザー名を変更してください。

```javascript
const API_URL =
  "https://qiita.com/api/v2/items?page=1&per_page=100&query=user:あなたのユーザー名";
```

### 表示する記事数の変更

`scripts/fetch-qiita.js`の22行目の数値を変更してください。

```javascript
const formatted = data.slice(0, 5).map((post) => ({ // 5を変更
```

## ライセンス

このプロジェクトはプライベートプロジェクトです。
