import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const { data: works } = await supabase.from("works").select("*");

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
