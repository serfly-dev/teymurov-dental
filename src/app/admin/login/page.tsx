import { loginAction } from "../actions";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center p-6">
      <form
        action={loginAction}
        className="flex w-full flex-col gap-4 rounded-xl border p-6"
      >
        <h1 className="text-2xl font-bold">
          Вход в админ-панель
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded-md border p-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          className="rounded-md border p-3"
          required
        />

        <button
          type="submit"
          className="rounded-md bg-black p-3 text-white"
        >
          Войти
        </button>
      </form>
    </main>
  );
}