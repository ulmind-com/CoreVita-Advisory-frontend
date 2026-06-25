import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#003A70] text-white/80 pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="space-y-8">
            <Link href="/" className="inline-flex group">
              <Image
                src="/covian_logo.png"
                alt="CoVian Advisory"
                width={160}
                height={48}
                className="object-contain transition-opacity group-hover:opacity-80"
                priority
              />
            </Link>
            
            <p className="text-sm leading-relaxed text-blue-100/70">
              A strategic workforce and talent solutions company delivering recruitment, staffing, executive search, HR advisory and workforce consulting services.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-0.5">Primary — Call / WhatsApp</p>
                  <p className="text-sm font-medium text-white">+91 92880 65556</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-0.5">WhatsApp — Fastest Response</p>
                  <a href="https://wa.me/919288065556" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-green-400 transition-colors">wa.me/919288065556</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-0.5">Email Us Anytime</p>
                  <p className="text-sm font-medium text-white">info@covian.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white/50 uppercase font-semibold tracking-wider mb-0.5">Availability</p>
                  <p className="text-sm font-medium text-white">Available 24 × 7 — No Time Restriction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-px bg-blue-500"></div>
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Quick Links</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                  Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors"></span>
                  Login / Employer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Map */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-px bg-blue-500"></div>
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Global Presence</h3>
            </div>
            
            {/* The Map */}
            <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group bg-gradient-to-br from-[#0A1128] via-[#143059] to-[#0A1128]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.115865201103!2d86.1384024!3d23.630045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f423ab6306ddb3%3A0xc3f606db97dcbc19!2sChas%2C%20Bokaro%20Steel%20City%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%) brightness(85%) opacity(0.8)' }} 
                allowFullScreen 
                loading="lazy"
                className="pointer-events-none group-hover:pointer-events-auto transition-opacity"
              ></iframe>
              
              {/* Premium Animated Custom Pin Overlay */}
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  {/* Outer glowing rings */}
                  <div className="absolute w-14 h-14 bg-[#1E88E5]/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute w-8 h-8 bg-[#00A86B]/60 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                  
                  {/* The Map Pin SVG */}
                  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] animate-[bounce_2.5s_infinite]">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#pin-gradient)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
                    <circle cx="12" cy="9" r="3.5" fill="white" className="drop-shadow-md" />
                    <defs>
                      <linearGradient id="pin-gradient" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1E88E5" />
                        <stop offset="1" stopColor="#00A86B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* Ground Shadow */}
                <div className="w-8 h-1.5 bg-black/50 blur-[3px] rounded-[100%] mt-2"></div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#003A70] via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#003A70]/90 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight text-blue-50/80">
                    <strong className="text-white block mb-0.5 font-medium">Chas, Bokaro Steel City</strong>
                    Jharkhand, 827013, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Socials & Newsletter */}
          <div className="flex flex-col gap-10">
            {/* Follow Us */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-px bg-blue-500"></div>
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Follow Us</h3>
              </div>
              <div className="space-y-3">
                <a href="https://www.linkedin.com/company/covianadvisorypvtltd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0A66C2] to-[#1E88E5] flex items-center justify-center shrink-0">
                    <LinkedinIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">LinkedIn</p>
                    <p className="text-[10px] text-white/50">covianadvisorypvtltd</p>
                  </div>
                </a>
                
                <a href="https://www.facebook.com/share/1JYZqcRQqS/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1877F2] to-[#0C5A9E] flex items-center justify-center shrink-0">
                    <FacebookIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Facebook</p>
                    <p className="text-[10px] text-white/50">CoVian Advisory</p>
                  </div>
                </a>

                <a href="https://x.com/CovianAdvisory" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1DA1F2] to-[#0D8CDE] flex items-center justify-center shrink-0">
                    <TwitterIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">X (Twitter)</p>
                    <p className="text-[10px] text-white/50">@CovianAdvisory</p>
                  </div>
                </a>
                
                <a href="https://www.instagram.com/covian.advisory?igsh=NnVrOXp2MDh4aHl0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E1306C] to-[#F56040] flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Instagram</p>
                    <p className="text-[10px] text-white/50">@covian.advisory</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#003A70]/50 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold text-white">Stay Updated</h4>
              </div>
              <p className="text-[11px] text-white/70 mb-4 leading-relaxed">
                Career tips, industry trends & hiring updates — direct to your inbox.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-[#003A70] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Button className="bg-[#1E88E5] hover:bg-[#1565C0] text-white rounded-lg px-4 font-semibold shadow-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-100/50">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} <strong className="text-white font-medium">CoVian Advisory Pvt Ltd</strong>. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-1">
            Design & Developed By <a href="https://www.ulmind.com" target="_blank" rel="noopener noreferrer" className="ml-1.5 hover:opacity-80 transition-opacity flex items-center"><Image src="/ulmind_official_logo.png" alt="ULMIND" width={80} height={20} className="h-5 w-auto object-contain" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
