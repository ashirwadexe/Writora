import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";
import Loader from "../Components/Common/Loader";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newError.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Enter a valid email!";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required!";
    } else if (formData.password.trim().length < 6) {
      newError.password = "Password should be of 6 characters!";
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

      const response = await login(formData);
      toast.success(response.message || "Login successful!");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error login account!",
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

        {/* Main content */}
        <div className="mx-auto grid max-w-5xl items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-16">
          {/* Left panel */}
          <section className="hidden lg:block">
            <div className="relative border-2 border-[#202020] bg-[#EC5E27] p-8 shadow-[8px_8px_0px_#202020] xl:p-10">
              <div className="flex items-center gap-2 border-b-2 border-[#202020]/30 pb-5">
                <Sparkles size={20} strokeWidth={2.5} />

                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Your creative space
                </span>
              </div>

              <h1 className="mt-10 text-5xl font-black leading-[1.05] tracking-[-0.05em] xl:text-6xl">
                Welcome
                <br />
                back,
                <br />
                <span className="text-[#FDFDF1]">storyteller.</span>
              </h1>

              <p className="mt-6 max-w-sm text-base font-semibold leading-7">
                Your next great idea is waiting. Pick up where you left off and
                keep creating stories worth sharing.
              </p>

              <div className="mt-10 flex items-center justify-between border-2 border-[#202020] bg-[#FDFDF1] p-4 shadow-[4px_4px_0px_#202020]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border-2 border-[#202020] bg-[#F2CB57]">
                    <BookOpen size={22} strokeWidth={2.5} />
                  </div>

                  <div>
                    <p className="font-black">Read. Think. Create.</p>
                    <p className="text-xs font-semibold text-[#666157]">
                      Your journey continues here.
                    </p>
                  </div>
                </div>

                <ArrowUpRight size={22} strokeWidth={2.5} />
              </div>

              <div className="absolute -right-4 -top-4 h-10 w-10 rotate-12 border-2 border-[#202020] bg-[#F2CB57]" />
            </div>
          </section>

          {/* Login form */}
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
                <span className="inline-flex items-center gap-2 border-2 border-[#202020] bg-[#F2CB57] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
                  <LockKeyhole size={14} strokeWidth={2.5} />
                  Member login
                </span>

                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  Good to see you again<span className="text-[#EC5E27]">.</span>
                </h2>

                <p className="mt-3 text-sm font-medium leading-6 text-[#68645B]">
                  Enter your details to continue your Writora journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-black"
                  >
                    Email address
                  </label>

                  <div className="flex items-center gap-3 border-2 border-[#202020] bg-[#FDFDF1] px-3 transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27]">
                    <Mail size={19} className="shrink-0" />

                    <input
                      id="login-email"
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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <label
                      htmlFor="login-password"
                      className="text-sm font-black"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-bold text-[#EC5E27] transition-colors hover:text-[#202020]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="flex items-center gap-3 border-2 border-[#202020] bg-[#FDFDF1] px-3 transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27]">
                    <LockKeyhole size={19} className="shrink-0" />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
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
                </div>
                {error.password && (
                  <p className="mt-1 text-sm font-bold text-red-600">
                    {error.password}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-5 py-3.5 text-sm font-black shadow-[4px_4px_0px_#202020] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  {isLoading ? (
                    <Loader text="Logging in..." />
                  ) : (
                    <>
                      Log in to Writora
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
                  New here?
                </span>

                <div className="h-0 flex-1 border-t-2 border-dashed border-[#202020]/20" />
              </div>

              <Link
                to="/signup"
                className="flex w-full items-center justify-center gap-2 border-2 border-[#202020] bg-white px-5 py-3.5 text-sm font-black transition-colors hover:bg-[#FDFDF1]"
              >
                Create an account
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </Link>
            </div>

            <p className="mt-6 text-center text-xs font-semibold text-[#777268]">
              Made for curious minds and bold ideas.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
