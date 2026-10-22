"use client";

import { useId, useState } from "react";

/** 紛らわしい文字（0/O、1/l/I）を抜いた字種。口頭やチャットで伝える前提。 */
const ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const GENERATED_LENGTH = 16;

function generatePassword(): string {
  const bytes = new Uint32Array(GENERATED_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => ALPHABET[n % ALPHABET.length]).join("");
}

/**
 * パスワード入力欄＋自動生成ボタン。
 *
 * 生成は**ブラウザ側で行い、その場で画面に出す**。サーバーで生成して結果を
 * 返す作りにすると、リダイレクトのクエリに平文パスワードが載って
 * アクセスログに残る。管理者が画面で値を見てから送信する形にしておけば、
 * 発行した値を後から画面に出し直す必要がない。
 */
export default function PasswordField({
  name = "password",
  label = "初期パスワード",
  minLength = 12,
}: {
  name?: string;
  label?: string;
  minLength?: number;
}) {
  const id = useId();
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name={name}
          type="text"
          required
          minLength={minLength}
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-sm outline-none focus:border-navy"
        />
        <button
          type="button"
          onClick={() => setValue(generatePassword())}
          className="shrink-0 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
        >
          自動生成
        </button>
      </div>
      <p className="mt-1 text-xs text-neutral-500">
        {minLength}文字以上。画面に出ているうちに本人へ伝えてください（あとから確認はできません）。
      </p>
    </div>
  );
}
