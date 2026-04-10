"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signupAction, type SignupActionState } from "./actions";
import OAuthButtons from "../login/OAuthButtons";

const initialSignupState: SignupActionState = {
  success: false,
  message: "",
  fieldErrors: {},
  values: {},
};

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="py-2 px-4 rounded-md font-semibold transition-colors duration-200 cursor-pointer flex justify-center items-center bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
      aria-busy={pending}
    >
      <svg
        data-prefix="fas"
        data-icon="user-plus"
        className="svg-inline--fa fa-user-plus me-2"
        role="img"
        viewBox="0 0 640 512"
        aria-hidden="true"
        width="20"
        height="16"
      >
        <path
          fill="currentColor"
          d="M136 128a120 120 0 1 1 240 0 120 120 0 1 1 -240 0zM48 482.3C48 383.8 127.8 304 226.3 304l59.4 0c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7L77.7 512C61.3 512 48 498.7 48 482.3zM544 96c13.3 0 24 10.7 24 24l0 48 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-48 0 0 48c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-48-48 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-48c0-13.3 10.7-24 24-24z"
        />
      </svg>
      <span>{pending ? "Creating Account..." : "Create My Account"}</span>
    </button>
  );
}

function FieldError({ error }: { error?: string[] }) {
  if (!error?.[0]) return null;

  return <p className="text-sm text-red-600">{error[0]}</p>;
}

function PasswordStrengthLabel(password?: string) {
  if (!password) {
    return {
      label: "Weak",
      width: "0%",
      color: "bg-red-500",
      ariaValue: 0,
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      label: "Weak",
      width: "33%",
      color: "bg-red-500",
      ariaValue: 33,
    };
  }

  if (score <= 4) {
    return {
      label: "Medium",
      width: "66%",
      color: "bg-yellow-500",
      ariaValue: 66,
    };
  }

  return {
    label: "Strong",
    width: "100%",
    color: "bg-green-500",
    ariaValue: 100,
  };
}

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState<
    SignupActionState,
    FormData
  >(signupAction, initialSignupState);
  const [password, setPassword] = useState("");

  const strength = PasswordStrengthLabel(password);

  return (
    <>
      <OAuthButtons/>
      <form action={formAction} className="space-y-7 font-medium mt-10" noValidate>
        {state.message ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {state.message}
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            defaultValue={state.values?.name ?? ""}
            className="w-full py-2 px-3 rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-md"
            placeholder="Ali"
            aria-invalid={!!state.fieldErrors?.name?.[0]}
            type="text"
          />
          <FieldError error={state.fieldErrors?.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            defaultValue={state.values?.email ?? ""}
            className="w-full py-2 px-3 rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-md"
            placeholder="ali@example.com"
            aria-invalid={!!state.fieldErrors?.email?.[0]}
            type="email"
          />
          <FieldError error={state.fieldErrors?.email} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            name="password"
            className="w-full py-2 px-3 rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-md"
            placeholder="create a strong password"
            aria-invalid={!!state.fieldErrors?.password?.[0]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="password-requirements">
            <div className="flex items-center gap-2">
              <div
                className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden"
                role="progressbar"
                aria-valuenow={strength.ariaValue}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Password strength: ${strength.label}`}
              >
                <div
                  className={`progress h-full transition-all duration-300 ease-out ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>

              <span className="text-sm font-medium min-w-12.5">
                {strength.label}
              </span>
            </div>
          </div>

          <p className="text-gray-500 -mt-2 text-xs">
            Must be at least 8 characters with numbers and symbols
          </p>

          <FieldError error={state.fieldErrors?.password} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rePassword">Confirm Password*</label>
          <input
            id="rePassword"
            name="rePassword"
            className="w-full py-2 px-3 rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-md"
            placeholder="confirm your password"
            aria-invalid={!!state.fieldErrors?.rePassword?.[0]}
            type="password"
          />
          <FieldError error={state.fieldErrors?.rePassword} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone Number*</label>
          <input
            id="phone"
            name="phone"
            defaultValue={state.values?.phone ?? ""}
            className="w-full py-2 px-3 rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all text-md"
            placeholder="01010700701"
            aria-invalid={!!state.fieldErrors?.phone?.[0]}
            type="tel"
          />
          <FieldError error={state.fieldErrors?.phone} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <input
              id="terms"
              className="size-4 accent-green-600"
              type="checkbox"
              name="terms"
            />
            <label htmlFor="terms" className="ms-2">
              I agree to the{" "}
              <Link className="text-green-600 hover:underline" href="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="text-green-600 hover:underline"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>{" "}
              *
            </label>
          </div>
          <FieldError error={state.fieldErrors?.terms} />
        </div>

        <SubmitButton pending={pending} />
      </form>
    </>
  );
}
