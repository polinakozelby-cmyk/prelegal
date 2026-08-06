export interface NdaFormData {
  party1Name: string;
  party1Company: string;
  party2Name: string;
  party2Company: string;
  effectiveDate: string;
  governingLaw: string;
  jurisdiction: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CoverPageData {
  purpose: string;
  effectiveDate: string;
  mndaTerm: string;
  confidentialityTerm: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: { name: string; company: string };
  party2: { name: string; company: string };
}
