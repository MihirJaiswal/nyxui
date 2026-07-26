import SharedSidebarLayout from "@/components/global/SharedLayout";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedSidebarLayout>{children}</SharedSidebarLayout>;
}
