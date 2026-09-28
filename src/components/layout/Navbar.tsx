import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  PlusCircle,
  LayoutDashboard,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  LogIn,
  LogOut,
  Shield,
  CreditCard,
  UserCheck,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  Wallet,
  Briefcase,
  Bell,
  CheckCheck,
  ArrowRight,
  Clock,
  CircleDollarSign,
  FileCheck2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    users,
    openAuthModal,
    logout,
    openVNPayModal,
    openUserProfileModal,
    openWithdrawModal,
    switchUserById,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useDemo();

  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [testAccountsOpen, setTestAccountsOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const testMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (testMenuRef.current && !testMenuRef.current.contains(event.target as Node)) {
        setTestAccountsOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Filter notifications for current user
  const userNotifications = notifications.filter(
    (n) => n.userId === currentUser.id || n.userId === 'all'
  );

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'ESCROW':
        return <CircleDollarSign className="w-4 h-4 text-emerald-600" />;
      case 'PROPOSAL':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'CONTRACT':
        return <FileCheck2 className="w-4 h-4 text-indigo-600" />;
      case 'WITHDRAWAL':
        return <Wallet className="w-4 h-4 text-cyan-600" />;
      case 'REVIEW':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'SYSTEM':
      default:
        return <AlertCircle className="w-4 h-4 text-purple-600" />;
    }
  };

  const getNotifBg = (type: string) => {
    switch (type) {
      case 'ESCROW':
        return 'bg-emerald-50 border-emerald-200';
      case 'PROPOSAL':
        return 'bg-blue-50 border-blue-200';
      case 'CONTRACT':
        return 'bg-indigo-50 border-indigo-200';
      case 'WITHDRAWAL':
        return 'bg-cyan-50 border-cyan-200';
      case 'REVIEW':
        return 'bg-amber-50 border-amber-200';
      case 'SYSTEM':
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. Logo Brand & Main Links */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo_talentMatch.png"
                alt="TalentMatch Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Main Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-700">
              <Link
                to="/projects"
                className={`py-2 border-b-2 transition-all flex items-center gap-1.5 ${
                  isActive('/projects')
                    ? 'text-blue-600 border-blue-600 font-extrabold'
                    : 'border-transparent text-slate-600 hover:text-blue-600'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Dự Án Tuyển Dụng</span>
              </Link>

              <Link
                to="/freelancers"
                className={`py-2 border-b-2 transition-all flex items-center gap-1.5 ${
                  isActive('/freelancers')
                    ? 'text-blue-600 border-blue-600 font-extrabold'
                    : 'border-transparent text-slate-600 hover:text-blue-600'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Hồ Sơ Freelancer</span>
              </Link>

              <button
                onClick={() =>
                  openVNPayModal({
                    amount: 5000000,
                    orderNumber: 'TM-2026-DEMO',
                    orderTitle: 'Mô phỏng Thanh toán Escrow qua Cổng VNPAY',
                    onPaymentComplete: () => {}
                  })
                }
                className="flex items-center space-x-1.5 text-emerald-800 text-[11px] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all font-bold cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cổng VNPAY Escrow</span>
              </button>
            </nav>
          </div>

          {/* 2. Right Side Controls */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Quick Test Accounts Switcher Dropdown */}
            <div className="relative" ref={testMenuRef}>
              <button
                onClick={() => setTestAccountsOpen(!testAccountsOpen)}
                className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all border border-slate-200 cursor-pointer"
                title="Đổi nhanh tài khoản mẫu để test các vai trò"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden xl:inline">Test Vai Trò:</span>
                <span className="text-blue-700 font-extrabold truncate max-w-[100px]">
                  {currentUser.role === 'guest' ? 'Khách' : currentUser.name.split(' ').slice(-1)[0]}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${testAccountsOpen ? 'rotate-180' : ''}`} />
              </button>

              {testAccountsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Chọn Tài Khoản Mẫu Để Test
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-1.5 space-y-1 text-xs">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUserById(u.id);
                          setTestAccountsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                          currentUser.id === u.id ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-lg object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-slate-900 leading-tight">{u.name}</div>
                            <div className="text-[10px] text-slate-500 capitalize">{u.role} {u.accountStatus === 'SUSPENDED' && '• Bị khóa'}</div>
                          </div>
                        </div>
                        {u.emailVerified ? (
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">✓ Active</span>
                        ) : (
                          <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-bold">! Chưa xác thực</span>
                        )}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        logout();
                        setTestAccountsOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-rose-50 text-rose-700 transition-all font-bold cursor-pointer border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Đăng xuất (Chế độ Khách)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell Icon & Dropdown */}
            <div className="relative" ref={notifMenuRef}>
              <button
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-all border border-slate-200 cursor-pointer"
                title="Thông báo hệ thống"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-sm animate-pulse">
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                  </span>
                )}
              </button>

              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* Notification Header */}
                  <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <span className="font-extrabold text-slate-900 text-sm">Thông Báo</span>
                      {unreadNotificationsCount > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {unreadNotificationsCount} mới
                        </span>
                      )}
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Đọc tất cả</span>
                      </button>
                    )}
                  </div>

                  {/* Notification Items List */}
                  <div className="max-h-96 overflow-y-auto divide-y divide-slate-50 p-1">
                    {userNotifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
                        <p>Hiện không có thông báo nào mới</p>
                      </div>
                    ) : (
                      userNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            setNotificationDropdownOpen(false);
                            if (notif.link) {
                              navigate(notif.link);
                            }
                          }}
                          className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start space-x-3 ${
                            !notif.isRead
                              ? 'bg-blue-50/50 hover:bg-blue-100/60'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${getNotifBg(
                              notif.type
                            )}`}
                          >
                            {getNotifIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`text-xs truncate ${
                                  !notif.isRead
                                    ? 'font-extrabold text-slate-900'
                                    : 'font-semibold text-slate-700'
                                }`}
                              >
                                {notif.title}
                              </h4>
                              {!notif.isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 ml-2" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                            <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{notif.timeAgo || notif.createdAt}</span>
                              </span>
                              {notif.link && (
                                <span className="text-blue-600 font-bold flex items-center gap-0.5 group-hover:underline">
                                  <span>Xem chi tiết</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Notification Footer Link */}
                  {userNotifications.length > 0 && (
                    <div className="pt-2 px-3 border-t border-slate-100 text-center">
                      <button
                        onClick={() => {
                          setNotificationDropdownOpen(false);
                          if (currentUser.role === 'employer') {
                            navigate('/employer/dashboard');
                          } else if (currentUser.role === 'freelancer') {
                            navigate('/freelancer/dashboard');
                          } else if (currentUser.role === 'admin') {
                            navigate('/admin/dashboard');
                          } else {
                            navigate('/projects');
                          }
                        }}
                        className="w-full py-1.5 text-center text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Đến trung tâm quản lý hoạt động &rarr;
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Guest View: Login & Register Buttons */}
            {currentUser.role === 'guest' ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            ) : (
              /* Logged In: Interactive Avatar Profile Menu */
              <div className="relative pl-3 border-l border-slate-200" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 cursor-pointer"
                  title="Nhấn để xem thông tin cá nhân chi tiết"
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-2xl object-cover border border-slate-300 ring-2 ring-blue-500/20 shadow-xs"
                    />
                    {currentUser.isVerified && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="text-left text-xs hidden sm:block">
                    <div className="font-extrabold text-slate-900 line-clamp-1 max-w-[110px]">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-500 capitalize leading-tight">
                      {currentUser.role === 'employer' ? 'Nhà tuyển dụng' : currentUser.role === 'freelancer' ? 'Freelancer' : 'Admin'}
                    </div>
                  </div>

                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Interactive Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* Top User Card */}
                    <div className="px-4 pb-3 border-b border-slate-100 flex items-center space-x-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 ring-2 ring-blue-500/30"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-slate-900 text-sm truncate">{currentUser.name}</div>
                        <div className="text-slate-500 text-xs truncate">{currentUser.email || 'Chưa có email'}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {currentUser.emailVerified ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>Đã xác thực</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setUserDropdownOpen(false);
                                openAuthModal('verification');
                              }}
                              className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-full font-bold border border-amber-300 cursor-pointer"
                            >
                              <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                              <span>Xác thực ngay</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Balance Preview & Withdrawal CTA */}
                    <div className="p-3 mx-3 my-2 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between text-slate-600 mb-1">
                        <span className="flex items-center gap-1 font-semibold">
                          <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Số dư ví:</span>
                        </span>
                        <span className="font-black text-emerald-700">{(currentUser.balance || 0).toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px] mb-2">
                        <span>Cọc Escrow:</span>
                        <span className="font-bold text-blue-700">{(currentUser.escrowBalance || 0).toLocaleString('vi-VN')} đ</span>
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openWithdrawModal();
                        }}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Wallet className="w-3 h-3" />
                        <span>Rút tiền về ngân hàng</span>
                      </button>
                    </div>

                    {/* Menu Actions */}
                    <div className="px-2 space-y-1 text-xs font-semibold text-slate-700">
                      
                      {/* Open Detailed Profile Modal */}
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openUserProfileModal();
                        }}
                        className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all text-left cursor-pointer font-bold"
                      >
                        <UserIcon className="w-4 h-4 text-blue-600" />
                        <span>Xem Thông Tin Cá Nhân Chi Tiết</span>
                      </button>

                      {/* Go to role Dashboard */}
                      {currentUser.role === 'employer' && (
                        <>
                          <Link
                            to="/employer/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-500" />
                            <span>Dashboard Nhà Tuyển Dụng</span>
                          </Link>
                          <Link
                            to="/create-project"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-blue-700 transition-all font-bold"
                          >
                            <PlusCircle className="w-4 h-4 text-blue-600" />
                            <span>+ Đăng Dự Án Mới</span>
                          </Link>
                        </>
                      )}

                      {currentUser.role === 'freelancer' && (
                        <Link
                          to="/freelancer/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-500" />
                          <span>Góc Quản Lý Freelancer</span>
                        </Link>
                      )}

                      {currentUser.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-purple-700 font-bold"
                        >
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span>Cổng Quản Trị Admin</span>
                        </Link>
                      )}

                      {/* Logout Button */}
                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-700 transition-all text-left cursor-pointer font-bold"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Đăng Xuất Khỏi Tài Khoản</span>
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Mobile Menu Button & Notification */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Notification Button */}
            <button
              onClick={() => {
                if (currentUser.role === 'employer') {
                  navigate('/employer/dashboard');
                } else if (currentUser.role === 'freelancer') {
                  navigate('/freelancer/dashboard');
                } else if (currentUser.role === 'admin') {
                  navigate('/admin/dashboard');
                } else {
                  navigate('/projects');
                }
              }}
              className="relative p-1.5 rounded-xl border border-slate-200 text-slate-600"
              title="Thông báo"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {currentUser.role !== 'guest' ? (
              <button
                onClick={openUserProfileModal}
                className="p-1 rounded-xl border border-slate-200 cursor-pointer"
                title="Xem hồ sơ cá nhân"
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-lg object-cover" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-2.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Đăng nhập
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 text-xs animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 font-bold text-slate-700">
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="py-1">
              Dự Án Tuyển Dụng
            </Link>
            <Link to="/freelancers" onClick={() => setMobileMenuOpen(false)} className="py-1">
              Hồ Sơ Freelancer & Portfolio
            </Link>
            
            {currentUser.role === 'employer' && (
              <>
                <Link to="/employer/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-slate-800">
                  Dashboard Tuyển Dụng
                </Link>
                <Link to="/create-project" onClick={() => setMobileMenuOpen(false)} className="text-blue-600">
                  + Đăng Dự Án Mới
                </Link>
              </>
            )}

            {currentUser.role === 'freelancer' && (
              <Link to="/freelancer/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-blue-600">
                Dashboard Freelancer
              </Link>
            )}

            {currentUser.role === 'admin' && (
              <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-purple-600">
                Dashboard Quản Trị Admin
              </Link>
            )}

            {currentUser.role !== 'guest' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openUserProfileModal();
                }}
                className="text-left text-blue-700 font-bold py-1 flex items-center gap-1.5 cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>Xem Thông Tin Cá Nhân Chi Tiết</span>
              </button>
            )}

            {/* Quick Test Switcher for Mobile */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] font-extrabold text-slate-400 uppercase mb-2">Đổi tài khoản test:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {users.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUserById(u.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-[11px] text-left border ${
                      currentUser.id === u.id ? 'bg-blue-50 border-blue-300 font-bold' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="font-bold truncate">{u.name}</div>
                    <div className="text-[9px] text-slate-500 capitalize">{u.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Logout / Login in Mobile */}
            <div className="pt-2 border-t border-slate-100">
              {currentUser.role !== 'guest' ? (
                <button
                  onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                  className="w-full py-2.5 bg-rose-50 text-rose-700 font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất (Khách)</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-xl"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
