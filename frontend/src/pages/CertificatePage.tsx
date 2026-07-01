import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../store/useProgress';
import { Award, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CertificatePage() {
  const { user } = useAuth();
  const { level } = useProgress();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // We can lock the certificate if the user hasn't reached a high enough level, 
  // but for the sake of demo, we'll let them see it if they are level 1+
  const isUnlocked = level >= 1 || user?.role === 'SUPER_ADMIN'; 

  const generatePDF = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    
    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      // A4 landscape
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Java-Dev-Academy-Certificate-${user?.name || 'Student'}.pdf`);
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate certificate.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
        <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-lg border border-border">
          <Award size={48} className="text-gray-500 opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Certificate Locked</h2>
        <p className="text-gray-400 max-w-md">
          You need to complete the 90-Day Bootcamp to unlock your certificate of completion. Keep coding!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 h-full overflow-y-auto">
      <div className="flex items-center justify-between w-full max-w-5xl mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Certificate</h1>
          <p className="text-gray-400 mt-1">Download and share your achievement.</p>
        </div>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
          Download PDF
        </button>
      </div>

      {/* The Certificate UI (A4 aspect ratio representation) */}
      <div className="bg-card p-4 rounded-xl shadow-2xl border border-border overflow-x-auto w-full max-w-5xl flex justify-center">
        <div 
          ref={certificateRef}
          className="relative bg-white flex flex-col items-center justify-center text-gray-900 border-[16px] border-[#0f172a] shadow-inner"
          style={{ width: '1122.5px', height: '793.7px', minWidth: '1122.5px' }} // A4 dimensions in px approx at 96DPI
        >
          {/* Decorative Corner Patterns */}
          <div className="absolute top-0 left-0 w-32 h-32 border-r-8 border-b-8 border-yellow-500 rounded-br-3xl m-8"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-l-8 border-b-8 border-yellow-500 rounded-bl-3xl m-8"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-r-8 border-t-8 border-yellow-500 rounded-tr-3xl m-8"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-l-8 border-t-8 border-yellow-500 rounded-tl-3xl m-8"></div>

          <div className="absolute top-12 flex items-center justify-center gap-4">
            <Award size={48} className="text-yellow-500" />
            <h2 className="text-3xl font-black text-gray-800 tracking-widest uppercase">Java-Dev Academy</h2>
            <Award size={48} className="text-yellow-500" />
          </div>

          <h1 className="text-6xl font-black mt-16 mb-4 text-[#0f172a] tracking-wider uppercase font-serif">Certificate of Completion</h1>
          
          <p className="text-xl font-medium text-gray-500 mt-6 mb-8 uppercase tracking-widest">This is to proudly certify that</p>
          
          <h2 className="text-7xl font-bold text-yellow-600 mb-8 border-b-2 border-gray-300 pb-4 px-16 italic font-serif">
            {user?.name || 'Java Developer'}
          </h2>
          
          <p className="text-2xl font-medium text-gray-700 max-w-3xl text-center leading-relaxed">
            Has successfully completed the intensive <strong className="text-gray-900 font-bold">90-Day Java & DSA Bootcamp</strong>, 
            demonstrating outstanding dedication, problem-solving skills, and mastery of core software engineering principles.
          </p>

          <div className="absolute bottom-24 flex justify-between w-full px-48">
            <div className="text-center">
              <div className="border-b-2 border-gray-400 w-48 mb-2"></div>
              <p className="font-bold text-lg text-gray-800">Chandu Injumalla</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Lead Instructor</p>
            </div>
            
            <div className="w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center">
               <div className="w-28 h-28 rounded-full border border-yellow-400 flex flex-col items-center justify-center bg-yellow-50/50">
                  <span className="font-bold text-yellow-700 text-lg">TOP 1%</span>
                  <span className="text-xs text-yellow-600 font-medium">ACHIEVER</span>
               </div>
            </div>

            <div className="text-center">
              <div className="border-b-2 border-gray-400 w-48 mb-2"></div>
              <p className="font-bold text-lg text-gray-800">{new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Date of Issue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
