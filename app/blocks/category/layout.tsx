import SidebarLayout from "@/components/global/SidebarLayout";

export default function BlockCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout sidebarType="blocks">{children}</SidebarLayout>;
}
