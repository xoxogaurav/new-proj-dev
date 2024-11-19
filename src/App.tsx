import React, { useState, useRef } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import GeneratorForm from './components/GeneratorForm';
import ImageDisplay from './components/ImageDisplay';
import ImageModal from './components/ImageModal';
import Footer from './components/Footer';
import SampleShowcase from './components/SampleShowcase';
import PremiumModal from './components/PremiumModal';
import PricingPlans from './components/PricingPlans';
import ExtendedGallery from './components/ExtendedGallery';
import EmailConnectButton from './components/EmailConnectButton';
import SaleBanner from './components/SaleBanner';
import { useUsageLimit } from './hooks/useUsageLimit';
import LegalPage from './components/LegalPage';
import {
  termsContent, privacyContent, cookieContent, acceptableUseContent,
  refundContent, copyrightContent, gdprContent, ccpaContent,
  disclaimerContent, contactContent, aboutContent, accessibilityContent
} from './content/legal';

interface ApiResponse {
  data?: any;
  error?: string;
  output?: string[];
}

function MainContent() {
  const workAreaRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const showPricing = searchParams.get('show_pricing') !== 'false';
  const showEmailConnect = searchParams.get('show_email_connect') !== 'false';
  const showSaleBanner = searchParams.get('show_sale_banner') !== 'false';
  const showGallery = searchParams.get('show_gallery') !== 'false';
  const showSamples = searchParams.get('show_samples') !== 'false';
  const showHeader = searchParams.get('show_header') !== 'false';
  const showFooter = searchParams.get('show_footer') !== 'false';
  
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const { canGenerate, showPremium, setShowPremium, incrementUsage, remainingGenerations } = useUsageLimit(email || undefined);

  const makeApiCall = async () => {
    if (!canGenerate || !incrementUsage()) {
      setShowPremium(true);
      return;
    }

    const combinedPrompt = style ? `${prompt}, in ${style.toLowerCase()} style` : prompt;

    setLoading(true);
    try {
      const res = await fetch('https://developersoft.in/api/v3-gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: combinedPrompt,
          aspect_ratio: aspectRatio,
          email,
          go_fast: true,
          megapixels: "1",
          num_outputs: 1,
          output_format: "png",
          output_quality: 80,
          num_inference_steps: 4
        }),
      });
      
      const data = await res.json();
      setResponse({ ...data });
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleSampleSelect = (samplePrompt: string, sampleStyle: string) => {
    setPrompt(samplePrompt);
    setStyle(sampleStyle);
    workAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {!email && showEmailConnect && (
        <div className="fixed top-14 sm:top-16 right-4 z-50">
          <EmailConnectButton />
        </div>
      )}
      
      {showHeader && (
        <div className="text-center mb-12 pt-20 sm:pt-25">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold">AI Image Creator</h1>
          </div>
          <p className="text-xl text-gray-300">Transform your ideas into stunning visuals with AI</p>
        </div>
      )}

      {showSamples && <SampleShowcase onSelectSample={handleSampleSelect} />}

      <div ref={workAreaRef} className={`grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto ${!showHeader && !showFooter ? 'my-6' : 'mb-12 md:mb-16'}`}>
        <GeneratorForm
          prompt={prompt}
          style={style}
          aspectRatio={aspectRatio}
          loading={loading}
          onPromptChange={setPrompt}
          onStyleChange={setStyle}
          onAspectRatioChange={setAspectRatio}
          onGenerate={makeApiCall}
          disabled={!canGenerate}
          email={email || undefined}
          remainingGenerations={remainingGenerations}
        />

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 border border-white/10">
          {response?.error ? (
            <div className="bg-red-900/50 border border-red-700 rounded-xl p-4">
              <h3 className="text-red-400 font-semibold mb-2">Error</h3>
              <p className="text-red-200">{response.error}</p>
            </div>
          ) : (
            <ImageDisplay
              imageUrl={response?.output?.[0]}
              loading={loading}
              email={email || undefined}
              onFullscreen={() => setShowImageModal(true)}
            />
          )}
        </div>
      </div>

      {showPricing && <PricingPlans />}
      {showGallery && <ExtendedGallery onSelectSample={handleSampleSelect} />}
      {showSaleBanner && <SaleBanner />}

      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
      {showImageModal && response?.output?.[0] && (
        <ImageModal
          imageUrl={response.output[0]}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </>
  );
}

function App() {
  const [searchParams] = useSearchParams();
  const showFooter = searchParams.get('show_footer') !== 'false';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/terms" element={<LegalPage title="Terms of Service" content={termsContent} />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" content={privacyContent} />} />
          <Route path="/cookie-policy" element={<LegalPage title="Cookie Policy" content={cookieContent} />} />
          <Route path="/acceptable-use" element={<LegalPage title="Acceptable Use Policy" content={acceptableUseContent} />} />
          <Route path="/refund-policy" element={<LegalPage title="Refund Policy" content={refundContent} />} />
          <Route path="/copyright" element={<LegalPage title="Copyright Notice" content={copyrightContent} />} />
          <Route path="/gdpr" element={<LegalPage title="GDPR Compliance" content={gdprContent} />} />
          <Route path="/ccpa" element={<LegalPage title="CCPA Notice" content={ccpaContent} />} />
          <Route path="/disclaimer" element={<LegalPage title="Legal Disclaimer" content={disclaimerContent} />} />
          <Route path="/contact" element={<LegalPage title="Contact Us" content={contactContent} />} />
          <Route path="/about" element={<LegalPage title="About Us" content={aboutContent} />} />
          <Route path="/accessibility" element={<LegalPage title="Accessibility Statement" content={accessibilityContent} />} />
        </Routes>
        
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default App;