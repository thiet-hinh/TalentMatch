import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import type { Order } from '../types';
import {
  Briefcase,
  Award,
  Upload,
  ArrowUpRight,
  UserCheck,
  ExternalLink,
  Edit3,
  Send,
  Save,
  Wallet,
  Plus,
  X,
  Tag,
  Sparkles,
  Check
} from 'lucide-react';

const PRESET_SKILLS = [
  { name: 'ReactJS', category: 'dev' },
  { name: 'TypeScript', category: 'dev' },
  { name: 'Node.js', category: 'dev' },
  { name: 'Next.js', category: 'dev' },
  { name: 'Vue.js', category: 'dev' },
  { name: 'Flutter', category: 'dev' },
  { name: 'React Native', category: 'dev' },
  { name: 'Python', category: 'dev' },
  { name: 'PHP / Laravel', category: 'dev' },
  { name: 'Golang', category: 'dev' },
  { name: 'Docker / DevOps', category: 'dev' },
  { name: 'Tailwind CSS', category: 'dev' },
  
  { name: 'UI/UX Design', category: 'design' },
  { name: 'Figma', category: 'design' },
  { name: 'Adobe Photoshop', category: 'design' },
  { name: 'Adobe Illustrator', category: 'design' },
  { name: 'Adobe Premiere', category: 'design' },
  { name: 'After Effects', category: 'design' },
  { name: '3D Blender', category: 'design' },
  
  { name: 'SEO Content', category: 'marketing' },
  { name: 'Facebook Ads', category: 'marketing' },
  { name: 'Google Ads', category: 'marketing' },
  { name: 'TikTok Creator', category: 'marketing' },
  { name: 'Copywriting', category: 'marketing' },
  
  { name: 'AI Prompt Engineer', category: 'ai' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'Data Analysis', category: 'ai' },
  { name: 'Chatbot NLP', category: 'ai' },
];

export const FreelancerDashboard: React.FC = () => {
  const {
    orders,
    proposals,
    projects,
    currentUser,
    freelancers,
    deliverWork,
    updateFreelancerBioAndPortfolio,
    openWithdrawModal
  } = useDemo();

  const [activeTab, setActiveTab] = useState<'orders' | 'proposals' | 'profile'>('orders');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDeliverModal, setShowDeliverModal] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [demoUrl, setDemoUrl] = useState('https://demo-project.vercel.app');
  const [fileName, setFileName] = useState('SourceCode_Final_Deliverable_v1.0.zip');

  // Find freelancer profile
  const myProfile =
    freelancers.find((f) => f.userId === currentUser.id || f.name === currentUser.name) ||
    freelancers[0];

  // Profile Edit States
  const [bio, setBio] = useState(myProfile?.bio || currentUser.bio || '');
  const [portfolioUrl, setPortfolioUrl] = useState(myProfile?.portfolioUrl || currentUser.portfolioUrl || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    myProfile?.skills && myProfile.skills.length > 0
      ? myProfile.skills
      : ['ReactJS', 'TypeScript', 'Node.js', 'Tailwind CSS']
  );
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'all' | 'dev' | 'design' | 'marketing' | 'ai'>('all');

  const myOrders = orders.filter(
    (o) => o.freelancerId === 'free-1' || o.freelancerId === 'free-2' || o.freelancerId === currentUser.id
  );
  const myProposals = proposals.filter((p) => p.freelancerId === 'free-1' || p.freelancerId === currentUser.id);

  const activeOrders = myOrders.filter((o) => o.status === 'ORDER_IN_PROGRESS' || o.status === 'REVISION_REQUESTED');
  const deliveredOrders = myOrders.filter((o) => o.status === 'DELIVERED');

  const handleOpenDeliver = (ord: Order) => {
    setSelectedOrder(ord);
    setShowDeliverModal(true);
  };

  const handleConfirmDeliver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    deliverWork(selectedOrder.id, deliveryNote, fileName, demoUrl);
    setShowDeliverModal(false);
    setDeliveryNote('');
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!selectedSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedSkills([...selectedSkills, trimmed]);
    }
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
  };

  const handleCustomSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(customSkillInput);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateFreelancerBioAndPortfolio({
      bio,
      portfolioUrl,
      skills: selectedSkills,
      portfolio: myProfile.portfolio
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Tài Khoản Freelancer Ứng Viên</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Góc Làm Việc Freelancer — {currentUser.name}
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Quản lý hợp đồng Escrow đang thực hiện, bàn giao sản phẩm, theo dõi thu nhập và cập nhật Portfolio.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl text-right">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Điểm Uy Tín TalentCredit:</div>
            <div className="text-base font-extrabold text-blue-700 flex items-center justify-end gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{myProfile.talentCreditScore} pts ({myProfile.talentCreditBadge})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500">Đơn Hàng Đang Thực Hiện</div>
          <div className="text-3xl font-extrabold text-blue-700">{activeOrders.length}</div>
          <div className="text-[11px] text-slate-400">Tiền Escrow đã được Employer nạp cọc 100%</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500">Chờ Khách Nghiệm Thu</div>
          <div className="text-3xl font-extrabold text-amber-600">{deliveredOrders.length}</div>
          <div className="text-[11px] text-amber-600 font-semibold">Đếm ngược 72h tự động giải ngân</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500">Số Dư Khả Dụng Trong Ví</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{(currentUser.balance || 0).toLocaleString('vi-VN')} đ</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Thu nhập hoàn thành sau trừ 10% phí sàn</div>
          </div>
          <button
            onClick={openWithdrawModal}
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rút Tiền Về Ngân Hàng (24/7)</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-6 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'orders'
              ? 'border-blue-600 text-blue-600 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Hợp Đồng Đang Nhận ({myOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('proposals')}
          className={`py-3 px-6 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'proposals'
              ? 'border-blue-600 text-blue-600 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Báo Giá Đã Gửi ({myProposals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-6 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Cập Nhật Bio & Portfolio Cá Nhân</span>
        </button>
      </div>

      {/* TAB 1: ORDERS LIST */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-xs">
          <h2 className="font-extrabold text-slate-900 text-lg flex items-center">
            <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
            <span>Danh Sách Hợp Đồng Dự Án Escrow Của Bạn</span>
          </h2>

          {myOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">Chưa có hợp đồng nào.</div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/40"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-slate-500">{ord.orderNumber}</span>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          ord.status === 'ORDER_IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-800'
                            : ord.status === 'DELIVERED'
                            ? 'bg-amber-100 text-amber-800'
                            : ord.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <Link to={`/orders/${ord.id}`} className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors block">
                      {ord.serviceTitle}
                    </Link>

                    <div className="text-xs text-slate-600">
                      Nhà tuyển dụng: <span className="font-semibold text-slate-800">{ord.employerName}</span> | Tiền thực nhận (90%): <span className="font-extrabold text-emerald-600">{ord.freelancerPayoutAmount.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    {ord.status === 'ORDER_IN_PROGRESS' && (
                      <button
                        onClick={() => handleOpenDeliver(ord)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Nộp Bài Bàn Giao</span>
                      </button>
                    )}

                    {ord.status === 'REVISION_REQUESTED' && (
                      <button
                        onClick={() => handleOpenDeliver(ord)}
                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Nộp Lại Bản Sửa</span>
                      </button>
                    )}

                    <Link
                      to={`/orders/${ord.id}`}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1"
                    >
                      <span>Chi Tiết Hợp Đồng</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROPOSALS SENT */}
      {activeTab === 'proposals' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-xs">
          <h2 className="font-extrabold text-slate-900 text-lg flex items-center">
            <Send className="w-5 h-5 text-blue-600 mr-2" />
            <span>Đề Xuất Báo Giá Đã Gửi Cho Dự Án Tuyển Dụng</span>
          </h2>

          <div className="space-y-4">
            {myProposals.map((prop) => {
              const targetProj = projects.find((p) => p.id === prop.projectId);
              return (
                <div key={prop.id} className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{targetProj?.title || 'Dự án tuyển dụng'}</span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md ${
                      prop.status === 'ACCEPTED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {prop.status === 'ACCEPTED' ? '✓ ĐÃ ĐƯỢC DUYỆT' : '⏳ ĐANG CHỜ DUYỆT'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-600">
                    <div>Mức giá bạn chào: <strong className="text-blue-700 font-extrabold">{prop.bidAmount.toLocaleString('vi-VN')} đ</strong></div>
                    <div>Thời hạn cam kết: <strong>{prop.estimatedDays} ngày</strong></div>
                    <div>Ngày gửi: {prop.createdAt}</div>
                  </div>

                  <p className="bg-white p-3 rounded-xl border border-slate-200 text-slate-700 italic">
                    "{prop.coverLetter}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: UPDATE BIO & PORTFOLIO */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              <span>Chỉnh Sửa Mô Tả Năng Lực, Kỹ Năng & Portfolio</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Thông tin này sẽ xuất hiện trên trang Danh sách Freelancer để Nhà tuyển dụng tìm kiếm, lọc theo kỹ năng và mời báo giá.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl text-xs">
            {/* Bio */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                1. Mô tả bản thân & Năng lực kinh nghiệm (Bio):
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Mô tả số năm kinh nghiệm, các loại sản phẩm bạn chuyên thực hiện (Landing Page, App Flutter, Video Ads...)..."
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white leading-relaxed"
                required
              />
            </div>

            {/* Portfolio Link */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                2. Liên kết Portfolio trực tiếp (Github / Behance / Website cá nhân / Figma):
              </label>
              <div className="relative">
                <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://github.com/your-username hoặc https://behance.net/your-portfolio"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Rich Skill Management */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="font-extrabold text-slate-900 text-sm">
                    3. Kỹ Năng Chuyên Môn Của Bạn ({selectedSkills.length})
                  </span>
                </div>

                {selectedSkills.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedSkills([])}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    Xóa tất cả kỹ năng
                  </button>
                )}
              </div>

              {/* Active Selected Skills Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-600">
                  Các kỹ năng đang hiển thị trong hồ sơ của bạn (Bấm ✕ để xóa):
                </div>
                {selectedSkills.length === 0 ? (
                  <div className="p-3 bg-white rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-xs italic">
                    Chưa có kỹ năng nào. Vui lòng chọn bên dưới hoặc tự nhập thêm.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-slate-200 min-h-[48px] items-center">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold shadow-2xs group hover:bg-blue-100 transition-all"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="w-4 h-4 rounded-full bg-blue-200/70 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Xóa kỹ năng này"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Skill Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700">
                  Thêm kỹ năng khác (Nhập tên kỹ năng và nhấn Enter hoặc nút Thêm):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={handleCustomSkillKeyDown}
                    placeholder="VD: Spring Boot, Solidity, Motion Graphics, Copywriting..."
                    className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(customSkillInput)}
                    disabled={!customSkillInput.trim()}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm</span>
                  </button>
                </div>
              </div>

              {/* Preset Skills Library */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Thư viện gợi ý kỹ năng nhanh (Bấm để thêm vào hồ sơ):</span>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-[10px]">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'dev', label: 'IT & Lập trình' },
                      { id: 'design', label: 'Thiết kế' },
                      { id: 'marketing', label: 'Marketing' },
                      { id: 'ai', label: 'AI & Data' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedSkillCategory(cat.id as any)}
                        className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                          selectedSkillCategory === cat.id
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_SKILLS.filter(
                    (p) => selectedSkillCategory === 'all' || p.category === selectedSkillCategory
                  ).map((preset) => {
                    const isAdded = selectedSkills.some(
                      (s) => s.toLowerCase() === preset.name.toLowerCase()
                    );
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          if (isAdded) {
                            handleRemoveSkill(preset.name);
                          } else {
                            handleAddSkill(preset.name);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                        <span>{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Thông Tin Hồ Sơ & Kỹ Năng</span>
            </button>
          </form>
        </div>
      )}

      {/* Deliver Work Modal */}
      {showDeliverModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleConfirmDeliver} className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2 text-blue-700 font-bold text-base">
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Nộp Sản Phẩm Bàn Giao (Deliver Work)</span>
              </div>
              <button type="button" onClick={() => setShowDeliverModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="font-bold text-slate-900 text-sm">{selectedOrder.serviceTitle}</div>
                <div className="text-slate-600 mt-0.5">Khách hàng: <strong>{selectedOrder.employerName}</strong></div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Tên file bàn giao đính kèm:</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Link Demo sản phẩm chạy thực tế (tùy chọn):</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://demo-project.vercel.app"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Ghi chú hướng dẫn nghiệm thu cho khách hàng:</label>
                <textarea
                  rows={4}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Ghi rõ hướng dẫn cài đặt, tài khoản demo hoặc nội dung đã hoàn thiện theo Scope of Work..."
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                ⏱️ Sau khi nộp bài, hệ thống sẽ kích hoạt bộ đếm ngược <strong>72 giờ (3 ngày)</strong>. Nếu khách hàng không phản hồi hoặc không khiếu nại, tiền Escrow sẽ tự động được giải ngân vào tài khoản của bạn.
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeliverModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md"
              >
                Xác Nhận Nộp Bài Bàn Giao
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
