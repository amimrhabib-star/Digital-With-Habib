import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, Grid as GridIcon, Upload, Plus, X, Check, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { ClientLogoItem } from '../types';
import { compressAndConvertToDataUrl } from '../utils/persistentStorage';

export const ClientLogosSection: React.FC = () => {
  const { clientLogos, updateClientLogoImage, addClientLogo, removeClientLogo } = useStudioContent();
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'motion' | 'grid'>('motion');
  
  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCategory, setNewClientCategory] = useState('');
  const [newClientRegion, setNewClientRegion] = useState<'bangladeshi' | 'international'>('bangladeshi');
  const [uploadedLogoPreview, setUploadedLogoPreview] = useState<string | null>(null);

  // Quick Replace specific card logo
  const [targetReplaceId, setTargetReplaceId] = useState<string | null>(null);
  const cardFileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const bangladeshiClients = clientLogos.filter(c => c.region === 'bangladeshi');
  const internationalClients = clientLogos.filter(c => c.region === 'international');

  const handleCardFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetReplaceId) return;

    try {
      const result = await compressAndConvertToDataUrl(file, 600, 300, 0.9);
      if (result) {
        updateClientLogoImage(targetReplaceId, result);
        setTargetReplaceId(null);
      }
    } catch (err) {
      console.error('Failed to compress client logo:', err);
    }
    e.target.value = '';
  };

  const handleModalFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await compressAndConvertToDataUrl(file, 600, 300, 0.9);
      if (result) {
        setUploadedLogoPreview(result);
      }
    } catch (err) {
      console.error('Failed to compress uploaded logo:', err);
    }
    e.target.value = '';
  };

  const handleSaveNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newLogoItem: ClientLogoItem = {
      id: `client_${Date.now()}`,
      name: newClientName.trim(),
      category: newClientCategory.trim().toUpperCase() || 'ENTERPRISE',
      region: newClientRegion,
      accentColor: '#146BFF',
      iconLetter: newClientName.trim().substring(0, 2).toUpperCase(),
      logoUrl: uploadedLogoPreview
    };

    addClientLogo(newLogoItem);
    setIsUploadModalOpen(false);
    setNewClientName('');
    setNewClientCategory('');
    setUploadedLogoPreview(null);
  };

  const triggerCardReplace = (clientId: string) => {
    setTargetReplaceId(clientId);
    cardFileInputRef.current?.click();
  };

  const renderClientCard = (client: ClientLogoItem) => (
    <div
      key={client.id}
      className="shrink-0 relative flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[#146BFF] hover:shadow-md transition-all group"
    >
      {/* Logo display: custom uploaded image OR clean monogram */}
      {client.logoUrl ? (
        <div className="h-8 max-w-[90px] flex items-center justify-center">
          <img
            src={client.logoUrl}
            alt={client.name}
            className="max-h-8 max-w-[90px] object-contain"
          />
        </div>
      ) : (
        <div 
          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs"
          style={{ backgroundColor: client.accentColor || '#146BFF' }}
        >
          {client.iconLetter}
        </div>
      )}

      <div>
        <div className="text-sm font-bold text-[#071A41] group-hover:text-[#146BFF] transition-colors whitespace-nowrap">
          {client.name}
        </div>
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          {client.category}
        </div>
      </div>

      {/* Quick hover button to upload / replace logo */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          triggerCardReplace(client.id);
        }}
        title="Upload or change logo image"
        className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-1.5 rounded-lg bg-blue-50 text-[#146BFF] hover:bg-[#146BFF] hover:text-white"
      >
        <Upload className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <section className="py-20 bg-white border-y border-blue-100/80 overflow-hidden relative">
      {/* Hidden file input for single card replacement */}
      <input
        type="file"
        ref={cardFileInputRef}
        onChange={handleCardFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header with Direct Logo Upload Option */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/70 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Proven Track Record</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl font-black text-[#071A41] tracking-tight"
            >
              Trusted by industry leaders, fast-growing tech giants & global brands.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed"
            >
              We build brands, websites, and video content for companies in Bangladesh and around the world.
            </motion.p>
          </div>

          {/* Action & View Controls with Blue/White Perfect Combination Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
            {/* Primary "Upload Logo" Button with Perfect Blue-White Combo */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-futuristic-perfect inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Client Logo</span>
            </button>

            {/* Toggle Controls: Pause/Play, Motion, Grid */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-blue-100 shadow-xs">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isPaused ? 'bg-blue-50 text-[#0052FF] font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                onClick={() => setViewMode('motion')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  viewMode === 'motion' ? 'btn-futuristic-perfect text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Motion</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  viewMode === 'grid' ? 'btn-futuristic-perfect text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <GridIcon className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RENDER IN MOTION MODE (Two Marquee Rows) */}
      {viewMode === 'motion' ? (
        <div className="space-y-6">
          
          {/* ROW 1: BANGLADESHI GIANTS (Moving Right to Left) */}
          <div className="space-y-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#146BFF]" />
                BANGLADESHI CLIENTS & UNICORNS ({bangladeshiClients.length})
              </span>
              <span className="text-[11px] text-slate-400">Hover card to replace logo</span>
            </div>

            <div className="relative overflow-hidden py-1">
              <motion.div
                className="flex gap-4 w-max"
                animate={isPaused ? {} : { x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 28,
                }}
              >
                {[...bangladeshiClients, ...bangladeshiClients].map((client, idx) => (
                  <div key={`${client.id}-${idx}`}>
                    {renderClientCard(client)}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ROW 2: INTERNATIONAL GIANTS (Moving Left to Right) */}
          <div className="space-y-2 pt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#146BFF]" />
                GLOBAL & INTERNATIONAL BRANDS ({internationalClients.length})
              </span>
              <span className="text-[11px] text-slate-400">Continuous showcase</span>
            </div>

            <div className="relative overflow-hidden py-1">
              <motion.div
                className="flex gap-4 w-max"
                animate={isPaused ? {} : { x: ['-50%', '0%'] }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 26,
                }}
              >
                {[...internationalClients, ...internationalClients].map((client, idx) => (
                  <div key={`${client.id}-${idx}`}>
                    {renderClientCard(client)}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      ) : (
        /* RENDER IN GRID MODE */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#146BFF]" />
              Bangladeshi Clients & Unicorns
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {bangladeshiClients.map((client) => renderClientCard(client))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#146BFF]" />
              Global & International Brands
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {internationalClients.map((client) => renderClientCard(client))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Simple Subtitle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-200/60 pt-4">
        <span>Design, websites, and video delivered directly with Habib Ahmed.</span>
        <span className="font-semibold text-[#146BFF]">100% Quality Guarantee</span>
      </div>

      {/* MODAL: UPLOAD NEW CLIENT LOGO */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071A41]/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#146BFF] flex items-center justify-center font-bold">
                    <Upload className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#071A41]">
                    Upload Client Logo
                  </h3>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNewClient} className="mt-4 space-y-4">
                {/* Logo Image File Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-2">
                    Client Logo Image (SVG, PNG, JPG)
                  </label>
                  <input
                    type="file"
                    ref={modalFileInputRef}
                    onChange={handleModalFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => modalFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-[#146BFF] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/40"
                  >
                    {uploadedLogoPreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={uploadedLogoPreview}
                          alt="Preview"
                          className="h-12 max-w-[160px] object-contain"
                        />
                        <span className="text-xs font-semibold text-[#146BFF]">
                          Click to choose different image
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-500">
                        <ImageIcon className="w-7 h-7 text-slate-400 mb-1" />
                        <span className="text-xs font-semibold text-[#071A41]">
                          Click to select logo file
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Supports transparent SVG, PNG, WebP or JPG
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client Name */}
                <div>
                  <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1">
                    Client or Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Apex Enterprises"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#146BFF] focus:ring-2 focus:ring-[#146BFF]/20 text-sm outline-none font-medium"
                  />
                </div>

                {/* Industry / Category */}
                <div>
                  <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1">
                    Industry or Category
                  </label>
                  <input
                    type="text"
                    value={newClientCategory}
                    onChange={(e) => setNewClientCategory(e.target.value)}
                    placeholder="e.g. Fintech, Ecommerce, SaaS"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#146BFF] focus:ring-2 focus:ring-[#146BFF]/20 text-sm outline-none font-medium"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1">
                    Category Region
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewClientRegion('bangladeshi')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        newClientRegion === 'bangladeshi'
                          ? 'bg-[#146BFF] text-white border-[#146BFF]'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Bangladeshi Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewClientRegion('international')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        newClientRegion === 'international'
                          ? 'bg-[#146BFF] text-white border-[#146BFF]'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      International Brand
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md shadow-[#146BFF]/30 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Add to Clients List</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
