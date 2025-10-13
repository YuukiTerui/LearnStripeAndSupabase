import { Database, Tables } from "@/lib/database.types";
import {
  createServerComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDetailWork = async (
  id: number,
  supabase: SupabaseClient<Database>
): Promise<Tables<"works"> | null> => {
  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single();
  return work;
};

const WorkPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = createServerComponentClient({ cookies });
  const { id } = await params;
  const work = await getDetailWork(Number(id), supabase);
  return (
    <>
      <h1>{work?.title}</h1>
      <p>{work?.description}</p>
    </>
  );
};

export default WorkPage;
