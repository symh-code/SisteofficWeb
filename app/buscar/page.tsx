import { CatalogView } from "../components/CatalogView";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";

  return <CatalogView query={query} />;
}