'use client';
import { useState } from 'react';
import { marketShareAnalysis, MarketShareAnalysisOutput } from '@/ai/flows/market-share-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Bot, Lightbulb, AlertTriangle, Loader, TrendingUp } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { MarketShareChart } from './market-share-chart';

export function MarketShareAnalysis() {
  const [loading, setLoading] = useState(false);
  const [market, setMarket] = useState('');
  const [result, setResult] = useState<MarketShareAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!market) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please enter a market or industry.",
        });
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await marketShareAnalysis({ market });
      setResult(output);
    } catch (e: any) {
      setError('Failed to get market share analysis. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating the market share analysis.",
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
          <PieChart className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-xl">Market Share Analysis</CardTitle>
            <CardDescription>Get AI-powered analysis of market share for an industry.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGetAnalysis} className="flex flex-col items-start gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="market">Market / Industry</Label>
            <Input 
              id="market" 
              type="text" 
              placeholder="e.g., 'US Pet Food'" 
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !market}>
            {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Analyze Market Share
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
                 <Skeleton className="h-64 w-full" />
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
                Market Summary for "{market}"
              </h3>
              <p className="text-base prose prose-sm max-w-none">{result.marketSummary}</p>
            </div>
            
            <div className="rounded-lg bg-card text-card-foreground p-0 md:p-2">
              <h3 className="text-lg font-semibold mb-4 px-4 md:px-2">Estimated Market Share</h3>
              <div className="h-[350px]">
                <MarketShareChart data={result.marketShare} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                Key Trends
              </h3>
              <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                {result.keyTrends.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
