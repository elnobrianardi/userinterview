export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-12 border-t">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-teal-700 transition">Privacy Policy</a>
          <a href="#" className="hover:text-teal-700 transition">Terms of Service</a>
          <a href="#" className="hover:text-teal-700 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
