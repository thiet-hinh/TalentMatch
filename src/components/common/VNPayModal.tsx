import React, { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  CreditCard,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Lock,
  Clock
} from 'lucide-react';

interface VNPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderNumber?: string;
  orderTitle?: string;
  onSuccess: (transactionData: {
    transactionNo: string;
    bankCode: string;
    cardType: string;
    amount: number;
  }) => void;
}

export const VNPayModal: React.FC<VNPayModalProps> = ({
  isOpen,
  onClose,
  amount,
  orderNumber = 'TM-2026-VNPAY',
  orderTitle = 'Nạp cọc Hợp đồng Escrow TalentMatch',
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'atm' | 'visa'>('qr');
  const [selectedBank, setSelectedBank] = useState<string>('NCB');
  const [cardNumber, setCardNumber] = useState<string>('9704 1985 2619 1432');
  const [cardHolder, setCardHolder] = useState<string>('NGUYEN VAN A');
  const [issueDate, setIssueDate] = useState<string>('07/15');

  const [paymentStep, setPaymentStep] = useState<'FORM' | 'OTP' | 'PROCESSING' | 'SUCCESS'>('FORM');
  const [countdown, setCountdown] = useState<number>(900); // 15 mins

  useEffect(() => {
    if (!isOpen) {
      setPaymentStep('FORM');
      setCountdown(900);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulatePayment = () => {
    setPaymentStep('PROCESSING');
    setTimeout(() => {
      setPaymentStep('SUCCESS');
      setTimeout(() => {
        const transNo = `VNPAY-${Date.now().toString().slice(-8)}`;
        onSuccess({
          transactionNo: transNo,
          bankCode: activeTab === 'qr' ? 'VNPAYQR' : selectedBank,
          cardType: activeTab === 'qr' ? 'QR_CODE' : activeTab === 'atm' ? 'ATM_CARD' : 'VISA_CARD',
          amount
        });
      }, 1500);
    }, 2000);
  };

  const banks = [
    { code: 'NCB', name: 'NCB (Test Bank)', logo: '🏦' },
    { code: 'VCB', name: 'Vietcombank', logo: '🟢' },
    { code: 'TCB', name: 'Techcombank', logo: '🔴' },
    { code: 'MBB', name: 'MBBank', logo: '🔵' },
    { code: 'BIDV', name: 'BIDV', logo: '🔷' },
    { code: 'ACB', name: 'ACB Bank', logo: '🟦' },
    { code: 'VPB', name: 'VPBank', logo: '🟢' },
    { code: 'TPB', name: 'TPBank', logo: '🟣' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-6">
        
        {/* VNPay Header Bar */}
        <div className="bg-gradient-to-r from-red-700 via-rose-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white px-3 py-1 rounded-lg shadow-xs flex items-center">
              <span className="font-extrabold tracking-tighter text-blue-800 text-lg">VN</span>
              <span className="font-extrabold tracking-tighter text-red-600 text-lg">PAY</span>
              <span className="text-[10px] text-slate-500 font-bold ml-1 bg-slate-100 px-1 rounded">SANDBOX</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-white/90">Cổng Thanh Toán Quốc Gia</div>
              <div className="text-[10px] text-white/70">Bảo mật chuẩn PCI-DSS Level 1</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-[10px] text-white/80">Thời gian còn lại</div>
              <div className="text-xs font-mono font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(countdown)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Summary Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <div className="text-slate-500">Mã đơn hàng / Hợp đồng: <strong className="text-slate-900 font-mono">{orderNumber}</strong></div>
            <div className="text-slate-700 font-medium line-clamp-1">{orderTitle}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-500">Số tiền thanh toán:</div>
            <div className="text-lg font-extrabold text-red-600">{amount.toLocaleString('vi-VN')} đ</div>
          </div>
        </div>

        {/* PROCESSING VIEW */}
        {paymentStep === 'PROCESSING' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <h3 className="text-lg font-bold text-slate-800">Đang kết nối & xử lý giao dịch VNPAY...</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Hệ thống đang xác thực mã giao dịch với ngân hàng phát hành và khóa tiền cọc vào tài khoản Escrow. Vui lòng không đóng trình duyệt.
            </p>
          </div>
        )}

        {/* SUCCESS VIEW */}
        {paymentStep === 'SUCCESS' && (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Thanh Toán VNPAY Thành Công!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Số tiền <strong className="text-emerald-700 font-bold">{amount.toLocaleString('vi-VN')} đ</strong> đã được nạp an toàn vào <strong>Ví Tạm Giữ Escrow</strong> của Hợp đồng. Freelancer có thể bắt đầu công việc ngay lập tức!
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-sm mx-auto text-xs space-y-1 font-mono">
              <div>Mã chuẩn chi: <strong>VNPAY-2026-OK</strong></div>
              <div>Trạng thái: <span className="text-emerald-600 font-bold">ESCROW_FUNDED (00)</span></div>
              <div>Thời gian: {new Date().toLocaleString('vi-VN')}</div>
            </div>
          </div>
        )}

        {/* PAYMENT FORMS */}
        {paymentStep === 'FORM' && (
          <div className="p-6 space-y-6">
            
            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-4">
              <button
                onClick={() => setActiveTab('qr')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  activeTab === 'qr'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">VNPAY-QR</div>
                  <div className="text-[10px] text-slate-500">Quét qua App Ngân hàng</div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('atm')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  activeTab === 'atm'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Thẻ ATM Nội Địa</div>
                  <div className="text-[10px] text-slate-500">Internet Banking (40+ bank)</div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('visa')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  activeTab === 'visa'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-rose-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">Thẻ Quốc Tế</div>
                  <div className="text-[10px] text-slate-500">Visa / Master / JCB</div>
                </div>
              </button>
            </div>

            {/* TAB 1: VNPAY-QR */}
            {activeTab === 'qr' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl border border-slate-300 shadow-sm flex flex-col items-center justify-center relative group">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VNPAY_ESCROW_TALENTMATCH_DEMO_2026"
                      alt="VNPay QR Code"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <span className="text-xs bg-white text-blue-800 font-bold px-2 py-1 rounded shadow">Mã QR Demo</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Mở ứng dụng Mobile Banking của bạn và chọn <strong>Quét mã QR</strong>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <div className="font-bold text-slate-800 text-sm">Hướng dẫn thanh toán qua VNPay-QR:</div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                      <li>Mở App ngân hàng (VCB, MB, Techcombank, BIDV, Agribank...)</li>
                      <li>Chọn chức năng <strong>Quét QR (QR Pay)</strong></li>
                      <li>Quét mã QR bên cạnh và xác nhận số tiền <strong>{amount.toLocaleString('vi-VN')} đ</strong></li>
                      <li>Tiền sẽ được nạp trực tiếp vào <strong>Ví Tạm Giữ Escrow</strong></li>
                    </ol>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hệ thống Escrow tự động phong tỏa tiền cọc và chỉ giải ngân sau khi bạn nghiệm thu sản phẩm.</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>[ Mô Phỏng Quét QR & Thanh Toán Ngay ]</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: ATM NỘI ĐỊA */}
            {activeTab === 'atm' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Chọn ngân hàng phát hành:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {banks.map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setSelectedBank(b.code)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          selectedBank === b.code
                            ? 'border-blue-600 bg-blue-50 font-bold text-blue-900 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="text-base">{b.logo}</div>
                        <div className="text-[11px] mt-0.5 font-semibold">{b.code}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 text-blue-900 text-[11px] space-y-0.5">
                  <div className="font-bold">💡 Thẻ Test VNPAY Sandbox có sẵn:</div>
                  <div>Số thẻ: <span className="font-mono font-bold">9704 1985 2619 1432</span> | Tên: <span className="font-bold">NGUYEN VAN A</span> | Ngày: <span className="font-bold">07/15</span></div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Số thẻ ATM:</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-bold focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tên chủ thẻ (không dấu):</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ngày phát hành (MM/YY):</label>
                      <input
                        type="text"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-bold focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Lock className="w-4 h-4" />
                  <span>Xác Nhận & Nạp Tiền Escrow ({amount.toLocaleString('vi-VN')} đ)</span>
                </button>
              </div>
            )}

            {/* TAB 3: THẺ QUỐC TẾ */}
            {activeTab === 'visa' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                  Hỗ trợ các loại thẻ Visa, MasterCard, JCB phát hành trong nước và quốc tế. Phí giao dịch được miễn phí cho thanh toán Escrow.
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Số thẻ Visa/MasterCard:</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      defaultValue="4111 2222 3333 4444"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-bold focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hạn sử dụng (MM/YY):</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-bold focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mã CVV/CVC:</label>
                      <input
                        type="password"
                        defaultValue="888"
                        maxLength={3}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-bold focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Lock className="w-4 h-4" />
                  <span>Thanh Toán An Toàn Visa/MasterCard</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
