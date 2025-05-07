import {
  GridBackground,
  Card3DEffect,
  PostIt,
  TimelineMarquee,
  ProgressBar,
  FeaturedProject,
  Profile,
  OtherProjects,
  Stack
} from "./components";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-start md:justify-center md:h-screen
       w-full h-full bg-deep-background py-20 px-1"
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
            <div data-name="profile" className=" mt-8 gap-4 static md:absolute md:mt-0 md:top-1/3 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center justify-center">
            <h1 className="text-2xl 2xl:text-3.5xl font-bold font-daniel text-left static transform -skew-y-12 text-highlight/80 leading-normal py-2 text-shadow-[8px_8px_20px_rgba(0,0,0,0.8)]">Hi, my name is Pedro<br/>& I DEV for a living</h1>
            <Profile />
            </div>
            <div data-name="featured-project" className="flex md:absolute md:top-4 md:left-4 flex-col items-center gap-4 md:h-[340px] md:w-[400px] justify-between">
            <FeaturedProject />
            <OtherProjects />
            </div>
            <PostIt className="static max-h-[380px] flex flex-col items-center justify-start md:absolute md:top-5 md:right-5" />
            <div data-name="skills-timeline" className=" md:absolute md:flex-row md:bottom-4 md:right-0 md:left-0 md:px-4 flex flex-col w-full items-center justify-between gap-4">
              <ProgressBar />
              <Stack />
              <TimelineMarquee />
            </div>
          </div>
        </GridBackground>
      </Card3DEffect>
    </main>
  );
}
