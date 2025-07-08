'use server';

/**
 * @fileOverview Marketing cost analysis AI agent.
 *
 * - marketingCostAnalysis - A function that analyzes marketing campaign costs.
 * - MarketingCostAnalysisInput - The input type for the marketingCostAnalysis function.
 * - MarketingCostAnalysisOutput - The return type for the marketingCostAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketingCostAnalysisInputSchema = z.object({
  campaignName: z.string().describe('The name of the marketing campaign.'),
  costData: z.string().describe('The raw cost and performance data for the campaign in JSON format (e.g., budget, spend, clicks, conversions, revenue).'),
});
export type MarketingCostAnalysisInput = z.infer<typeof MarketingCostAnalysisInputSchema>;

const MarketingCostAnalysisOutputSchema = z.object({
  campaignSummary: z.string().describe('A brief summary of the campaign and its performance.'),
  keyMetrics: z.object({
    roi: z.string().describe('Return on Investment (ROI) calculated from the data.'),
    cpa: z.string().describe('Cost Per Acquisition/Conversion (CPA).'),
    spendVsBudget: z.string().describe('Analysis of the actual spend versus the allocated budget.'),
  }),
  recommendations: z.array(z.string()).describe('Actionable recommendations to improve campaign efficiency and ROI.'),
});
export type MarketingCostAnalysisOutput = z.infer<typeof MarketingCostAnalysisOutputSchema>;


export async function marketingCostAnalysis(
  input: MarketingCostAnalysisInput
): Promise<MarketingCostAnalysisOutput> {
  return marketingCostAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketingCostAnalysisPrompt',
  input: {schema: MarketingCostAnalysisInputSchema},
  output: {schema: MarketingCostAnalysisOutputSchema},
  prompt: `You are an expert marketing analyst for Royal Canin.
  Your task is to analyze the provided marketing campaign data and generate a report on its cost-effectiveness.

  Your analysis must include:
  1. A summary of the campaign.
  2. Calculation and interpretation of key metrics like Return on Investment (ROI) and Cost Per Acquisition (CPA).
  3. An analysis of the spend versus the budget.
  4. Actionable recommendations for optimizing the campaign.

  Campaign: {{{campaignName}}}
  Data (JSON): {{{costData}}}

  Provide a clear, structured report.
`,
});

const marketingCostAnalysisFlow = ai.defineFlow(
  {
    name: 'marketingCostAnalysisFlow',
    inputSchema: MarketingCostAnalysisInputSchema,
    outputSchema: MarketingCostAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
