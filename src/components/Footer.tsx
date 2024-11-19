import React from 'react';
import { Shield, Heart, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 pt-8">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Privacy & Security
          </h3>
          <p className="text-gray-400 text-sm">
            We take your privacy seriously. Your prompts and generated images are never stored or shared.
            All data is processed securely and temporarily.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            Legal Information
          </h3>
          <p className="text-gray-400 text-sm">
            Our service complies with all applicable laws and regulations. Read our legal documents to learn more.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <p className="text-gray-400 text-sm">
            Our AI Image Creator uses cutting-edge technology to transform your ideas into stunning visuals.
            Perfect for artists, designers, and creators.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6 py-8 border-t border-white/10">
        <div>
          <h4 className="font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3">Policies</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/acceptable-use" className="text-gray-400 hover:text-white transition-colors">Acceptable Use Policy</Link>
            </li>
            <li>
              <Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link>
            </li>
            <li>
              <Link to="/copyright" className="text-gray-400 hover:text-white transition-colors">Copyright Notice</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3">Compliance</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/gdpr" className="text-gray-400 hover:text-white transition-colors">GDPR Compliance</Link>
            </li>
            <li>
              <Link to="/ccpa" className="text-gray-400 hover:text-white transition-colors">CCPA Notice</Link>
            </li>
            <li>
              <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Legal Disclaimer</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-gray-400 text-sm py-4 border-t border-white/10">
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-400" /> by AI Image Creator Team
        </p>
        <p className="mt-2">© {new Date().getFullYear()} AI Image Creator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;