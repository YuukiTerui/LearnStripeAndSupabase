import { Tables } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";

const WorkPage = async ({ params }: { params: any }) => {
  const supabase = await createClient();
  const { id } = params;

  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single<Tables<"works">>();

  return (
    <>
      <h1>{work?.title}</h1>
      <p>{work?.description}</p>
    </>
  );
};

export default WorkPage;
