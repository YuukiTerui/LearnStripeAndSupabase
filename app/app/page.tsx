import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: works, error } = await supabase.from("works").select("*");

  console.log(works);
  console.log(error);

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      {works?.map((work) => (
        <Link key={work.id} href={`/works/${work.id}`}>
          {work.title}
        </Link>
      ))}
    </main>
  );
}
