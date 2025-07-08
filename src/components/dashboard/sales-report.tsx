'use client';
import { useState } from 'react';
import { salesReport, SalesReportOutput } from '@/ai/flows/sales-report-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Lightbulb, Loader, LineChart, Target, AlertTriangle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { supplyChainData } from '@/lib/data';

export function SalesReport() {
  const [loading, setLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState('Last Quarter');
  const [result, setResult] = useState<SalesReportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timePeriod) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please enter a time period.",
        });
        return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await salesReport({ timePeriod, salesData: supplyChainData.salesReportData });
      setResult(output);
    } catch (e: any) {
      setError('Failed to get sales report. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating the sales report.",
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
          <DollarSign className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-xl">AI-Powered Sales Report</CardTitle>
            <CardDescription>Generate an instant sales analysis for any time period.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGetReport} className="flex flex-col items-start gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="timePeriod">Time Period</Label>
            <Input 
              id="timePeriod" 
              type="text" 
              placeholder="e.g., 'Last Quarter'" 
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !timePeriod}>
            {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
          </Button>
        </form>

        {loading && (
             <div className="w-full space-y-4 pt-6">
                <Skeleton className="h-8 w-1/2" />
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
            <h3 className="text-2xl font-bold">{result.title}</h3>
            <div>
              <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <LineChart className="h-5 w-5" />
                Summary
              </h4>
              <p className="text-base prose prose-sm max-w-none">{result.summary}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Target className="h-5 w-5" />
                Key Insights
              </h4>
              <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                {result.keyInsights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5" />
                Recommendations
              </h4>
              <ul className="list-disc list-inside space-y-2 prose prose-sm max-w-none">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
