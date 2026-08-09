import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Footer Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-10" />
            <span className="font-bold text-gray-800">MECHROBOT</span>
          </div>

          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} MECHROBOT. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
