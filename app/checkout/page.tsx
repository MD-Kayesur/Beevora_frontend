'use client';
import { useState } from 'react';
import { CreditCard, MapPin, CheckCircle, Loader2, MessageCircle, Send, MessageSquare, Phone } from 'lucide-react';
import { CartSummary } from '@/components/cart/CartSummary';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useCreateOrderMutation } from '@/redux/features/order/orderApi';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { toast } from 'react-hot-toast';

type Step = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cash_on_delivery'>('card');
  const { items, summary, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

  const [shippingData, setShippingData] = useState({
    fullName: '', phone: '', street: '', city: '', state: '', zipCode: '', country: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactLinks, setContactLinks] = useState({
    whatsapp: '',
    telegram: '',
    messenger: '',
    call: ''
  });

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      return;
    }

    try {
      // Concatenate fields into a single string as required by the backend
      const addressString = `${shippingData.street}, City: ${shippingData.city}, Phone: ${shippingData.phone}`;

      const orderPayload = {
        items: items.map((item: any) => ({
          product: item.product.id || item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: summary.total,
        shippingAddress: addressString,
        paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid'
      };

      const response = await createOrder(orderPayload).unwrap();
      
      if (response.success) {
        toast.success('Order placed successfully!');
        
        // Generate Contact Links
        const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801928294516';
        const tgUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || 'beevora';
        const fbPage = process.env.NEXT_PUBLIC_MESSENGER_PAGE || 'beevora';
        const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+8801928294516';

        const itemLine = items.map((item: any) => `- ${item.product.name} (x${item.quantity})`).join('%0A');
        const messageText = `Hello Beevora! I just placed an order.%0A%0A*Order Details:*%0AOrder ID: ${response.data._id}%0AItems:%0A${itemLine}%0A%0A*Total:* ${formatPrice(summary.total)}%0A%0A*Address:* %0A${addressString}`;
        
        setContactLinks({
          whatsapp: `https://wa.me/${waNumber}?text=${messageText}`,
          telegram: `https://t.me/${tgUsername}?text=${messageText}`,
          messenger: `https://m.me/${fbPage}`,
          call: `tel:${phone}`
        });

        // Clear Cart
        await clearCart();
        
        // Show contact modal and set confirmation step
        setIsModalOpen(true);
        setStep('confirmation');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to place order');
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No items in cart</h2>
        <Link href={ROUTES.PRODUCTS}><Button>Browse Products</Button></Link>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-in">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Order Placed!</h1>
        <p className="text-white/50 mb-8">Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <div className="flex gap-3 justify-center mb-8">
          <Link href={ROUTES.USER_ORDERS}><Button variant="secondary">View Orders</Button></Link>
          <Link href={ROUTES.PRODUCTS}><Button>Continue Shopping</Button></Link>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Need Help with your Order?</h3>
          <p className="text-white/50 mb-6 text-sm">Send us a message on your preferred platform to confirm your order instantly.</p>
          <Button onClick={() => setIsModalOpen(true)} className="w-full">
            Contact Support
          </Button>
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Send Order Details"
        >
          <div className="space-y-4">
            <p className="text-white/70 text-sm mb-4">
              Choose a platform to send your order details for faster processing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => window.open(contactLinks.whatsapp, '_blank')}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 border-none"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
              <Button 
                onClick={() => window.open(contactLinks.telegram, '_blank')}
                className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white flex items-center justify-center gap-2 border-none"
              >
                <Send className="h-5 w-5" />
                Telegram
              </Button>
              <Button 
                onClick={() => window.open(contactLinks.messenger, '_blank')}
                className="w-full bg-[#0084FF] hover:bg-[#0074e0] text-white flex items-center justify-center gap-2 border-none"
              >
                <MessageSquare className="h-5 w-5" />
                Messenger
              </Button>
              <Button 
                onClick={() => window.location.href = contactLinks.call}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2 border-none"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10">
        {(['shipping', 'payment'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${step === s ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-white/40 border-white/20'}`}>
              {i + 1}
            </div>
            <span className={`text-sm font-medium capitalize ${step === s ? 'text-white' : 'text-white/40'}`}>{s}</span>
            {i < 1 && <div className="w-16 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Form Area */}
        <div className="bg-[#0D1428] border border-white/10 rounded-2xl p-6 space-y-5">
          {step === 'shipping' && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={shippingData.fullName} onChange={(e) => setShippingData(p => ({ ...p, fullName: e.target.value }))} placeholder="John Doe" />
                <Input label="Phone" value={shippingData.phone} onChange={(e) => setShippingData(p => ({ ...p, phone: e.target.value }))} placeholder="+1 234 567 8900" />
                <Input label="Street Address" value={shippingData.street} onChange={(e) => setShippingData(p => ({ ...p, street: e.target.value }))} placeholder="123 Main St" className="sm:col-span-2" />
                <Input label="City" value={shippingData.city} onChange={(e) => setShippingData(p => ({ ...p, city: e.target.value }))} placeholder="New York" />
                <Input label="State" value={shippingData.state} onChange={(e) => setShippingData(p => ({ ...p, state: e.target.value }))} placeholder="NY" />
                <Input label="ZIP Code" value={shippingData.zipCode} onChange={(e) => setShippingData(p => ({ ...p, zipCode: e.target.value }))} placeholder="10001" />
                <Input label="Country" value={shippingData.country} onChange={(e) => setShippingData(p => ({ ...p, country: e.target.value }))} placeholder="United States" />
              </div>
              <Button className="w-full mt-4" size="lg" onClick={() => setStep('payment')}>
                Continue to Payment
              </Button>
            </>
          )}

          {step === 'payment' && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Payment Method</h2>
              </div>
              <div className="space-y-3">
                {[
                  { value: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
                  { value: 'paypal', label: 'PayPal', sub: 'Pay securely with PayPal' },
                  { value: 'cash_on_delivery', label: 'Cash on Delivery', sub: 'Pay when you receive' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPaymentMethod(opt.value as typeof paymentMethod)}
                    className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${paymentMethod === opt.value ? 'border-amber-500/50 bg-amber-500/10' : 'border-white/10 bg-white/3 hover:border-white/20'}`}
                  >
                    <p className="font-semibold text-white text-sm">{opt.label}</p>
                    <p className="text-xs text-white/40 mt-0.5">{opt.sub}</p>
                  </button>
                ))}
              </div>
              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <Input label="Card Number" placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Expiry" placeholder="MM / YY" />
                    <Input label="CVV" placeholder="•••" />
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <Button variant="secondary" className="flex-1" onClick={() => setStep('shipping')} disabled={isPlacingOrder}>Back</Button>
                <Button 
                  className="flex-1" 
                  size="lg" 
                  onClick={handleSubmit} 
                  disabled={isPlacingOrder || items.length === 0}
                  leftIcon={isPlacingOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                >
                  {isPlacingOrder ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <CartSummary showCheckoutButton={false} />
      </div>
    </div>
  );
}
