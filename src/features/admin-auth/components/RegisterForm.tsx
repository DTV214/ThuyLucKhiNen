"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Eye, EyeOff, KeyRound, LoaderCircle, UserPlus, UserRound } from "lucide-react";
import { registerAdmin } from "@/features/admin-auth/actions/register";
import { loginInitialState } from "@/features/admin-auth/data/login-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container px-4 py-3 text-body-lg font-semibold text-on-primary shadow-md transition hover:from-primary-container hover:to-secondary disabled:cursor-wait disabled:opacity-70">{pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : <UserPlus aria-hidden="true" className="size-5" />}{pending ? "Đang tạo tài khoản..." : "Tạo tài khoản quản trị"}</button>;
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAdmin, loginInitialState);
  const [showPassword, setShowPassword] = useState(false);

  return <form action={formAction} className="mt-5 flex flex-col gap-4" noValidate><div><label htmlFor="register-username" className="text-label-md font-medium text-on-surface">Tên đăng nhập *</label><div className="relative mt-1.5"><UserRound aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-outline" /><input id="register-username" name="username" required autoComplete="username" placeholder="admin" className="w-full rounded-xl bg-surface-container-low py-2.5 pl-10 pr-3 text-body-md outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30" /></div></div><div><label htmlFor="register-password" className="text-label-md font-medium text-on-surface">Mật khẩu *</label><div className="relative mt-1.5"><KeyRound aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-outline" /><input id="register-password" name="password" required autoComplete="new-password" type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" className="w-full rounded-xl bg-surface-container-low py-2.5 pl-10 pr-11 text-body-md outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-outline hover:text-on-surface" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}>{showPassword ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}</button></div></div><div><label htmlFor="register-confirm-password" className="text-label-md font-medium text-on-surface">Xác nhận mật khẩu *</label><input id="register-confirm-password" name="confirmPassword" required autoComplete="new-password" type={showPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="mt-1.5 w-full rounded-xl bg-surface-container-low py-2.5 px-3 text-body-md outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30" /></div>{state.error ? <p role="alert" className="rounded-lg bg-error-container px-3 py-2.5 text-body-sm text-on-error-container">{state.error}</p> : null}{state.message ? <div role="status" className="rounded-lg bg-secondary-fixed px-3 py-2.5 text-body-sm text-on-secondary-fixed"><p className="flex items-center gap-1.5 font-semibold"><CheckCircle2 aria-hidden="true" className="size-4" />{state.message}</p><Link href="/admin/login" className="mt-1.5 inline-flex font-semibold text-primary hover:underline">Đi đến trang đăng nhập</Link></div> : null}<SubmitButton /></form>;
}
