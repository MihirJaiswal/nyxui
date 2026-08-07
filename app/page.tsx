import Navbar from "@/components/global/header/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen overflow-hidden flex items-center justify-center flex-col px-8">
        <p className="text-center">
          The only UI library you need to build modern websites and
          applications. Built with{" "}
          <span className="text-primary">Motion-react</span> and{" "}
          <span className="text-primary">Tailwind CSS</span>.
        </p>
      </div>
    </>
  );
}
