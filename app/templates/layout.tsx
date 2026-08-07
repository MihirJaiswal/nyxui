import SidebarLayout from "@/components/global/SidebarLayout";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
