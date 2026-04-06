"use client";

import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NEXT_PUBLIC_SITE_URL + "/dashboard",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px] text-center">
        
        <h1 className="text-2xl font-bold mb-6">
          Login to <span className="text-purple-600">Wolfixa AI</span>
        </h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:scale-105 transition"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}