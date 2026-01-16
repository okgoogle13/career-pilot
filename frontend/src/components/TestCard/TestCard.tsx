import React from "react";
import { cn } from "@/lib/utils";
import { M3Card } from "@/legacy/ui/M3Card";

export interface TestCardProps {
    title: string;
    description: string;
    className?: string;
}

/**
 * TestCard component generated for verification of the Component Builder workflow.
 * Uses M3 tokens and standard HTML primitives.
 */
export const TestCard: React.FC<TestCardProps> = ({ title, description, className }) => {
    return (
        <M3Card
            variant="filled"
            className={cn(
                "rounded-tl-[40px] rounded-tr-[8px] rounded-br-[40px] rounded-bl-[8px] bg-surface-container border-outline-variant overflow-hidden",
                className
            )}
        >
            <div className="p-6 pb-0">
                <h3 className="font-display font-bold text-primary text-xl tracking-tight mb-2">
                    {title}
                </h3>
                <p className="font-body text-on-surface-variant text-sm">
                    {description}
                </p>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-center h-32 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[4px] rounded-bl-[4px] bg-surface-container-high border border-dashed border-outline/30">
                    <span className="text-sm font-mono text-tertiary">Content Area</span>
                </div>
            </div>
        </M3Card>
    );
};
