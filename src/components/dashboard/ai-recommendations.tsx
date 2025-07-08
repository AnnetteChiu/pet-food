'use client';
import { useState } from 'react';
import { supplyChainRecommendations, SupplyChainRecommendationsOutput } from '@/ai/flows/supply-chain-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Bot, Lightbulb, AlertTriangle, Loader } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface AiRecommendationsProps {
  metrics: string;
  historicalData: string;
}

export function AiRecommendations({ metrics, historicalData }: AiRecommendationsProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SupplyChainRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await supplyChainRecommendations({ metrics, historicalData });
      setResult(output);
    } catch (e: any) {
      setError('Failed to get recommendations. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating AI recommendations.",
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
          <Bot className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-xl">AI-Powered Recommendations</CardTitle>
            <CardDescription>Get insights to optimize your supply chain.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-4">
          <Button onClick={handleGetRecommendations} disabled={loading}>
            {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Get AI Recommendations
                </>
              )}
          </Button>

          {loading && (
             <div className="w-full space-y-4 pt-2">
                <Skeleton className="h-10 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                 <Skeleton className="h-10 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">Recommendations</AccordionTrigger>
                <AccordionContent className="text-base prose prose-sm max-w-none">
                  {result.recommendations}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">Reasoning</AccordionTrigger>
                <AccordionContent className="text-base prose prose-sm max-w-none">
                  {result.reasoning}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
