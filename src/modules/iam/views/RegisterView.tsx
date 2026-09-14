"use client";

import React from "react";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterView() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent -z-10" />
      <RegisterForm />
    </div>
  );
}
