'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft, Package, AlertCircle, CheckCircle2, Camera, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { Spinner } from '@/components/ui/Spinner';
import { useGetProductReviewsQuery, useCreateReviewMutation } from '@/redux/features/review/reviewApi';
import { useAuth } from '@/hooks/useAuth';
import { Modal } from '@/components/ui/Modal';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading, loadProductById, selectedProduct, isLoadingDetail } = useProducts();
  const { addItem, isInCart, getItemQuantity } = useCart();

  const [activeImage, setActiveImage] = useState<string | null>(null);

  // AI Fit Advisor States
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [fitHeight, setFitHeight] = useState(170);
  const [fitWeight, setFitWeight] = useState(70);
  const [preferredFit, setPreferredFit] = useState<'slim' | 'regular' | 'oversized'>('regular');

  const getFtIn = (cm: number) => {
    const totalInches = Math.round(cm / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}"`;
  };
  const getLbs = (kg: number) => Math.round(kg * 2.20462);

  const calculateAIRecommendation = () => {
    let fitPoints = 0;
    if (preferredFit === 'slim') fitPoints = -5;
    if (preferredFit === 'oversized') fitPoints = 5;

    const score = (fitHeight - 170) * 0.2 + (fitWeight - 70) * 0.8 + fitPoints;
    
    let size = 'M';
    if (score < -10) size = 'S';
    else if (score < 5) size = 'M';
    else if (score < 18) size = 'L';
    else size = 'XL';

    const deviation = Math.abs(score);
    const confidence = Math.max(85, Math.min(99, 98 - deviation * 0.3));

    return { size, confidence: Math.round(confidence) };
  };

  const aiRec = calculateAIRecommendation();

  const { data: reviews = [], isLoading: reviewsLoading } = useGetProductReviewsQuery(id);
  const [createReview] = useCreateReviewMutation();
  const { isAuthenticated } = useAuth();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setReviewImages((prev) => [...prev, reader.result as string]);
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (idx: number) => {
    setReviewImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setIsSubmitting(true);
    try {
      await createReview({
        productId: id,
        rating: reviewRating,
        comment: reviewComment,
        images: reviewImages,
      }).unwrap();
      
      setReviewRating(5);
      setReviewComment('');
      setReviewImages([]);
      alert('Review submitted successfully!');
    } catch (err: any) {
      alert(err.data?.message || 'Failed to submit review. Note: You can only review each product once.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setActiveImage(null);
    loadProductById(id);
  }, [id, loadProductById]);

  const product = (selectedProduct?.id === id ? selectedProduct : null) || products.find((p) => p.id === id);

  if (isLoading || isLoadingDetail) {
    return (
      <div className="flex justify-center items-center py-40">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-white/20" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-white/40 mb-8 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link href={ROUTES.PRODUCTS}><Button>Back to Products</Button></Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);

  const displayImages: string[] = [];
  if (product.thumbnail) displayImages.push(product.thumbnail);
  if (product.hoverImage && !displayImages.includes(product.hoverImage)) displayImages.push(product.hoverImage);
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => {
      if (!displayImages.includes(img)) displayImages.push(img);
    });
  }

  const currentImage = activeImage || (displayImages.length > 0 ? displayImages[0] : '/images/placeholder.jpg');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/40 mb-8 overflow-hidden">
        <Link href={ROUTES.HOME} className="hover:text-white transition-colors flex-shrink-0">Home</Link>
        <span>/</span>
        <Link href={ROUTES.PRODUCTS} className="hover:text-white transition-colors flex-shrink-0">Products</Link>
        <span>/</span>
        <span className="text-white/70 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
            <Image 
              src={currentImage} 
              alt={product.name} 
              fill 
              className="object-contain transition-all duration-500" 
              priority
            />
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-6 left-6 z-10">
                <Badge variant="danger">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {displayImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    currentImage === img ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary">{product.category}</Badge>
              {product.isFeatured && <Badge variant="warning">Featured</Badge>}
            </div>
            <p className="text-sm text-amber-400 font-bold tracking-widest uppercase mb-2">{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-2" />
              <span className="text-white font-bold">{product.rating}</span>
            </div>
            <span className="text-white/40 text-sm">{product.reviewCount} verified reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-white tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-2xl text-white/30 line-through font-medium">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Description</h3>
            <p className="text-white/60 leading-relaxed text-sm">{product.description}</p>
          </div>

          {/* Size Selector for Clothing category */}
          {(product.category === 'Clothing' || product.category === 'clothing') && (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select Size</h3>
                <button
                  onClick={() => setIsAdvisorOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:text-amber-300 transition-colors bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20 shadow-md shadow-amber-500/5 group cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <span>📏 Ask AI Fit Advisor</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
            <Button
              size="xl"
              className="flex-1 shadow-lg shadow-amber-500/20"
              leftIcon={<ShoppingCart className="h-5 w-5" />}
              onClick={() => {
                addItem(product);
                if (product.category === 'Clothing' || product.category === 'clothing') {
                  alert(`${product.name} (Size ${selectedSize}) has been added to your cart!`);
                }
              }}
              disabled={product.stock === 0}
              variant={inCart ? 'success' : 'primary'}
            >
              {inCart ? `Add More (${cartQty})` : 'Add to Cart'}
            </Button>
            <Button size="xl" variant="secondary" className="px-6 border-white/20">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'On orders $100+' },
              { icon: Shield, label: 'Secure Payment', sub: '256-bit AES' },
              { icon: Package, label: 'Easy Returns', sub: '30-day window' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="p-4 rounded-2xl bg-white/3 border border-white/5">
                <Icon className="h-5 w-5 text-amber-400 mb-2" />
                <p className="text-xs font-bold text-white mb-0.5">{label}</p>
                <p className="text-[10px] text-white/40 uppercase font-medium">{sub}</p>
              </div>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-[10px] text-white/20 font-mono pt-4 border-t border-white/5">
            <span>SKU: {product.sku}</span>
            <span>STOCK: {product.stock > 0 ? product.stock : 'OUT'}</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 pt-10 border-t border-white/10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
            <p className="text-white/40 text-sm mt-1">What others are saying about {product.name}</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/3 border border-white/5 rounded-2xl p-5 md:px-8">
            <div className="text-center border-r border-white/10 pr-6">
              <p className="text-4xl font-extrabold text-white">{product.rating || 0}</p>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">Out of 5</p>
            </div>
            <div>
              <div className="flex text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
                ))}
              </div>
              <p className="text-xs text-white/50">{reviews.length} total reviews</p>
            </div>
          </div>
        </div>

        {/* Review list & Write Review layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviewsLoading ? (
              <div className="flex justify-center py-10"><Spinner size="md" /></div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 bg-white/3 border border-white/5 rounded-3xl">
                <p className="text-white/40 text-sm italic">No reviews yet for this product. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review: any) => (
                <div key={review._id || review.id} className="p-6 rounded-3xl bg-white/3 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold border border-amber-500/20">
                        {review.user?.name ? review.user.name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{review.user?.name || 'Anonymous User'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-white/30">•</span>
                          <span className="text-[10px] text-white/40">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {review.isVerified && (
                      <Badge variant="success" className="text-[9px] px-2 py-0.5 border border-green-500/20 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Verified Purchase
                      </Badge>
                    )}
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 pt-2">
                      {review.images.map((img: string, idx: number) => (
                        <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer">
                          <img src={img} alt="review attachment" className="object-cover w-full h-full hover:scale-105 transition-transform" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Write a Review Block */}
          <div>
            <div className="p-6 rounded-3xl bg-[#0D1428] border border-white/10 space-y-6 sticky top-24">
              <div>
                <h3 className="font-bold text-white text-lg">Write a Review</h3>
                <p className="text-xs text-white/40 mt-1">Share your experience with this product.</p>
              </div>

              {!isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-xs text-white/50 italic leading-relaxed">You must be logged in to leave a review.</p>
                  <Link href={ROUTES.LOGIN} className="block"><Button className="w-full" size="sm">Login to Review</Button></Link>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`h-6 w-6 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-white/10'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Your Review</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What did you think of the product?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 min-h-[100px] transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Image Attachments */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Photos</label>
                    <div className="flex flex-wrap gap-2 items-center">
                      {reviewImages.map((img, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                          <img src={img} alt="preview" className="object-cover w-full h-full" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-0.5 right-0.5 bg-black/70 hover:bg-red-500 rounded-full p-0.5 text-white cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      
                      {reviewImages.length < 3 && (
                        <button
                          type="button"
                          disabled={isUploading}
                          onClick={() => document.getElementById('review-file-input')?.click()}
                          className="w-12 h-12 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-amber-500/50 hover:bg-white/10 flex flex-col items-center justify-center text-white/40 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isUploading ? (
                            <Spinner size="sm" />
                          ) : (
                            <>
                              <Camera className="h-4 w-4" />
                              <span className="text-[8px] mt-0.5 font-bold">ADD</span>
                            </>
                          )}
                        </button>
                      )}
                      <input
                        id="review-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Submit Review
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Sizing Modal */}
      <Modal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        title="📏 AI-Powered Size & Fit Advisor"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 items-start">
            <span className="text-2xl">✨</span>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">Smart Fitting Engine Active</p>
              <p className="text-xs text-white/50 leading-relaxed">
                Adjust the sliders below to enter your physical metrics. Our custom statistical fit index calculates the optimal size based on customer purchase data and returns history.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Height Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase font-bold tracking-wider">
                <span className="text-white/60">Height</span>
                <span className="text-amber-400 font-mono">{fitHeight} cm / {getFtIn(fitHeight)}</span>
              </div>
              <input
                type="range"
                min="140"
                max="210"
                value={fitHeight}
                onChange={(e) => setFitHeight(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-white/5"
              />
            </div>

            {/* Weight Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase font-bold tracking-wider">
                <span className="text-white/60">Weight</span>
                <span className="text-amber-400 font-mono">{fitWeight} kg / {getLbs(fitWeight)} lbs</span>
              </div>
              <input
                type="range"
                min="40"
                max="130"
                value={fitWeight}
                onChange={(e) => setFitWeight(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-white/5"
              />
            </div>

            {/* Fit Preference Buttons */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-wider text-white/60">Preferred Fit</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'slim', label: 'Slim Fit', desc: 'Tight & Form-fitting', icon: '👕' },
                  { value: 'regular', label: 'Regular Fit', desc: 'Comfortable & Standard', icon: '👔' },
                  { value: 'oversized', label: 'Oversized', desc: 'Loose & Trendy', icon: '🧥' }
                ].map((fit) => (
                  <button
                    key={fit.value}
                    onClick={() => setPreferredFit(fit.value as any)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer hover:scale-[1.02] ${
                      preferredFit === fit.value
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md shadow-amber-500/5'
                        : 'bg-white/3 border-white/5 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">{fit.icon}</span>
                    <span className="text-xs font-bold text-white">{fit.label}</span>
                    <span className="text-[9px] text-white/40 font-medium leading-none mt-0.5">{fit.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendation Reveal */}
          <div className="bg-white/3 border border-white/5 rounded-2xl p-5 space-y-4 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[10px] font-bold uppercase tracking-widest animate-pulse">
              🛡️ {aiRec.confidence}% Fit Confidence
            </div>
            <div className="space-y-1">
              <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Recommended Size</p>
              <p className="text-4xl font-extrabold text-amber-400 tracking-tight">{aiRec.size}</p>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
              Our analysis matches you to **Size {aiRec.size}** for a perfect {preferredFit} fit.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 shadow-lg shadow-amber-500/15"
              onClick={() => {
                setSelectedSize(aiRec.size);
                setIsAdvisorOpen(false);
              }}
            >
              Apply Recommended Size ({aiRec.size})
            </Button>
            <Button
              variant="secondary"
              className="border-white/10"
              onClick={() => setIsAdvisorOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
