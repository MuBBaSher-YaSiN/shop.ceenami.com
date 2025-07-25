export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-8 sm:p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#d5b56e] mb-4">
          Unauthorized Access
        </h1>
        <p className="text-white/80 mb-6">
          You don't have permission to view this page.
        </p>
        <div className="h-1 w-20 bg-[#d5b56e] mx-auto mb-6"></div>
        <a 
          href="/" 
          className="inline-block bg-[#d5b56e] hover:bg-[#c19a3d] text-black font-bold py-2 px-6 rounded transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}