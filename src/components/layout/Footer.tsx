import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-sm">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white mb-1">Tạm Giữ Tiền Escrow</h4>
              <p className="text-slate-400 text-xs">100% tiền đặt cọc an toàn, chỉ giải ngân khi chấp nhận sản phẩm.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Lock className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white mb-1">Bảo Vệ Hai Chiều</h4>
              <p className="text-slate-400 text-xs">Chống bùng tiền cho Freelancer, chống quỵt bài cho Nhà tuyển dụng.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileCheck className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white mb-1">Quy Định NĐ 85/2021</h4>
              <p className="text-slate-400 text-xs">Sàn Thương mại Điện tử hợp pháp tuân thủ đầy đủ quy định Việt Nam.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white mb-1">TalentCredit Uy Tín</h4>
              <p className="text-slate-400 text-xs">Điểm uy tín được tích lũy từ lịch sử giao dịch & nghiệm thu thực tế.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <img
              src="/logo_talentMatch.png"
              alt="TalentMatch Brand"
              className="h-10 w-auto object-contain bg-white/10 p-1.5 rounded-lg"
            />
            <p className="text-slate-400 text-xs leading-relaxed pr-6">
              TalentMatch là Sàn giao dịch dịch vụ tự do (Freelancer Marketplace) kết nối các tài năng số Việt Nam với cá nhân, startup và doanh nghiệp dựa trên hạ tầng Tạm giữ tiền (Escrow) minh bạch.
            </p>
            <div className="text-xs text-slate-500 font-medium space-y-1">
              <p>Mã số doanh nghiệp: 0101234567 — Đăng ký lần đầu tại Hà Nội</p>
              <p>Hỗ trợ: hotro@talentmatch.vn | Hotline: 1900 xxxx</p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4">Dịch Vụ Số Hot</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/services?cat=IT" className="hover:text-blue-400">Lập trình Website & App</Link></li>
              <li><Link to="/services?cat=Design" className="hover:text-blue-400">Thiết kế UI/UX & Landing Page</Link></li>
              <li><Link to="/services?cat=Video" className="hover:text-blue-400">Video Editing & Motion Ads</Link></li>
              <li><Link to="/services?cat=Marketing" className="hover:text-blue-400">Digital Marketing & SEO</Link></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4">Người Dùng</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/services" className="hover:text-blue-400">Tìm Thuê Dịch Vụ</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400">Dự Án Đang Tuyển</Link></li>
              <li><Link to="/create-project" className="hover:text-blue-400">Đăng Dự Án Mới</Link></li>
              <li><Link to="/freelancer/dashboard" className="hover:text-blue-400">Trở Thành Freelancer</Link></li>
            </ul>
          </div>

          {/* Policy & Legal */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4">Pháp Lý & An Toàn</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-blue-400 cursor-pointer">Quy chế Escrow & Tạm giữ</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Chính sách Tranh chấp</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Chống Giao dịch chui Zalo</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Bảo vệ Dữ liệu NĐ 13/2023</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 TalentMatch Vietnam Freelancer Marketplace. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};
