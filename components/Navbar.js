import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-500">INDEX STATION</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-pink-400">Home</Link>
          <Link href="/schedule" className="hover:text-pink-400">Schedule</Link>
          <Link href="/requests" className="hover:text-pink-400">Requests</Link>
          <Link href="/admin" className="hover:text-pink-400 bg-gray-700 px-3 py-1 rounded">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
