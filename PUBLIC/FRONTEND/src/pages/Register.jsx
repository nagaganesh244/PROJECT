
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/fetchvideos";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm();

  const [successMsg, setSuccessMsg] = React.useState("");
  const [serverError, setServerError] = React.useState("");

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      setSuccessMsg("Registration successful!");
      setServerError("");
      reset();
      setTimeout(() => setSuccessMsg(""), 3000);
    },
    onError: (err) => {
      if (err.message === "username already exists") {
        setError("username", {
          type: "manual",
          message: "Username already exists",
        });
        setServerError("Registration failed: Username already exists.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-tight">
          Create Your Account
        </h2>

        {successMsg && (
          <div className="mb-4 text-green-600 text-center font-semibold">
            {successMsg}
          </div>
        )}
        {serverError && (
          <div className="mb-4 text-red-600 text-center font-semibold">
            {serverError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
              {...register("username", {
                required: "USERNAME is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
                {...register("first_name", {
                  required: "First name is required",
                })}
                placeholder="First name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                placeholder="Last name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Channel Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Channel Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
              {...register("channel_name", {
                required: "Channel name is required",
                minLength: {
                  value: 3,
                  message: "Channel name must be at least 3 characters",
                },
              })}
              placeholder="Enter your channel name"
            />
            {errors.channel_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.channel_name.message}
              </p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
              {...register("profile_picture", {
                required: "Profile picture is required",
                validate: {
                  isImage: (files) => {
                    if (!files || !files[0])
                      return "Profile picture is required";
                    const allowedTypes = [
                      "image/png",
                      "image/jpeg",
                      "image/jpg",
                      "image/gif",
                      "image/webp",
                    ];
                    return allowedTypes.includes(files[0].type)
                      ? true
                      : "Please upload a valid image file (png, jpg, jpeg, gif, webp)";
                  },
                },
              })}
            />
            {errors.profile_picture && (
              <p className="text-red-500 text-xs mt-1">
                {errors.profile_picture.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
