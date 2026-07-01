import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PracticeBlock from './PracticeBlock';

interface Chunk {
  type: 'intro' | 'theory' | 'practice';
  title: string;
  content: string;
}

interface DayData {
  day: number;
  phase: number;
  title: string;
  chunks: Chunk[];
}

export default function CourseView() {
  const { dayId } = useParams();
  const [data, setData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse numeric day from string like "day-1"
  const dayNumber = dayId ? parseInt(dayId.replace('day-', ''), 10) : 1;

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/roadmap/day/${dayNumber}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load daily plan');
        return res.json();
      })
      .then(json => {
        setData(json);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dayNumber]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Oops!</h2>
        <p className="text-gray-500">{error || 'Could not find this day.'}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 pb-32">
      <div className="border-b border-border pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            {data.title}
          </h1>
          <p className="text-gray-500">Phase {data.phase}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-lg font-medium hover:bg-green-500/20 transition-colors">
          <CheckCircle size={20} />
          Mark Day Complete
        </button>
      </div>

      <div className="space-y-10">
        {data.chunks.map((chunk, index) => {
          if (chunk.type === 'practice') {
            return <PracticeBlock key={index} title={chunk.title} content={chunk.content} />;
          }

          return (
            <div key={index} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-primary border-b border-border pb-3">
                {chunk.title}
              </h3>
              <div className="prose prose-invert max-w-none text-foreground leading-relaxed">
                <ReactMarkdown>{chunk.content}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
