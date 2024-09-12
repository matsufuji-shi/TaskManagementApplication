# プロジェクト名: ユーザー管理システム

## 概要

このプロジェクトは、ユーザー情報の追加と一覧表示ができる簡単な**ユーザー管理システム**です。フロントエンドはReact、バックエンドはNode.jsとExpress、データベースはMySQLを使用しています。

### 主な機能
1. **ユーザー追加機能**  
   フォームに名前とメールアドレスを入力し、サーバー側にPOSTリクエストを送信して新しいユーザーをデータベースに追加します。
   
2. **ユーザー一覧表示機能**  
   登録されたユーザーの名前とメールアドレスを一覧で表示します。ユーザーの追加後に自動的に一覧が更新されます。

---

## ディレクトリ構造

- **`client/`**  
  フロントエンドのディレクトリ

  - **`public/`**
    - `index.html` : Reactアプリケーションのエントリポイント
  - **`src/`**
    - **`components/`**
      - `UserForm.js` : 新しいユーザーを追加するフォーム
      - `UserList.js` : ユーザー一覧を表示するコンポーネント
    - **`hooks/`**
      - `useCategories.js` : カスタムフックで、ユーザーリストの管理と更新を行う
    - **`services/`**
      - `apiService.js` : APIリクエストを管理するファイル
    - `App.js` : アプリ全体のコンポーネント
    - `App.css` : アプリのスタイル
    - `index.js` : ルート要素に`App`コンポーネントを描画するためのファイル
  
- **`server/`**  
  バックエンドのディレクトリ

  - **`routes/`**
    - `userRoutes.js` : ユーザー関連のAPIルートを定義
  - **`controllers/`**
    - `userController.js` : ユーザーのデータ操作に関するロジックをまとめたファイル
  - **`db/`**
    - `connection.js` : データベース接続を管理
  - `app.js` : サーバーのメインファイル。APIルートの設定やサーバー起動を行う。

---

## 立ち上げ方法

このプロジェクトはフロントエンド（React）とバックエンド（Node.js）で構成されており、2つの環境でアプリケーションを起動する必要があります。

### 1. **MySQLの設定**
1. MySQLにログインし、次のコマンドでデータベースとテーブルを作成します。

   ```sql
   CREATE DATABASE express_db;
   
   USE express_db;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL
   );

### 2. **バックエンド（サーバー）セットアップ**

`server/`ディレクトリに移動します。

cd server
必要な依存関係をインストールします。

npm install
サーバーを起動します。

npm start
サーバーはポート3001で動作します。

### 3. フロントエンド（クライアント）セットアップ**
別のターミナルを開き、client/ディレクトリに移動します。

cd client
必要な依存関係をインストールします。

npm install
フロントエンドを起動します。

npm start
クライアントはデフォルトでhttp://localhost:3000で起動します。
