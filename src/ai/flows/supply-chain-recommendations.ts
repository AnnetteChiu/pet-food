// This is an autogenerated file from Firebase Studio.

'use server';

/**
 * @fileOverview Supply chain AI recommendations.
 *
 * - supplyChainRecommendations - A function that provides supply chain improvement recommendations.
 * - SupplyChainRecommendationsInput - The input type for the supplyChainRecommendations function.
 * - SupplyChainRecommendationsOutput - The return type for the supplyChainRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupplyChainRecommendationsInputSchema = z.object({
  metrics: z.string().describe('Key supply chain metrics in JSON format, including supplier locations, transit times, and inventory levels.'),
  historicalData: z.string().describe('Historical supply chain data in JSON format, including past performance and disruptions.'),
});
export type SupplyChainRecommendationsInput = z.infer<
  typeof SupplyChainRecommendationsInputSchema
>;

const SupplyChainRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'AI-driven recommendations for supply chain improvement, including areas to investigate and potential solutions.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI reasoning behind the recommendations, explaining why certain areas are flagged for improvement.'
    ),
});
export type SupplyChainRecommendationsOutput = z.infer<
  typeof SupplyChainRecommendationsOutputSchema
>;

export async function supplyChainRecommendations(
  input: SupplyChainRecommendationsInput
): Promise<SupplyChainRecommendationsOutput> {
  return supplyChainRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supplyChainRecommendationsPrompt',
  input: {schema: SupplyChainRecommendationsInputSchema},
  output: {schema: SupplyChainRecommendationsOutputSchema},
  prompt: `You are an expert supply chain analyst providing recommendations for improvement.

  Based on the key supply chain metrics and historical data provided, identify potential issues and suggest areas for investigation.
  Explain your reasoning for each recommendation.

  Key Supply Chain Metrics: {{{metrics}}}
  Historical Data: {{{historicalData}}}

  Provide your recommendations and reasoning in a structured format.
`,
});

const supplyChainRecommendationsFlow = ai.defineFlow(
  {
    name: 'supplyChainRecommendationsFlow',
    inputSchema: SupplyChainRecommendationsInputSchema,
    outputSchema: SupplyChainRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
