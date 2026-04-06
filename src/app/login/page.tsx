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
    <div>
      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
}