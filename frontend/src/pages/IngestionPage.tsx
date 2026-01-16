import React, { useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Stack,
    Alert,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { CloudUpload, CheckCircle, InsertDriveFile, Psychology } from '@mui/icons-material';
import { useCareerIngestion } from '@/hooks/useCareerIngestion';
import { ValidationDashboard } from '@/features/onboarding/components/ValidationDashboard';
import { CareerDatabase } from '@/types/api';
import { GardenLayout } from '@/components/layouts/GardenLayout';
import { SplitHeader } from '@/components/shared/SplitHeader';
import { GlassLeafCard } from '@/components/ui/GlassLeafCard';
import { NativeAnchor } from '@/components/ui/NativeAnchor';
import { motion } from 'framer-motion';

type UploadStage = 'idle' | 'uploading' | 'extracting' | 'processing' | 'embedding' | 'complete';

export const IngestionPage: React.FC = () => {
    const { submitDocuments, updateCareerDatabase, isLoading, error } = useCareerIngestion();
    const [careerData, setCareerData] = useState<CareerDatabase | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadStage, setUploadStage] = useState<UploadStage>('idle');
    const [progress, setProgress] = useState(0);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(Array.from(event.target.files));
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        try {
            // Simulate progress stages
            setUploadStage('uploading');
            setProgress(20);

            await new Promise((resolve) => setTimeout(resolve, 500));
            setUploadStage('extracting');
            setProgress(40);

            await new Promise((resolve) => setTimeout(resolve, 500));
            setUploadStage('processing');
            setProgress(60);

            const result = await submitDocuments(selectedFiles);

            setUploadStage('embedding');
            setProgress(90);

            await new Promise((resolve) => setTimeout(resolve, 500));
            setUploadStage('complete');
            setProgress(100);

            setCareerData(result);
        } catch (err) {
            console.error('Upload failed:', err);
            setUploadStage('idle');
            setProgress(0);
        }
    };

    const handleDataUpdate = async (updatedData: CareerDatabase) => {
        setCareerData(updatedData);
        try {
            await updateCareerDatabase(updatedData);
            console.log('Updated career data:', updatedData);
        } catch (err) {
            console.error('Failed to update career data:', err);
        }
    };

    // Show ValidationDashboard if data is loaded
    if (careerData) {
        return <ValidationDashboard data={careerData} onUpdate={handleDataUpdate} />;
    }

    const getStageMessage = (): string => {
        switch (uploadStage) {
            case 'uploading':
                return 'Uploading files...';
            case 'extracting':
                return 'Extracting text from documents...';
            case 'processing':
                return 'AI processing with Gemini 1.5 Pro...';
            case 'embedding':
                return 'Generating semantic embeddings...';
            case 'complete':
                return 'Complete!';
            default:
                return '';
        }
    };

    // Upload Interface
    return (
        <GardenLayout>
            {/* Plant Asset - Structural Integration */}
            <NativeAnchor variant="bottlebrush" anchor="floor-right" blurIntensity="low" className="z-0 opacity-50" />

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                }}
            >
                <GlassLeafCard className="max-w-[600px] w-full p-8">
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <SplitHeader
                            title="DROP YOUR"
                            highlight="Chaos"
                        />
                        <p className="text-on-surface-variant mt-2 text-sm">Upload your resume, cover letters, and KSC responses for AI analysis</p>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                bgcolor: 'var(--sys-color-error-container)',
                                color: 'var(--sys-color-on-error-container)',
                                '& .MuiAlert-icon': { color: 'var(--sys-color-on-error-container)' },
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* File Upload Area */}
                    <Box
                        sx={{
                            border: '2px dashed var(--sys-color-outline)',
                            borderRadius: 'var(--sys-shape-corner-large)',
                            p: 4,
                            textAlign: 'center',
                            mb: 3,
                            bgcolor: 'var(--sys-color-surface-container-low)',
                            transition: 'all 0.2s var(--sys-motion-easing-standard)',
                            '&:hover': {
                                borderColor: 'var(--sys-color-primary)',
                                bgcolor: 'var(--sys-color-surface-container)',
                            },
                        }}
                    >
                        <input
                            accept=".pdf,.docx,.txt"
                            style={{ display: 'none' }}
                            id="file-upload"
                            multiple
                            type="file"
                            onChange={handleFileSelect}
                            disabled={isLoading}
                        />
                        <label htmlFor="file-upload">
                            <Button
                                component="span"
                                variant="outlined"
                                startIcon={<CloudUpload />}
                                disabled={isLoading}
                                sx={{
                                    borderColor: 'var(--sys-color-primary)',
                                    color: 'var(--sys-color-primary)',
                                    fontWeight: 'var(--sys-type-weight-body)',
                                    py: 1.5,
                                    px: 3,
                                    borderRadius: 'var(--sys-shape-corner-full)',
                                    '&:hover': {
                                        bgcolor: 'var(--sys-color-primary-container)',
                                        borderColor: 'var(--sys-color-primary)',
                                    },
                                }}
                            >
                                Choose Files
                            </Button>
                        </label>

                        {selectedFiles.length > 0 && (
                            <List sx={{ mt: 2 }}>
                                {selectedFiles.map((file, idx) => (
                                    <ListItem key={idx}>
                                        <ListItemIcon>
                                            <InsertDriveFile sx={{ color: 'var(--sys-color-primary)' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={file.name}
                                            secondary={`${(file.size / 1024).toFixed(1)} KB`}
                                            primaryTypographyProps={{
                                                sx: { color: 'var(--sys-color-on-surface)', fontSize: '0.875rem' },
                                            }}
                                            secondaryTypographyProps={{
                                                sx: { color: 'var(--sys-color-on-surface-variant)', fontSize: '0.75rem' },
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>

                    {/* Upload Button - Pebble Shape */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 27 }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleUpload}
                            disabled={isLoading || selectedFiles.length === 0}
                            startIcon={isLoading ? <CircularProgress size={20} /> : <Psychology />}
                            sx={{
                                bgcolor: 'var(--sys-color-primary)',
                                color: 'var(--sys-color-on-primary)',
                                fontWeight: 'var(--sys-type-weight-caption)',
                                py: 1.5,
                                borderRadius: '20px 20px 32px 32px',
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    bgcolor: 'var(--sys-color-primary-container)',
                                    color: 'var(--sys-color-on-primary-container)',
                                },
                                '&:disabled': {
                                    bgcolor: 'var(--sys-color-surface-container-high)',
                                    color: 'var(--sys-color-on-surface-variant)',
                                },
                            }}
                        >
                            {isLoading ? getStageMessage() : 'Upload & Analyze'}
                        </Button>
                    </motion.div>

                    {/* Loading Progress */}
                    {isLoading && (
                        <Box sx={{ mt: 3 }}>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    borderRadius: 'var(--sys-shape-corner-full)',
                                    bgcolor: 'var(--sys-color-surface-container-high)',
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: 'var(--sys-color-primary)',
                                        borderRadius: 'var(--sys-shape-corner-full)',
                                    },
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--sys-color-on-surface-variant)',
                                    textAlign: 'center',
                                    display: 'block',
                                    mt: 1,
                                    fontWeight: 'var(--sys-type-weight-caption)',
                                    fontSize: '12px',
                                }}
                            >
                                {progress}% - {getStageMessage()}
                            </Typography>
                        </Box>
                    )}

                    {/* Info */}
                    <Alert
                        severity="info"
                        icon={<Psychology />}
                        sx={{
                            mt: 3,
                            bgcolor: 'var(--sys-color-primary-container)',
                            color: 'var(--sys-color-on-primary-container)',
                            '& .MuiAlert-icon': { color: 'var(--sys-color-on-primary-container)' },
                        }}
                    >
                        <Typography variant="caption">
                            <strong>Accepted formats:</strong> PDF, DOCX, TXT
                            <br />
                            <strong>Processing:</strong> Gemini 1.5 Pro with structured output validation
                            <br />
                            <strong>Keyboard shortcuts:</strong> Ctrl+Z (Undo), Ctrl+Shift+Z (Redo), Ctrl+S (Download)
                        </Typography>
                    </Alert>
                </GlassLeafCard>
            </Box>
        </GardenLayout>
    );
};
