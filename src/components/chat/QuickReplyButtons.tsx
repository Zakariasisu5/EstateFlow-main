import { Button } from "@/components/ui/button";

interface QuickReplyButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
}

const QuickReplyButtons = ({ options, onSelect }: QuickReplyButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(option)}
          className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary transition-all"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default QuickReplyButtons;
