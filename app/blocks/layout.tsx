import SharedSidebarLayout from "@/components/global/SharedLayout";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SharedSidebarLayout sidebarType="blocks">{children}</SharedSidebarLayout>
  );
}
