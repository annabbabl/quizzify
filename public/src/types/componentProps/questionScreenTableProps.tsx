interface RowComponentProps {
    id?: string;
    category?: string;
    categories?: string[];
    question: string;
    rightAnswer: string;
    trueFalseQuestion: string;
    possibleAnswers: string[];
}

export type {RowComponentProps}