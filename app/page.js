export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="glass-card w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">Auth Portal</h1>
        <p className="text-secondary text-lg mb-8">
          Secure authentication for your Oneiro dream journal
        </p>
        <div className="space-y-4 text-sm">
          <div className="feature-item">Email verification</div>
          <div className="feature-item">Password reset</div>
          <div className="feature-item">Secure authentication</div>
        </div>
        <div className="mt-8 text-muted text-sm">
          Continue your dream journey securely
        </div>
      </div>
    </div>
  );
}