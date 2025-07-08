'use server';

/**
 * @fileOverview Sales report generation AI agent.
 *
 * - salesReport - A function that generates a sales report for a given time period and category.
 * - SalesReportInput - The input type for the salesReport function.
 * - SalesReportOutput - The return type for the salesReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalesReportInputSchema = z.object({
  timePeriod: z.string().describe('The time period for the sales report (e.g., "Last Quarter", "Last Month").'),
  salesData: z.string().describe('The raw sales data in JSON format.'),
});
export type SalesReportInput = z.infer<typeof SalesReportInputSchema>;

const SalesReportOutputSchema = z.object({
  title: z.string().describe('A concise title for the sales report.'),
  summary: z
    .string()
    .describe('A high-level summary of sales performance for the period.'),
  keyInsights: z
    .array(z.string())
    .describe('A list of key insights discovered from the sales data.'),
  recommendations: z
    .array(z.string())
    .describe('Actionable recommendations based on the analysis.'),
});
export type SalesReportOutput = z.infer<typeof SalesReportOutputSchema>;


export async function salesReport(
  input: SalesReportInput
): Promise<SalesReportOutput> {
  return salesReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salesReportPrompt',
  input: {schema: SalesReportInputSchema},
  output: {schema: SalesReportOutputSchema},
  prompt: `You are an expert sales analyst for a large company.
  Your task is to analyze the provided sales data and generate a comprehensive report.
  The report should cover the specified time period.

  Your analysis should include a summary of performance, key insights (like top-performing products, regional trends, or customer behavior), and actionable recommendations for the sales team.

  Time Period: {{{timePeriod}}}
  Sales Data (JSON): {{{salesData}}}

  Provide a clear and structured report.
`,
});

const salesReportFlow = ai.defineFlow(
  {
    name: 'salesReportFlow',
    inputSchema: SalesReportInputSchema,
    outputSchema: SalesReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
