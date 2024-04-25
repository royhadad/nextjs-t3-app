export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-lvh">
      <div className="h-full w-48 border-2 border-blue-400">
        layout for the dashboard route
      </div>
      <div className="flex-grow border-2 border-green-300">{children}</div>
    </div>
  );
}
