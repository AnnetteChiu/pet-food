'use server';

/**
 * @fileOverview Market analysis AI agent.
 *
 * - marketAnalysis - A function that generates market analysis for a given topic.
 * - MarketAnalysisInput - The input type for the marketAnalysis function.
 * - MarketAnalysisOutput - The return type for the marketAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketAnalysisInputSchema = z.object({
  topic: z.string().describe('The market topic to be analyzed.'),
});
export type MarketAnalysisInput = z.infer<typeof MarketAnalysisInputSchema>;

const MarketAnalysisOutputSchema = z.object({
  analysis: z
    .string()
    .describe('A detailed market analysis of the topic, including trends, opportunities, and challenges.'),
  keyTakeaways: z
    .array(z.string())
    .describe('A list of key takeaways from the analysis.'),
});
export type MarketAnalysisOutput = z.infer<typeof MarketAnalysisOutputSchema>;


export async function marketAnalysis(
  input: MarketAnalysisInput
): Promise<MarketAnalysisOutput> {
  return marketAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketAnalysisPrompt',
  input: {schema: MarketAnalysisInputSchema},
  output: {schema: MarketAnalysisOutputSchema},
  prompt: `You are an expert market analyst for a large company.
  Your task is to provide a concise but insightful market analysis for the given topic.
  Focus on current trends, potential opportunities for a large enterprise, and potential challenges or risks.
  
  Your output must be structured as a detailed analysis paragraph and a list of key takeaways.

  Topic to analyze: {{{topic}}}
`,
});

const marketAnalysisFlow = ai.defineFlow(
  {
    name: 'marketAnalysisFlow',
    inputSchema: MarketAnalysisInputSchema,
    outputSchema: MarketAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
