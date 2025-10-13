import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, Tables } from "@/lib/database.types";
import {
  createServerComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const getAllWorks = async (
  supabase: SupabaseClient<Database, "public">
): Promise<Tables<"works">[] | null> => {
  const { data: works } = await supabase.from("works").select("*");
  return works;
};

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const works = await getAllWorks(supabase);

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      <div className="flex flex-col gap-4">
        {works?.map((work) => (
          <Link key={work.id} href={`/works/${work.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{work.title}</CardTitle>
                <CardDescription>{work.description}</CardDescription>
                {/* <CardAction>
                  <Button variant="outline">View</Button>
                </CardAction> */}
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
