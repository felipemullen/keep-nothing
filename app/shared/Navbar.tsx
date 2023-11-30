export default function Navbar() {
    return (
        <nav className="flex items-center w-full bg-gray-700 h-[80px]">
            <ul className="flex justify-evenly text-xl font-semibold text-white w-full">
                <li><a href="/">Home</a></li>
                <li><a href="/api/auth/signin">Sign In</a></li>
                <li><a href="/api/auth/signout">Sign Out</a></li>
                <li><a href="/server">Server</a></li>
                <li><a href="/client">Client</a></li>
                <li><a href="/extra">Extra</a></li>
            </ul>
        </nav>
    )
}