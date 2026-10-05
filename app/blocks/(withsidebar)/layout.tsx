import SidebarLayout from "@/components/global/SidebarLayout";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout sidebarType="blocks">{children}</SidebarLayout>;
}
