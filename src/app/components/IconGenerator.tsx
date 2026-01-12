import React, { useState, useRef } from 'react';
import { Download, Upload, CheckCircle } from 'lucide-react';

interface IconSize {
  id: string;
  size: number;
  label: string;
  filename: string;
}

const ICON_SIZES: IconSize[] = [
  { id: 'icon-192', size: 192, label: 'Android Petite', filename: 'pwa-192x192.png' },
  { id: 'icon-512', size: 512, label: 'Android Grande', filename: 'pwa-512x512.png' },
  { id: 'icon-180', size: 180, label: 'Apple iOS', filename: 'apple-touch-icon.png' },
  { id: 'icon-32', size: 32, label: 'Favicon', filename: 'favicon.png' },
];

export function IconGenerator() {
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setSourceImage(img);
        generateAllIcons(img);
        setIsProcessing(false);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const generateAllIcons = (img: HTMLImageElement) => {
    ICON_SIZES.forEach(({ id, size }) => {
      const canvas = canvasRefs.current[id];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Enable high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw image scaled to canvas size
      ctx.drawImage(img, 0, 0, size, size);
    });
  };

  const downloadIcon = (iconSize: IconSize) => {
    const canvas = canvasRefs.current[iconSize.id];
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = iconSize.filename;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const downloadAllIcons = async () => {
    // Download all icons one by one with a small delay
    for (const iconSize of ICON_SIZES) {
      await new Promise(resolve => setTimeout(resolve, 200));
      downloadIcon(iconSize);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#53fab5] to-[#3dd9a0] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#53fab5] mb-2">
            🗑️ Générateur d'Icônes PWA
          </h1>
          <p className="text-gray-600">
            Trash Mapper - Créez vos icônes pour l'installation mobile
          </p>
        </div>

        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-3 border-dashed border-[#53fab5] rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all hover:bg-[#f0fdf9] hover:border-[#3dd9a0] hover:scale-[1.02] mb-8"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
          <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-[#53fab5]" />
          <p className="text-[#53fab5] font-semibold text-lg mb-2">
            {isProcessing ? 'Traitement en cours...' : 'Cliquez ou glissez votre logo TM'}
          </p>
          <p className="text-gray-500 text-sm">
            Formats acceptés : PNG, JPG (minimum 512×512 px recommandé)
          </p>
        </div>

        {/* Preview Section */}
        {sourceImage && (
          <div>
            {/* Icon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {ICON_SIZES.map((iconSize) => (
                <div key={iconSize.id} className="text-center">
                  <div className="mb-2">
                    <p className="font-semibold text-gray-700 text-sm">{iconSize.label}</p>
                    <p className="text-gray-500 text-xs">{iconSize.size}×{iconSize.size} px</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 mb-3 flex items-center justify-center min-h-[150px]">
                    <canvas
                      ref={(el) => (canvasRefs.current[iconSize.id] = el)}
                      width={iconSize.size}
                      height={iconSize.size}
                      className="max-w-full h-auto rounded-lg shadow-md"
                      style={{ 
                        imageRendering: iconSize.size < 100 ? 'pixelated' : 'auto',
                        maxHeight: '120px'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => downloadIcon(iconSize)}
                    className="w-full bg-[#53fab5] text-white py-2 px-4 rounded-lg font-semibold text-sm hover:bg-[#3dd9a0] transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                </div>
              ))}
            </div>

            {/* Download All Button */}
            <button
              onClick={downloadAllIcons}
              className="w-full bg-gray-800 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              Télécharger toutes les icônes
            </button>

            {/* Instructions */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-6 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
                📋 Prochaines étapes :
              </h3>
              <ol className="list-decimal ml-5 space-y-2 text-gray-700 text-sm">
                <li>Téléchargez toutes les icônes ci-dessus</li>
                <li>Placez-les dans le dossier <code className="bg-yellow-100 px-2 py-0.5 rounded">/public/</code> de votre projet</li>
                <li>Lancez <code className="bg-yellow-100 px-2 py-0.5 rounded">pnpm build</code> pour build la PWA</li>
                <li>Testez avec <code className="bg-yellow-100 px-2 py-0.5 rounded">pnpm preview</code></li>
                <li>Déployez sur un serveur HTTPS pour tester l'installation mobile</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
