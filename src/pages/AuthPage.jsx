import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleResponse } from "../utils/helpers/helpers";
import { signin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogging } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus("");

    await handleResponse(dispatch(signin(values)), () => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Premium Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold text-slate-300 hidden sm:block">Asset Manager</h1>
          </div>

          {/* Welcome Message */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Welcome Back
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Manage your business with precision and confidence. Access
                powerful analytics and insights at your fingertips.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Real-time Analytics
                  </h3>
                  <p className="text-sm text-slate-400">
                    Track performance metrics instantly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    Secure & Reliable
                  </h3>
                  <p className="text-sm text-slate-400">
                    Enterprise-grade security for your data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">24/7 Support</h3>
                  <p className="text-sm text-slate-400">
                    Dedicated team ready to help
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-xs text-slate-500">Secure admin portal © 2024</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-600">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ status }) => (
              <Form className="space-y-5">
                {status && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {status}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-4 py-3 form-input"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 form-input py-3"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 form-checkbox"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-slate-600 cursor-pointer"
                  >
                    Keep me signed in
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLogging}
                  className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 mt-6"
                >
                  {isLogging ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              Need help?{" "}
              <button className="text-secondary-500-600 hover:text-blue-700 font-medium transition">
                support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
