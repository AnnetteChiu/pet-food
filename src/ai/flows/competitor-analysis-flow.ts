'use server';

/**
 * @fileOverview Competitor analysis AI agent.
 *
 * - competitorAnalysis - A function that generates a competitive analysis for a given company.
 * - CompetitorAnalysisInput - The input type for the competitorAnalysis function.
 * - CompetitorAnalysisOutput - The return type for the competitorAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompetitorAnalysisInputSchema = z.object({
  competitorName: z.string().describe('The name of the competitor company to be analyzed.'),
});
export type CompetitorAnalysisInput = z.infer<typeof CompetitorAnalysisInputSchema>;

const CompetitorAnalysisOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the competitor.'),
  strengths: z.array(z.string()).describe('A list of the competitor\'s key strengths.'),
  weaknesses: z.array(z.string()).describe('A list of the competitor\'s key weaknesses.'),
  strategy: z.string().describe('An analysis of the competitor\'s likely strategy.'),
  marketPositioning: z.string().describe('An overview of the competitor\'s market positioning.'),
});
export type CompetitorAnalysisOutput = z.infer<typeof CompetitorAnalysisOutputSchema>;


export async function competitorAnalysis(
  input: CompetitorAnalysisInput
): Promise<CompetitorAnalysisOutput> {
  return competitorAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'competitorAnalysisPrompt',
  input: {schema: CompetitorAnalysisInputSchema},
  output: {schema: CompetitorAnalysisOutputSchema},
  prompt: `You are an expert competitive intelligence analyst working for Royal Canin.
  Your task is to provide a comprehensive analysis of the specified competitor.
  Focus on their strengths, weaknesses, likely business strategy, and overall market positioning, especially in relation to the pet food or consumer goods industry.

  Your output must be structured with a summary, lists for strengths and weaknesses, and paragraphs for strategy and market positioning.

  Competitor to analyze: {{{competitorName}}}
`,
});

const competitorAnalysisFlow = ai.defineFlow(
  {
    name: 'competitorAnalysisFlow',
    inputSchema: CompetitorAnalysisInputSchema,
    outputSchema: CompetitorAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
