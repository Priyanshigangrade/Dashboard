export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Total Projects</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Active Users</h3>
          <p className="text-2xl font-bold">48</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Credits Used</h3>
          <p className="text-2xl font-bold">1,250</p>
        </div>
      </div>
    </div>
  )
}