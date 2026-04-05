export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login to Wolfixa</h1>

                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                    Continue with Google
                </button>
            </div>
        </div>
    );
}