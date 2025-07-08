'use client';
import { useState } from 'react';
import { marketingCostAnalysis, MarketingCostAnalysisOutput } from '@/ai/flows/marketing-cost-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Coins, Bot, Lightbulb, AlertTriangle, Loader, Target } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { supplyChainData } from '@/lib/data';

export function MarketingCostAnalysis() {
  const [loading, setLoading] = useState(false);
  const [campaignName, setCampaignName] = useState('Summer Pet Health');
  const [costData, setCostData] = useState(supplyChainData.marketingCostData);
  const [result, setResult] = useState<MarketingCostAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName || !costData) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please fill in all fields.",
        });
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await marketingCostAnalysis({ campaignName, costData });
      setResult(output);
    } catch (e: any) {
      setError('Failed to get marketing cost analysis. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating the marketing cost analysis.",
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
          <Coins className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-xl">Marketing Cost Analysis</CardTitle>
            <CardDescription>Get AI-powered analysis of your marketing campaign costs.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGetAnalysis} className="flex flex-col items-start gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="campaignName">Campaign Name</Label>
            <Input 
              id="campaignName" 
              type="text" 
              placeholder="e.g., 'Summer Sale 2024'" 
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="costData">Cost & Performance Data (JSON)</Label>
            <Textarea
              id="costData"
              placeholder="Paste your campaign data here..."
              value={costData}
              onChange={(e) => setCostData(e.target.value)}
              disabled={loading}
              className="min-h-[150px] font-mono text-xs"
            />
          </div>
          <Button type="submit" disabled={loading || !campaignName || !costData}>
            {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Analyze Costs
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
                Analysis for "{campaignName}"
              </h3>
              <p className="text-base prose prose-sm max-w-none">{result.campaignSummary}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Return on Investment (ROI)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{result.keyMetrics.roi}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Cost Per Acquisition (CPA)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{result.keyMetrics.cpa}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Spend vs Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base">{result.keyMetrics.spendVsBudget}</p>
                    </CardContent>
                </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Target className="h-5 w-5" />
                Recommendations
              </h3>
              <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                {result.recommendations.map((item, index) => (
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
