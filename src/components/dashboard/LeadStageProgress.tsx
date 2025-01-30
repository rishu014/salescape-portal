import { Progress } from "@/components/ui/progress";
import { LeadStage, getStageColor } from "@/data/leads";
import { cn } from "@/lib/utils";

interface LeadStageProgressProps {
  stages: {
    stage: LeadStage;
    count: number;
  }[];
  total: number;
}

const LeadStageProgress = ({ stages, total }: LeadStageProgressProps) => {
  return (
    <div className="space-y-4">
      {stages.map(({ stage, count }) => {
        const percentage = Math.round((count / total) * 100);
        const color = getStageColor(stage);

        return (
          <div key={stage} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </span>
              <span className="text-gray-500">
                {count} ({percentage}%)
              </span>
            </div>
            <Progress 
              value={percentage} 
              className={cn(`h-2`, {
                'bg-primary/20': color === 'primary',
                'bg-warning/20': color === 'warning',
                'bg-secondary/20': color === 'secondary',
                'bg-success/20': color === 'success',
                'bg-danger/20': color === 'danger'
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LeadStageProgress;