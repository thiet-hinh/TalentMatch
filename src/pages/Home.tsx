import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Search,
  ShieldCheck,
  Star,
  ArrowRight,
  Code,
  Palette,
  Video,
  TrendingUp,
  Award,
  Briefcase,
  UserCheck,
  ExternalLink,
  CreditCard
} from 'lucide-react';

export const Home: React.FC = () => {
  const { projects, freelancers } = useDemo();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQuickTag = (tag: string) => {
    navigate(`/projects?q=${encodeURIComponent(tag)}`);
  };

  const categories = [
    { name: 'IT & Lập trình Web/App', icon: <Code className="w-6 h-6 text-blue-600" />, count: '140+ Dự án', color: 'bg-blue-50' },
    { name: 'Thiết kế UI/UX & Branding', icon: <Palette className="w-6 h-6 text-indigo-600" />, count: '95+ Dự án', color: 'bg-indigo-50' },
    { name: 'Video Editing & TikTok Ads', icon: <Video className="w-6 h-6 text-purple-600" />, count: '60+ Dự án', color: 'bg-purple-50' },
    { name: 'Digital Marketing & Content', icon: <TrendingUp className="w-6 h-6 text-emerald-600" />, count: '80+ Dự án', color: 'bg-emerald-50' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Realistic Hero Section with Cinematic Background & Glassmorphism */}
      <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        
        {/* Real High-Resolution Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=2200"
            className="w-full h-full object-cover object-center"
          >
            <source
              src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Balanced Translucent Overlay so Video Movement is Clearly Visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-blue-950/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
        
        {/* Main Center Content */}
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-7">
          
          {/* Trust Badge with Live Pulse Glow */}
          <div className="inline-flex items-center space-x-2.5 bg-blue-950/80 border border-blue-400/40 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-blue-200 backdrop-blur-md shadow-lg shadow-blue-950/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sàn Tuyển Dụng Freelancer Uy Tín Việt Nam — Cọc Escrow Qua Cổng VNPAY</span>
          </div>

          {/* Headline with High-Impact Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Đăng Tin Tuyển Dụng
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-md">
              Thuê Freelancer Năng Lực Cao
            </span>
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 bg-clip-text text-transparent drop-shadow-md">
              Thanh Toán An Toàn Escrow
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal drop-shadow">
            Nơi Nhà tuyển dụng đăng dự án để tìm kiếm nhân sự lập trình, thiết kế, video chuyên nghiệp. Ứng viên nộp báo giá kèm Portfolio thực tế. Toàn bộ tiền cọc được phong tỏa an toàn tại Escrow VNPAY và chỉ giải ngân khi hoàn tất nghiệm thu.
          </p>

          {/* Frosted Glass Search Box with Accent Ring */}
          <div className="space-y-3">
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2.5 bg-slate-900/80 p-2.5 rounded-3xl border border-white/25 backdrop-blur-2xl shadow-2xl ring-2 ring-blue-500/20 focus-within:ring-blue-400 transition-all"
            >
              <div className="flex-1 flex items-center px-4 w-full">
                <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Tìm kiếm ứng viên hoặc dự án (ReactJS, Figma, Flutter, TikTok Ads)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <span>Tìm Kiếm Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Search Tag Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-300">
              <span className="text-slate-400 font-semibold mr-1">🔥 Tìm nhanh:</span>
              {['Flutter App', 'Figma UI/UX', 'ReactJS', 'TikTok Ads', 'Python AI', 'Branding'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTag(tag)}
                  className="bg-white/10 hover:bg-white/20 hover:text-cyan-300 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md transition-all font-medium cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to="/create-project"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-900/40 transition-all flex items-center gap-2 group transform hover:-translate-y-0.5"
            >
              <Briefcase className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Đăng Tin Tuyển Dụng Ngay</span>
            </Link>
            <Link
              to="/freelancers"
              className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/25 backdrop-blur-xl transition-all flex items-center gap-2 shadow-lg hover:border-cyan-400/50"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Xem Hồ Sơ & Portfolio Ứng Viên</span>
            </Link>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-black text-white">5,000+</div>
              <div className="text-[11px] text-slate-400 font-medium">Freelancer Đã eKYC</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">Cọc Tạm Giữ Escrow</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">99.8%</div>
              <div className="text-[11px] text-slate-400 font-medium">Hài Lòng Nghiệm Thu</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl sm:text-2xl font-black text-amber-400">24/7</div>
              <div className="text-[11px] text-slate-400 font-medium">Rút Tiền Napas Tức Thì</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Top Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2 hover:border-blue-300 transition-all">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}>
                {c.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">{c.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{c.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Escrow & VNPay 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quy Trình Hợp Tác Tuyển Dụng & Bảo Đảm Escrow VNPAY
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            Mô hình sàn minh bạch loại bỏ hoàn toàn rủi ro bùng tiền, trễ hạn hoặc làm sai cam kết.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Đăng Bài Tuyển Dụng',
              desc: 'Nhà tuyển dụng tạo dự án với mô tả chi tiết, kỹ năng yêu cầu và ngân sách dự kiến.',
              icon: Briefcase,
              color: 'text-blue-600 bg-blue-50'
            },
            {
              step: '02',
              title: 'Freelancer Nộp Proposal',
              desc: 'Ứng viên gửi báo giá, thời hạn bàn giao, giải pháp thực hiện kèm link Portfolio chứng minh năng lực.',
              icon: UserCheck,
              color: 'text-indigo-600 bg-indigo-50'
            },
            {
              step: '03',
              title: 'Ký Hợp Đồng & Nạp Cọc VNPAY',
              desc: 'Nhà tuyển dụng chấp nhận báo giá và nạp 100% tiền cọc vào Ví Tạm Giữ Escrow qua cổng VNPAY.',
              icon: CreditCard,
              color: 'text-purple-600 bg-purple-50'
            },
            {
              step: '04',
              title: 'Nghiệm Thu & Giải Ngân',
              desc: 'Freelancer nộp sản phẩm. Nhà tuyển dụng kiểm tra, yêu cầu sửa đổi hoặc nghiệm thu để giải ngân tiền.',
              icon: ShieldCheck,
              color: 'text-emerald-600 bg-emerald-50'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative hover:border-blue-300 transition-all"
              >
                <div className="text-[10px] font-mono font-extrabold text-slate-400">{item.step}</div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Open Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span>Dự Án Tuyển Dụng Mới Nhất Đang Mở</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Các dự án đang nhận hồ sơ báo giá từ Freelancer.</p>
          </div>

          <Link
            to="/projects"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Xem tất cả dự án</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((proj) => (
            <div
              key={proj.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-blue-100">
                    {proj.category}
                  </span>
                  <span className="text-[11px] text-slate-400">Hạn chót: {proj.deadline}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base line-clamp-1">{proj.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-1">
                  {proj.requiredSkills.map((sk) => (
                    <span key={sk} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 text-[11px]">Ngân sách: </span>
                  <span className="font-extrabold text-blue-700 text-sm">{proj.budget.toLocaleString('vi-VN')} đ</span>
                </div>

                <Link
                  to="/projects"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
                >
                  Nộp Báo Giá ({proj.proposalsCount})
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Top Rated Freelancer Talents Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>Ứng Viên Top Rated & Portfolio Năng Lực</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Freelancer có điểm TalentCredit xuất sắc, sẵn sàng nhận dự án.</p>
          </div>

          <Link
            to="/freelancers"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Khám phá tất cả hồ sơ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freelancers.slice(0, 3).map((free) => (
            <div
              key={free.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={free.avatar}
                    alt={free.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 ring-2 ring-blue-500/20"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{free.name}</h3>
                    <p className="text-[11px] text-blue-600 font-semibold line-clamp-1">{free.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{free.rating} ({free.reviewCount} đánh giá)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{free.bio}"
                </p>

                {free.portfolioUrl && (
                  <a
                    href={free.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                  >
                    <span>Xem link Portfolio cá nhân</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <Link
                to="/freelancers"
                className="w-full text-center py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all block"
              >
                Xem Hồ Sơ & Mời Báo Giá
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
