import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CamperCard from "@/components/CamperCard";

//const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const API_URL = "http://localhost:3001";

interface Camper {
  id: number;
  name: string;
  username: string;
  emoji: string;
}

async function fetchCampers(): Promise<Camper[]> {
  const res = await fetch(`${API_URL}/api/users`);
  if (!res.ok) throw new Error("Failed to load campers");
  return res.json();
}

async function updateCamperUsername(id: number, username: string): Promise<Camper> {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!res.ok) throw new Error("Failed to update username");
  return res.json();
}

const Index = () => {
  const queryClient = useQueryClient();
  const { data: campers = [], isLoading, error } = useQuery({
    queryKey: ["campers"],
    queryFn: fetchCampers,
  });

  const mutation = useMutation({
    mutationFn: ({ id, username }: { id: number; username: string }) =>
      updateCamperUsername(id, username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campers"] });
    },
  });

  const updateUsername = (id: number, newUsername: string) => {
    mutation.mutate({ id, username: newUsername });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <p className="text-4xl mb-2">🦕</p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dino Discovery Camp
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Summer 2026 · Enrolled Campers
        </p>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 space-y-4">
        {isLoading && (
          <p className="text-center text-muted-foreground py-8">Loading campers…</p>
        )}
        {error && (
          <p className="text-center text-destructive py-4">
            {error instanceof Error ? error.message : "Something went wrong."}
          </p>
        )}
        {!isLoading && !error && campers.map((c) => (
          <CamperCard
            key={c.id}
            name={c.name ?? ""}
            username={c.username ?? ""}
            emoji={c.emoji ?? ""}
            onSave={(newUsername) => updateUsername(c.id, newUsername)}
            isSaving={mutation.isPending}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
