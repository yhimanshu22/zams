import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white mx-auto  border-t border-gray-200 py-8">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Zams</h2>
                        <p className="mt-2 text-gray-600">
                            Enjoy delicious food delivered to your doorstep. Fast, Fresh & Hot!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link href="/menu" className="text-gray-600 hover:text-gray-900">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
                        <div className="mt-2 flex space-x-4">
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                Facebook
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                Twitter
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                Instagram
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center border-t border-gray-200 pt-4 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Zomato. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
