"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function NavBar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search Your Dish", href: "/searchDish" },
    { name: "Make what you have", href: "/creativerecipe" },
    { name: "Community", href: "/Community" },
    { name: "Support Us", href: "/SupportUs" },
  ];

  return (
    <div className="bg-white backdrop-blur-md border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="https://www.svgrepo.com/show/490734/food-dinner.svg"
              className="h-8 w-8 sm:h-10 sm:w-10 transition-transform hover:scale-110"
              alt="Get Your Dish Logo"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
              Green Plate
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-2 font-medium transition-colors ${
                  pathname === link.href
                    ? "text-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute inset-x-1 -bottom-1 h-0.5 bg-green-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
              <button className="relative font-bold inline-flex items-center justify-center px-6 py-3 mb-2 me-2 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-teal-500  hover:to-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out shadow-md">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton>
              <button className="relative font-bold inline-flex items-center justify-center px-6 py-3 mb-2 me-2 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-teal-500  hover:to-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out shadow-md">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-green-100 hover:border-green-200",
                      userButtonPopoverCard: "shadow-lg",
                    },
                  }}
                />
                <SignOutButton>
                <button className="relative font-bold inline-flex items-center justify-center px-6 py-3 mb-2 me-2 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-teal-500  hover:to-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out shadow-md">
                  Sign Out
                </button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;