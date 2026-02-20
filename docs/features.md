# 役割の整理

## Service 層

責務：
* API への通信・レスポンス整形
* データ取得・送信の汎用関数
* 型安全なデータ返却

特徴：
* React とは無関係に純粋関数で書ける
* 内部でデータ変換（nullable → optional など）も管理

## Provider 層

責務：
* Service から取得したデータを React Context で管理
* UI コンポーネントに状態を提供
* ローディング/エラー/成功状態の管理

特徴：
* useReducer や Zustand など任意の状態管理ライブラリを使用可能
* データの「取得・保存・更新・削除」を UI が簡単に呼べる形でラップ

# 対応データ型の設計例

ここでは汎用的に使えるよう、API データを TypeScript 型で定義します。
```ts
// User データ例
export type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

// Generic API Response
export type ApiResponse<T> = {
  data: T;
  message?: string;
  error?: string;
};
```
Service 層で返す型は Promise<ApiResponse<T>>

Provider 層で管理する型は T | null とローディング/エラーを組み合わせた状態

```tsx
// Provider 状態例
export type ProviderState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
```


# 処理フロー例

* UI コンポーネントが Provider の hook（例: useUsersProvider()）を呼ぶ
* Provider 内で Service の関数（例: UserService.fetchAll()）を呼び、状態を管理
* Provider の状態（data, loading, error）をコンポーネントが利用して表示
* 更新・削除も Provider 経由で呼び出し、State を更新


# 拡張性・応用

* 複数エンドポイント対応：
* UserService, ProductService, OrderService のように分離
* Provider はそれぞれ作るか、共通の GenericProvider<T> を使い回す
* キャッシュやキャパシティ制御：
* Provider でデータキャッシュを保持し、再リクエスト時に再取得せず返却

# UI 側の汎用性：
* Table, List, Form など再利用可能なコンポーネントと組み合わせる