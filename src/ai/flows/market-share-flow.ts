'use server';

/**
 * @fileOverview Market share analysis AI agent.
 *
 * - marketShareAnalysis - A function that generates a market share analysis for a given market.
 * - MarketShareAnalysisInput - The input type for the marketShareAnalysis function.
 * - MarketShareAnalysisOutput - The return type for the marketShareAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketShareAnalysisInputSchema = z.object({
  market: z.string().describe('The market or industry to analyze for market share.'),
});
export type MarketShareAnalysisInput = z.infer<typeof MarketShareAnalysisInputSchema>;

const MarketShareAnalysisOutputSchema = z.object({
  marketSummary: z.string().describe('A summary of the overall market.'),
  marketShare: z.array(z.object({
    company: z.string().describe('The name of the company.'),
    share: z.number().describe('The estimated market share percentage for the company.'),
  })).describe('A list of key companies and their estimated market share percentages.'),
  keyTrends: z.array(z.string()).describe('Key trends affecting market share in this sector.'),
});
export type MarketShareAnalysisOutput = z.infer<typeof MarketShareAnalysisOutputSchema>;


export async function marketShareAnalysis(
  input: MarketShareAnalysisInput
): Promise<MarketShareAnalysisOutput> {
  return marketShareAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketShareAnalysisPrompt',
  input: {schema: MarketShareAnalysisInputSchema},
  output: {schema: MarketShareAnalysisOutputSchema},
  prompt: `You are an expert market research analyst specializing in market share analysis for Royal Canin.
  Your task is to provide a detailed market share breakdown for the given market or industry.
  Focus on identifying the key players and estimating their market share percentages.
  Also, provide a brief summary of the market and identify key trends impacting the competitive landscape.

  Your output must be structured with a market summary, a list of companies with their shares, and a list of key trends.

  Market to analyze: {{{market}}}
`,
});

const marketShareAnalysisFlow = ai.defineFlow(
  {
    name: 'marketShareAnalysisFlow',
    inputSchema: MarketShareAnalysisInputSchema,
    outputSchema: MarketShareAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
