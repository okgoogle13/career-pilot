import { AlertCircle, RefreshCw } from 'lucide-react';
import { NorthcoteButton } from '../ui/NorthcoteButton';
import lizardWarning from '../../assets/specimens/motif-gallery-frillneck-warning.png';

interface ErrorAlertProps {
    message: string;
    onRetry?: () => void;
    onDismiss?: () => void;
    retryLabel?: string;
    className?: string;
}

/**
 * M3ErrorAlert - Material 3 compliant error alert component
 * 
 * **Features:**
 * - M3 color tokens (error-container, on-error-container)
 * - Optional retry button for failed API calls
 * - Optional dismiss functionality
 * - Organic pebble shape (rounded-pebble)
 * - **Thematic Motif:** Integrated "The Warning" (Frill-Necked Lizard)
 * 
 * @example
 * ```tsx
 * <M3ErrorAlert 
 *   message="Failed to load data" 
 *   onRetry={() => fetchData()}
 *   retryLabel="Try Again"
 * />
 * ```
 */
export function M3ErrorAlert({
    message,
    onRetry,
    onDismiss,
    retryLabel = 'Retry',
    className = '',
}: ErrorAlertProps) {
    return (
        <div
            className={`
        relative overflow-hidden
        mb-6 p-4 rounded-pebble 
        bg-error-container text-on-error-container 
        border border-error
        flex items-start gap-3
        ${className}
      `}
            role="alert"
        >
            {/* The Warning - Frill-Necked Lizard Motif */}
            <img
                src={lizardWarning}
                alt=""
                className="absolute -right-4 -bottom-4 w-32 h-auto opacity-10 pointer-events-none mix-blend-multiply"
            />

            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 relative z-10" />

            <div className="flex-1">
                <p className="font-medium">{message}</p>
            </div>

            {(onRetry || onDismiss) && (
                <div className="flex gap-2 flex-shrink-0">
                    {onRetry && (
                        <NorthcoteButton
                            variant="secondary"
                            size="sm"
                            startIcon={<RefreshCw className="w-4 h-4" />}
                            onClick={onRetry}
                            className="border-error text-on-error-container hover:bg-error/10"
                        >
                            {retryLabel}
                        </NorthcoteButton>
                    )}

                    {onDismiss && (
                        <NorthcoteButton
                            variant="tertiary"
                            size="sm"
                            onClick={onDismiss}
                            className="text-on-error-container hover:bg-error/10"
                        >
                            Dismiss
                        </NorthcoteButton>
                    )}
                </div>
            )}
        </div>
    );
}
