import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="font-sans min-h-[80vh] flex items-center justify-center bg-[#050505] text-zinc-100 px-6 bg-grid-pattern">
      <div className="glow-bg bg-brand-primary/10 top-1/4 left-1/4"></div>
      <div className="text-center z-10">
        <h1 className="text-8xl font-black text-white tracking-tight uppercase leading-none">404</h1>
        <h2 className="text-2xl font-black text-white mt-4 uppercase tracking-tight">Page Not Found</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto font-semibold">
          The page you are looking for does not exist or has been relocated.
        </p>
        <Link 
          to="/" 
          className="btn-primary mt-8 px-8 py-3 mx-auto inline-flex"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
