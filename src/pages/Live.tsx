
import MainLayout from "@/components/layout/MainLayout";

const Live = () => {
  return (
    <MainLayout>
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Live Streams</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We're working on bringing live streams to ClipSnap. Stay tuned!
        </p>
        <div className="p-12 border border-dashed border-muted-foreground/50 rounded-md max-w-lg mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-6 text-muted-foreground"
          >
            <path d="M22 8.01A9.97 9.97 0 0 0 12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.47 0 .94-.03 1.4-.1"></path>
            <path d="M8 3v4.01"></path><path d="M16 3v4.01"></path>
            <path d="M22 12l-9 6"></path>
          </svg>
          <p className="text-muted-foreground">
            Live streaming functionality will be available soon.
            <br />Check back for updates!
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Live;
