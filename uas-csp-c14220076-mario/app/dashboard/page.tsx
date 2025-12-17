import { createClient } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: notes } = await supabase
    .from("announcements")
    .select();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black">Employee Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-black text-sm">Welcome, {user.email}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Notes
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes?.map((notes) => (
              <div
                key={notes.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-black mb-2">
                    {notes.title}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {notes.content}
                  </p>
                </div>
              </div>
            )) ?? <p className="text-gray-500">Tidak ada notes.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
