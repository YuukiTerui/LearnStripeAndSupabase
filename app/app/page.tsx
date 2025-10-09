import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
