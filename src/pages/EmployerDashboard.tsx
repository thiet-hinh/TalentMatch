import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import type { Order } from '../types';
import {
  Briefcase,
  CheckCircle2,
  RotateCcw,
  PlusCircle,
  ArrowUpRight,
  AlertCircle,
  Star,
  ShieldCheck,
  CreditCard,
  Wallet
} from 'lucide-react';
import { ReviewModal } from '../components/common/ReviewModal';

export const EmployerDashboard: React.FC = () => {
  const {
    orders,
    projects,
    proposals,
    acceptProposal,
    acceptDelivery,
    requestRevision,
    submitReview,
    currentUser,
    openWithdrawModal,
    openVNPayModal
  } = useDemo();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewTargetOrder, setReviewTargetOrder] = useState<Order | null>(null);
  const [revisionNote, setRevisionNote] = useState('');

  const myOrders = orders.filter((o) => o.employerId === currentUser.id || o.employerId === 'usr-emp-1');
  const myProjects = projects.filter((p) => p.employerId === currentUser.id || p.employerId === 'usr-emp-1');

  const pendingProposals = proposals.filter((prop) =>
    myProjects.some((p) => p.id === prop.projectId) && prop.status === 'PENDING'
  );

  const handleOpenAccept = (ord: Order) => {
    setSelectedOrder(ord);
    setShowAcceptModal(true);
  };

  const handleConfirmAccept = () => {
    if (!selectedOrder) return;
    const target = selectedOrder;
    acceptDelivery(target.id);
    setShowAcceptModal(false);
    
    // Automatically open Review Modal
    setReviewTargetOrder(target);
    setShowReviewModal(true);
  };

  const handleOpenRevision = (ord: Order) => {
    setSelectedOrder(ord);
    setShowRevisionModal(true);
  };

  const handleConfirmRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    requestRevision(selectedOrder.id, revisionNote);
    setShowRevisionModal(false);
    setRevisionNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tài Khoản Nhà Tuyển Dụng Doanh Nghiệp</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Bảng Điều Khiển Tuyển Dụng — {currentUser.name}
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Quản lý dự án đăng tuyển, duyệt báo giá ứng viên và nghiệm thu giải ngân qua cổng Escrow VNPAY.
          </p>
        </div>

        <Link
          to="/create-project"
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-3 rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Đăng Dự Án Mới</span>
        </Link>
      </div>

      {/* Financial & Project Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500">Số Dư Khả Dụng Trong Ví</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {(currentUser.balance || 0).toLocaleString('vi-VN')} đ
            </div>
            <div className="text-[11px] text-slate-400">Có thể dùng đăng tin hoặc rút về ngân hàng</div>
          </div>
          <button
            onClick={openWithdrawModal}
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rút Tiền Về Ngân Hàng</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500">Tiền Phong Tỏa Escrow VNPAY</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {(currentUser.escrowBalance || 0).toLocaleString('vi-VN')} đ
            </div>
            <div className="text-[11px] text-blue-600 font-semibold">Bảo đảm trong các hợp đồng đang chạy</div>
          </div>
          <button
            onClick={() =>
              openVNPayModal({
                amount: 5000000,
                orderNumber: `TM-VNP-${Date.now().toString().slice(-4)}`,
                orderTitle: 'Nạp thêm tiền ký quỹ Escrow VNPAY',
                onPaymentComplete: () => {}
              })
            }
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <span>Nạp Cọc Escrow VNPAY</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500">Dự Án Đang Mở Tuyển Dụng</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {myProjects.filter((p) => p.status === 'OPEN').length}
            </div>
            <div className="text-[11px] text-slate-400">Tổng cộng {myProjects.length} dự án đã tạo</div>
          </div>
          <Link
            to="/create-project"
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Tạo Thêm Dự Án Mới</span>
          </Link>
        </div>
      </div>

      {/* Action Needed Section: Proposals & Deliveries */}
      {pendingProposals.length > 0 && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-6 space-y-4 shadow-xs">
          <h2 className="font-extrabold text-blue-900 text-base flex items-center">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span>Đề Xuất Báo Giá Mới Cần Duyệt & Ký Hợp Đồng ({pendingProposals.length})</span>
          </h2>

          <div className="space-y-3">
            {pendingProposals.map((prop) => (
              <div key={prop.id} className="bg-white p-5 rounded-2xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <img src={prop.freelancerAvatar} alt={prop.freelancerName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{prop.freelancerName}</span>
                      <span className="text-slate-400 text-xs ml-2">• Điểm đánh giá: ⭐ {prop.freelancerRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-blue-700 font-extrabold text-sm">{prop.bidAmount.toLocaleString('vi-VN')} đ</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">Thời hạn cam kết: <strong>{prop.estimatedDays} ngày</strong></span>
                  </div>
                  <p className="text-slate-600 text-xs italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{prop.coverLetter}"
                  </p>
                </div>

                <button
                  onClick={() => acceptProposal(prop.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-3 rounded-xl transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Duyệt & Nạp Cọc VNPAY</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Orders List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-xs">
        <h2 className="font-extrabold text-slate-900 text-lg flex items-center">
          <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
          <span>Danh Sách Hợp Đồng Dự Án Đang Thực Hiện ({myOrders.length})</span>
        </h2>

        {myOrders.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">Chưa có hợp đồng nào.</div>
        ) : (
          <div className="space-y-4">
            {myOrders.map((ord) => (
              <div
                key={ord.id}
                className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-500">{ord.orderNumber}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        ord.status === 'DELIVERED'
                          ? 'bg-amber-100 text-amber-800'
                          : ord.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <Link to={`/orders/${ord.id}`} className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors block">
                    {ord.serviceTitle}
                  </Link>

                  <div className="text-xs text-slate-600">
                    Freelancer: <span className="font-semibold text-slate-800">{ord.freelancerName}</span> | Đặt cọc Escrow: <span className="font-bold text-blue-700">{ord.totalAmount.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  {ord.status === 'DELIVERED' && (
                    <>
                      <button
                        onClick={() => handleOpenRevision(ord)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all"
                      >
                        Yêu Cầu Sửa
                      </button>
                      <button
                        onClick={() => handleOpenAccept(ord)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Nghiệm Thu</span>
                      </button>
                    </>
                  )}

                  {ord.status === 'COMPLETED' && (
                    <button
                      onClick={() => {
                        setReviewTargetOrder(ord);
                        setShowReviewModal(true);
                      }}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Đánh Giá Review</span>
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

      {/* Accept Work Modal */}
      {showAcceptModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-base">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>Xác Nhận Nghiệm Thu & Giải Ngân Escrow</span>
              </div>
              <button onClick={() => setShowAcceptModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-700">
                Bạn xác nhận bài bàn giao của <span className="font-bold text-slate-900">{selectedOrder.freelancerName}</span> đã đạt chuẩn yêu cầu dự án?
              </p>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1 text-emerald-900">
                <div>Số tiền Escrow sẽ được giải ngân: <span className="font-extrabold text-sm">{selectedOrder.freelancerPayoutAmount.toLocaleString('vi-VN')} đ</span></div>
                <div className="text-[11px] text-emerald-700">Phí sàn môi giới 10%: {selectedOrder.platformFee.toLocaleString('vi-VN')} đ</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all text-xs"
              >
                Xem Lại
              </button>
              <button
                onClick={handleConfirmAccept}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md"
              >
                Đồng Ý Nghiệm Thu & Đánh Giá
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revision Modal */}
      {showRevisionModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleConfirmRevision} className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2 text-amber-700 font-bold text-base">
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <span>Yêu Cầu Chỉnh Sửa Bài (Revision)</span>
              </div>
              <button type="button" onClick={() => setShowRevisionModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-700">
                Số lần sửa còn lại: <span className="font-bold text-amber-700">{selectedOrder.maxRevisionsAllowed - selectedOrder.revisionCount} lần</span>
              </p>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Mô tả cụ thể các điểm cần Freelancer chỉnh sửa:</label>
                <textarea
                  rows={4}
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Ghi rõ chi tiết lỗi hoặc điểm chưa ưng ý để Freelancer sửa..."
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md"
              >
                Gửi Yêu Cầu Chỉnh Sửa
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewTargetOrder && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          order={reviewTargetOrder}
          onSubmitReview={submitReview}
        />
      )}

    </div>
  );
};
