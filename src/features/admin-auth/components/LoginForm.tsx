"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Building2, CircleHelp, Eye, EyeOff, KeyRound, LoaderCircle, LogIn, ShieldCheck, UserRound } from "lucide-react";
import { login } from "@/features/admin-auth/actions/login";
import { loginInitialState } from "@/features/admin-auth/data/login-state";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container px-4 py-3 text-body-lg font-semibold text-on-primary shadow-md transition hover:from-primary-container hover:to-secondary disabled:cursor-wait disabled:opacity-70">
      {pending ? <LoaderCircle aria-hidden="true" className="size-5 animate-spin" /> : <LogIn aria-hidden="true" className="size-5" />}
      {pending ? "Đang xác thực hệ thống..." : "Đăng nhập hệ thống quản trị"}
    </button>
  );
}

/** Client boundary only for password visibility and form submission feedback. */
export function LoginForm() {
  const [state, formAction] = useActionState(login, loginInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form action={formAction} className="mt-5 flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="admin-username" className="flex items-center justify-between text-label-md font-medium text-on-surface">
          <span>Tên đăng nhập</span>
          <span className="font-mono text-label-sm text-outline">PORTAL-ID</span>
        </label>
        <div className="relative mt-1.5">
          <UserRound aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-outline" />
          <input id="admin-username" name="username" required autoComplete="username" placeholder="admin" className="w-full rounded-xl bg-surface-container-low py-2.5 pl-10 pr-3 text-body-md text-on-surface outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="admin-password" className="text-label-md font-medium text-on-surface">Mật khẩu ủy quyền</label>
          <button type="button" className="text-label-sm font-medium text-primary hover:underline">Quên mật khẩu?</button>
        </div>
        <div className="relative mt-1.5">
          <KeyRound aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-outline" />
          <input id="admin-password" name="password" required autoComplete="current-password" type={isPasswordVisible ? "text" : "password"} placeholder="••••••••" className="w-full rounded-xl bg-surface-container-low py-2.5 pl-10 pr-11 text-body-md text-on-surface outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30" />
          <button type="button" onClick={() => setIsPasswordVisible((visible) => !visible)} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-outline transition hover:text-on-surface" aria-label={isPasswordVisible ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}>
            {isPasswordVisible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-body-sm text-on-surface-variant"><input name="rememberSession" type="checkbox" className="size-4 rounded accent-primary" />Ghi nhớ phiên trên thiết bị này</label>
        <span className="hidden items-center gap-1 text-label-sm font-medium text-secondary sm:inline-flex"><span className="size-1.5 rounded-full bg-secondary" />NODE:VN-01</span>
      </div>

      {state.error ? <p role="alert" className="rounded-lg bg-error-container px-3 py-2.5 text-body-sm text-on-error-container">{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}

export function AdminLoginSupport() {
  return (
    <div className="mt-6 rounded-xl bg-surface-container-low p-3 text-on-surface-variant">
      <div className="flex items-start gap-2.5"><CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-secondary" /><div><p className="text-label-sm font-semibold text-on-surface">Hỗ trợ kỹ thuật &amp; Phân quyền</p><p className="mt-0.5 text-body-sm">Liên hệ quản trị viên hệ thống khi cần cấp lại quyền truy cập.</p></div></div>
    </div>
  );
}

export function AdminLoginBrand() {
  return (
    <div className="relative flex flex-col items-center gap-2 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-surface-container-high text-primary shadow-sm"><Building2 aria-hidden="true" className="size-8" /></div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-2.5 py-1 text-label-sm font-medium text-secondary"><span className="size-1.5 rounded-full bg-secondary" />B2B INDUSTRIAL PORTAL</span>
      <h1 id="admin-login-title" className="text-headline-md font-semibold tracking-tight text-on-surface">ThanhDanh-VMC</h1>
      <p className="max-w-xs text-body-sm leading-5 text-on-surface-variant">Cổng Quản Trị Hệ Thống Phân Phối Thiết Bị Thủy Lực &amp; Khí Nén</p>
      <p className="mt-1 inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-body-sm text-on-surface-variant"><ShieldCheck aria-hidden="true" className="size-4 text-primary" />Kết nối API được bảo vệ bằng JWT</p>
    </div>
  );
}
