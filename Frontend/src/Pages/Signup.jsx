import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  UserRound,
  LockKeyhole,
  Sparkles,
  PenLine,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Loader from "../Components/Common/Loader";

const Signup = () => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const inputValidation = () => {
    const newError = {};

    if (!formData.name.trim()) {
      newError.name = "Name is required!";
    } else if (formData.name.trim().length < 3) {
      newError.name = "Name should be of 3 characters!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newError.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Enter a valid email id!";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required!";
    } else if (formData.password.length < 6) {
      newError.password = "Password should be of 6 characters!";
    }

    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = inputValidation();
    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    try {
      setIsLoading(true);

      const { name, email, password } = formData;
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(response.data.message || "Account created!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error creating account!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDF1] px-4 py-6 text-[#202020] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Top navigation */}
        <Link to="/" className="group inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] bg-[#EC5E27] shadow-[3px_3px_0px_#202020] transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#202020]">
            <BookOpen size={22} strokeWidth={2.5} color="#FDFDF1" />
          </div>

          <span className="text-2xl font-black tracking-tight sm:text-3xl">
            writora<span className="text-[#EC5E27]">.</span>
          </span>
        </Link>

        <div className="mx-auto grid max-w-5xl items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-16">
          {/* Left panel */}
          <section className="hidden lg:block">
            <div className="relative border-2 border-[#202020] bg-[#F2CB57] p-8 shadow-[8px_8px_0px_#202020] xl:p-10">
              <div className="flex items-center gap-2 border-b-2 border-[#202020]/25 pb-5">
                <PenLine size={20} strokeWidth={2.5} />

                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Start something meaningful
                </span>
              </div>

              <h1 className="mt-10 text-5xl font-black leading-[1.05] tracking-[-0.05em] xl:text-6xl">
                Your ideas.
                <br />
                Your words.
                <br />
                <span className="text-[#EC5E27]">Your Writora.</span>
              </h1>

              <p className="mt-6 max-w-sm text-base font-semibold leading-7">
                Discover new perspectives, share your knowledge, and give your
                ideas a place to grow.
              </p>

              <div className="mt-10 border-2 border-[#202020] bg-[#FDFDF1] p-5 shadow-[4px_4px_0px_#202020]">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
                    <Sparkles size={22} strokeWidth={2.5} color="#FDFDF1" />
                  </div>

                  <div>
                    <p className="font-black">Every writer starts somewhere.</p>

                    <p className="mt-1 text-sm font-medium leading-6 text-[#68645B]">
                      Make this your space to learn, explore, and create.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 flex h-12 w-12 rotate-12 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
                <BookOpen size={23} strokeWidth={2.5} color="#FDFDF1" />
              </div>
            </div>
          </section>

          {/* Signup form */}
          <section className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#625F56] transition-colors hover:text-[#EC5E27]"
            >
              <ArrowLeft size={17} />
              Back to home
            </Link>

            <div className="border-2 border-[#202020] bg-white p-5 shadow-[6px_6px_0px_#202020] sm:p-8 sm:shadow-[8px_8px_0px_#202020]">
              <div className="mb-7">
                <span className="inline-flex items-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={14} strokeWidth={2.5} />
                  Join the community
                </span>

                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  Create your account<span className="text-[#EC5E27]">.</span>
                </h2>

                <p className="mt-3 text-sm font-medium leading-6 text-[#68645B]">
                  A few details, and you're ready to start your journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="signup-name"
                    className="mb-2 block text-sm font-black"
                  >
                    Full name
                  </label>

                  <div className="flex items-center gap-3 border-2 border-[#202020] bg-[#FDFDF1] px-3 transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27]">
                    <UserRound size={19} className="shrink-0" />

                    <input
                      id="signup-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      className="min-w-0 w-full bg-transparent py-3.5 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-[#99948A]"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {error.name && (
                  <p className="mt-1 text-sm font-bold text-red-600">
                    {error.name}
                  </p>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="signup-email"
                    className="mb-2 block text-sm font-black"
                  >
                    Email address
                  </label>

                  <div className="flex items-center gap-3 border-2 border-[#202020] bg-[#FDFDF1] px-3 transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27]">
                    <Mail size={19} className="shrink-0" />

                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      className="min-w-0 w-full bg-transparent py-3.5 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-[#99948A]"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {error.email && (
                  <p className="mt-1 text-sm font-bold text-red-600">
                    {error.email}
                  </p>
                )}

                {/* Password */}
                <div>
                  <label
                    htmlFor="signup-password"
                    className="mb-2 block text-sm font-black"
                  >
                    Password
                  </label>

                  <div className="flex items-center gap-3 border-2 border-[#202020] bg-[#FDFDF1] px-3 transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27]">
                    <LockKeyhole size={19} className="shrink-0" />

                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      required
                      className="min-w-0 w-full bg-transparent py-3.5 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-[#99948A]"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="shrink-0 p-1 transition-colors hover:text-[#EC5E27]"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                  {error.password ? (
                    <p className="mt-1 text-sm font-bold text-red-600">
                      {error.password}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs font-medium text-[#777268]">
                      Use at least 6 characters.
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="mb-2 block text-sm font-black"
                  >
                    Confirm password
                  </label>

                  <div className="flex items-center gap-3 border-2 border-[#202020] bg-[#FDFDF1] px-3 transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27]">
                    <LockKeyhole size={19} className="shrink-0" />

                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter password again"
                      required
                      className="min-w-0 w-full bg-transparent py-3.5 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-[#99948A]"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="shrink-0 p-1 transition-colors hover:text-[#EC5E27]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
                {error.confirmPassword && (
                  <p className="mt-1 text-sm font-bold text-red-600">
                    {error.confirmPassword}
                  </p>
                )}

                {/* Terms checkbox */}
                <label className="flex cursor-pointer items-start gap-3 py-1 text-xs font-medium leading-5 text-[#68645B]">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#EC5E27]"
                  />

                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-black text-[#202020] underline decoration-[#EC5E27] decoration-2 underline-offset-2"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-black text-[#202020] underline decoration-[#EC5E27] decoration-2 underline-offset-2"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-5 py-3.5 text-sm font-black shadow-[4px_4px_0px_#202020] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isLoading ? (
                    <Loader text="Creating account..." />
                  ) : (
                    <>
                      Create account
                      <ArrowRight
                        size={19}
                        strokeWidth={2.5}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-0 flex-1 border-t-2 border-dashed border-[#202020]/20" />

                <span className="text-[10px] font-black uppercase tracking-widest text-[#8B867C]">
                  Already a member?
                </span>

                <div className="h-0 flex-1 border-t-2 border-dashed border-[#202020]/20" />
              </div>

              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-2 border-2 border-[#202020] bg-white px-5 py-3.5 text-sm font-black transition-colors hover:bg-[#FDFDF1]"
              >
                Log in instead
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </Link>
            </div>

            <p className="mt-6 text-center text-xs font-semibold text-[#777268]">
              Your next great story starts here.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Signup;
