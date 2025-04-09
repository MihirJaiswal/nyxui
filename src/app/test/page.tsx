import Header from "@/components/global/Header";
import MorphingButton from "@/nyxui/components/MorphingButton";
import GitHubProfileCardDemo from "@/nyxui/demos/GithubProfileCardDemo";
import GitHubRepoCardDemo from "@/nyxui/demos/GithubRepoCardDemo";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header/>
        <GitHubProfileCardDemo/>
    </div>
  )
}