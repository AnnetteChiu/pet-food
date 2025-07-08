'use client';
import { useState } from 'react';
import { competitorAnalysis, CompetitorAnalysisOutput } from '@/ai/flows/competitor-analysis-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Swords, Bot, Lightbulb, AlertTriangle, Loader, Shield, ShieldOff, BrainCircuit, Target } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function CompetitorAnalysis() {
  const [loading, setLoading] = useState(false);
  const [competitorName, setCompetitorName] = useState('');
  const [result, setResult] = useState<CompetitorAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorName) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please enter a competitor name.",
        });
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await competitorAnalysis({ competitorName });
      setResult(output);
    } catch (e: any) {
      setError('Failed to get competitor analysis. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating the competitor analysis.",
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Swords className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-xl">Competitor Analysis</CardTitle>
            <CardDescription>Get AI-powered intelligence on your competitors.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGetAnalysis} className="flex flex-col items-start gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="competitorName">Competitor Name</Label>
            <Input 
              id="competitorName" 
              type="text" 
              placeholder="e.g., 'Hill's Pet Nutrition'" 
              value={competitorName}
              onChange={(e) => setCompetitorName(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !competitorName}>
            {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Analyze Competitor
                </>
              )}
          </Button>
        </form>

        {loading && (
             <div className="w-full space-y-4 pt-6">
                <Skeleton className="h-8 w-1/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                 <Skeleton className="h-8 w-1/4" />
                 <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        )}

        {error && (
            <div className="mt-4 flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
        )}
        
        {result && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Bot className="h-5 w-5" />
                Analysis for "{competitorName}"
              </h3>
              <p className="text-base prose prose-sm max-w-none">{result.summary}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Strengths
                    </h3>
                    <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                        {result.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        <ShieldOff className="h-5 w-5 text-red-600" />
                        Weaknesses
                    </h3>
                    <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                        {result.weaknesses.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <BrainCircuit className="h-5 w-5" />
                Strategy Analysis
              </h3>
              <p className="text-base prose prose-sm max-w-none">{result.strategy}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Target className="h-5 w-5" />
                Market Positioning
              </h3>
              <p className="text-base prose prose-sm max-w-none">{result.marketPositioning}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
