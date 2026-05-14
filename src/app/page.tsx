import PortfolioExperience from "@/components/PortfolioExperience";
import { getPortfolioWorks } from "@/lib/portfolio";

export default function Home() {
  return <PortfolioExperience works={getPortfolioWorks()} />;
}