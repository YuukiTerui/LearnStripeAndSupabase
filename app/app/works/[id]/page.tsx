import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDetailWork = async (id: number) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single();
  return work;
};

const WorkPage = async ({ params }: { params: { id: number } }) => {
  const work = await getDetailWork(params.id);
  return <h1>{work?.title}</h1>;
};

export default WorkPage;

