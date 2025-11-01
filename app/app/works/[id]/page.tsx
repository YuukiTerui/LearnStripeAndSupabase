import { Tables } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";
import { YouTubeEmbed } from "@next/third-parties/google";
import { SupabaseClient } from "@supabase/supabase-js";

const getPremiumContent = async (
  db: SupabaseClient,
  id: string
): Promise<string> => {
  const { data } = await db
    .from("premium_content")
    .select("video_url")
    .eq("id", id)
    .single();
  console.log("video url: ", data);
  return data?.video_url;
};

const extractYouTubeVideoId = (url: string): string | null => {
  const matched =
    /^https?:\/\/(www\.)?youtube\.com\/watch\?(.*&)?v=(?<videoId>[^&]+)/.exec(
      url
    ) ??
    /^https?:\/\/youtu\.be\/(?<videoId>[^?]+)/.exec(url) ??
    /^https?:\/\/(www\.)?youtube\.com\/embed\/(?<videoId>[^?]+)/.exec(url);

  if (matched?.groups?.videoId) {
    return matched.groups.videoId;
  } else {
    return null;
  }
};

const WorkPage = async ({ params }: { params: any }) => {
  const supabase = await createClient();
  const { id } = await params;

  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single<Tables<"works">>();

  const videoUrl = await getPremiumContent(supabase, id);
  const videoId = extractYouTubeVideoId(videoUrl);

  return (
    <>
      <h1>{work?.title}</h1>
      <p>{work?.description}</p>
      {videoId && <YouTubeEmbed height={400} videoid={videoId} />}
    </>
  );
};

export default WorkPage;
