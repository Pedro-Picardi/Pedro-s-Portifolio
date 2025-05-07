import {
  GridBackground,
  Card3DEffect,
  PostIt,
  TimelineMarquee,
  ProgressBar,
  FeaturedProject,
  Profile
} from "./components";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-start md:justify-center md:h-screen
       w-full h-full bg-deep-background p-2"
      style={{
        backgroundImage: "url(/assets/bghero.webp)",
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card3DEffect>
        <GridBackground>
          <div className="w-full h-full p-2 md:p-8 relative flex flex-col gap-6">
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold font-daniel text-left static transform -skew-y-12 bg-gradient-to-b from-highlight to-highlight/70 bg-clip-text text-transparent leading-tight py-2">Hi, I&apos;m Pedro<br/>& I dev for a living</h1>
            <Profile />
            </div>
            <FeaturedProject />
            <PostIt className="static max-h-[380px] flex flex-col items-center justify-start md:absolute md:top-5 md:right-5" />
            <div className=" md:absolute md:flex-row md:bottom-4 md:right-0 md:left-0 md:px-4 flex flex-col w-full items-center justify-between gap-4">
              <ProgressBar />
              <TimelineMarquee />
            </div>
          </div>
        </GridBackground>
      </Card3DEffect>
    </main>
  );
}
