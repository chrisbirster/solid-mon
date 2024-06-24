import { Navigate } from "@solidjs/router";
import { Show, createSignal, onCleanup } from "solid-js";

export default function Blocked() {
  const [redirectIn, setRedirectIn] = createSignal(6);

  const int = setInterval(() => {
    setRedirectIn((prev) => prev - 1);
  }, 1000);

  onCleanup(() => clearInterval(int));

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Blocked Page
      </h1>
      <p class="mt-8">You are making too many requests. Please chill.</p>
      <span>Redirecting back to home in {redirectIn()} seconds...</span>
      <Show when={redirectIn() <= 0}>
        <Navigate href="/" />
      </Show>
    </main>
  );
}
