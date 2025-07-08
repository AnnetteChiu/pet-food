'use server';

/**
 * @fileOverview Pet industry analysis AI agent.
 *
 * - petIndustryAnalysis - A function that generates an analysis for a topic within the pet industry.
 * - PetIndustryAnalysisInput - The input type for the petIndustryAnalysis function.
 * - PetIndustryAnalysisOutput - The return type for the petIndustryAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PetIndustryAnalysisInputSchema = z.object({
  topic: z.string().describe('The pet industry topic to be analyzed.'),
});
export type PetIndustryAnalysisInput = z.infer<typeof PetIndustryAnalysisInputSchema>;

const PetIndustryAnalysisOutputSchema = z.object({
  analysis: z
    .string()
    .describe('A detailed analysis of the topic within the pet industry, including market size, trends, and consumer behavior.'),
  opportunities: z
    .array(z.string())
    .describe('A list of key business opportunities related to the topic.'),
});
export type PetIndustryAnalysisOutput = z.infer<typeof PetIndustryAnalysisOutputSchema>;


export async function petIndustryAnalysis(
  input: PetIndustryAnalysisInput
): Promise<PetIndustryAnalysisOutput> {
  return petIndustryAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'petIndustryAnalysisPrompt',
  input: {schema: PetIndustryAnalysisInputSchema},
  output: {schema: PetIndustryAnalysisOutputSchema},
  prompt: `You are an expert analyst specializing in the pet industry, with deep knowledge of Royal Canin's business.
  Your task is to provide a concise but insightful analysis for the given topic related to the pet industry.
  Focus on market size, current trends, consumer behavior, and potential business opportunities for a large enterprise like Royal Canin.
  
  Your output must be structured as a detailed analysis paragraph and a list of key opportunities.

  Topic to analyze: {{{topic}}}
`,
});

const petIndustryAnalysisFlow = ai.defineFlow(
  {
    name: 'petIndustryAnalysisFlow',
    inputSchema: PetIndustryAnalysisInputSchema,
    outputSchema: PetIndustryAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
