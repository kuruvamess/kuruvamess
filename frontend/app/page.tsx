import HeroSection from '@/components/home/HeroSection';
import FeaturedDishes from '@/components/home/FeaturedDishes';
import AboutSection from '@/components/home/AboutSection';
import QuickInfo from '@/components/home/QuickInfo';
import CustomerReviews from '@/components/home/CustomerReviews';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedDishes />
      <QuickInfo />
      <CustomerReviews />
      <CTASection />
    </main>
  );
}
