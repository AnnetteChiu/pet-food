'use client';
import { useState } from 'react';
import { petIndustryAnalysis, PetIndustryAnalysisOutput } from '@/ai/flows/pet-industry-analysis-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dog, Bot, Lightbulb, AlertTriangle, Loader, CheckCircle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function PetIndustryAnalysis() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<PetIndustryAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please enter a topic.",
        });
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await petIndustryAnalysis({ topic });
      setResult(output);
    } catch (e: any) {
      setError('Failed to get pet industry analysis. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating the analysis.",
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
          <Dog className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-xl">Pet Industry Analysis</CardTitle>
            <CardDescription>Get AI-powered insights into the pet industry.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGetAnalysis} className="flex flex-col items-start gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="topic">Analysis Topic</Label>
            <Input 
              id="topic" 
              type="text" 
              placeholder="e.g., 'premium dog food market'" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !topic}>
            {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Analyze Topic
                </>
              )}
          </Button>
        </form>

        {loading && (
             <div className="w-full space-y-4 pt-6">
                <Skeleton className="h-8 w-1/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
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
                Analysis for "{topic}"
              </h3>
              <p className="text-base prose prose-sm max-w-none">{result.analysis}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Key Opportunities
              </h3>
              <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                {result.opportunities.map((opportunity, index) => (
                  <li key={index}>{opportunity}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
