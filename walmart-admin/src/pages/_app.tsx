import LoginPage from "@/components/LoginPage";
import "@/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
    <SignedOut>
      <LoginPage />
    </SignedOut>
    <SignedIn>
      <Component {...pageProps} />
    </SignedIn>
  </ClerkProvider>
  );
}
