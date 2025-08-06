import { FaGoogle, FaRss, FaFacebookF, FaChevronRight } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 py-4">
      <div className="container mx-auto flex items-center justify-center gap-6 text-sm text-gray-700">
        
        {}
        <div className="flex items-center gap-3">
          {}
          <a href="#" className="text-gray-600 hover:text-black"><FaGoogle /></a>
          <a href="#" className="text-gray-600 hover:text-black"><FaRss /></a>
          <a href="https://www.facebook.com/fug248/" className="text-gray-600 hover:text-black"><FaFacebookF /></a>
        </div>
        
        <span className="text-gray-300">|</span>
        
        <span>DPShop</span>
        
        <span className="text-gray-300">|</span>

        <span>Add: 284/20 Phan Huy Ích phường 12 quận Gò Vấp, HCM</span>

        <span className="text-gray-300">|</span>

        <span>Tel: 0919421413</span>

        <span className="text-gray-300">|</span>
        
      </div>
    </footer>
  );
}