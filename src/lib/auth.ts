import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

type SignInApiResponse = {
  message?: string;
  token?: string;
  user?: {
    name?: string;
    email?: string;
    role?: string;
    id?: string;
  };
};

const STATIC_PASSWORD = "Google1234";
const API_BASE = "https://ecommerce.routemisr.com/api/v1/auth";


async function getBackendTokenForOAuthUser(
  name: string,
  email: string,
): Promise<SignInApiResponse | null> {
  const registerRes = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password: STATIC_PASSWORD,
      rePassword: STATIC_PASSWORD,
    }),
    cache: "no-store",
  });

  const registerData: SignInApiResponse = await registerRes.json();

  if (registerRes.ok && registerData?.token) {
    return registerData;
  }

  const signInRes = await fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: STATIC_PASSWORD }),
    cache: "no-store",
  });

  const signInData: SignInApiResponse = await signInRes.json();

  if (signInRes.ok && signInData?.token) {
    return signInData;
  }

  return null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        const res = await fetch(`${API_BASE}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          cache: "no-store",
        });

        const data: SignInApiResponse = await res.json();

        if (!res.ok || !data?.token) {
          return null;
        }

        return {
          id: data.user?.id ?? "",
          name: data.user?.name ?? "",
          email: data.user?.email ?? email,
          accessToken: data.token,
          role: data.user?.role ?? "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.role = (user as { role?: string }).role;
      }

      if (account && (account.provider === "google" || account.provider === "facebook")) {
        const name = token.name || user?.name || "User";
        const email = token.email || user?.email || "";

        if (email) {
          const backendData = await getBackendTokenForOAuthUser(name, email);
          if (backendData?.token) {
            token.accessToken = backendData.token;
            token.role = backendData.user?.role ?? "";
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.role = token.role ?? "";
      }

      session.accessToken = token.accessToken || "";
      return session;
    },
  },
};
