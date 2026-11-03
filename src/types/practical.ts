export interface CodeBlock {
  id?: string;
  title?: string;
  description?: string;
  language?: string;
  code: string;
  output?: string;
}

export interface Practical {
  id: string; // Used in route /practical/:id, e.g. "1", "2"
  number: number; // Numeric practical number, e.g. 1
  topic?: string; // Short topic identifier (e.g., "Feature Engineering")
  title: string; // Full objective / title from syllabus
  description?: string;
  dataset?: string;
  algorithm?: string[];
  category?: string;
  codeBlocks: CodeBlock[];
}
