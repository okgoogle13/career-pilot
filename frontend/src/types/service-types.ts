/**
 * SERVICE-SPECIFIC TYPES
 * 
 * Type definitions to eliminate type-slop in API service layer.
 * These types replace generic `Record<string, any>` with specific interfaces.
 */

import type { CareerProfile, MasterSkill, CareerEntry, StructuredAchievement, KSCResponse } from './api';

/**
 * Analysis Results
 * Used by: analysisService.ts
 */
export interface AnalysisResults {
    atsScore?: number;
    keywords?: string[];
    suggestions?: string[];
    metrics?: Record<string, number>;
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
}

/**
 * Template Preview Data
 * Used by: templateService.ts
 */
export interface TemplatePreviewData {
    variables: Record<string, string>;
    sections: string[];
    formatting: {
        font?: string;
        fontSize?: number;
        margins?: number[];
        lineSpacing?: number;
    };
    metadata?: {
        author?: string;
        version?: string;
        lastModified?: string;
    };
}

/**
 * Application Metadata
 * Used by: applicationService.ts
 */
export interface ApplicationMetadata {
    source?: string;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
    customFields?: Record<string, string>;
    notes?: string;
    followUpDate?: string;
}

/**
 * Calendar Event Metadata
 * Used by: calendarService.ts
 */
export interface CalendarMetadata {
    location?: string;
    attendees?: string[];
    reminders?: number[]; // Minutes before event
    conferenceLink?: string;
    notes?: string;
    color?: string;
}

/**
 * Notification Data (Discriminated Union)
 * Used by: notificationService.ts
 */
export type NotificationData =
    | { type: 'application_update'; applicationId: string; status: string; company: string }
    | { type: 'interview_scheduled'; date: string; company: string; position: string }
    | { type: 'document_ready'; documentId: string; documentType: string; documentName: string }
    | { type: 'reminder'; title: string; message: string; dueDate: string }
    | { type: 'system'; message: string; severity: 'info' | 'warning' | 'error' };

/**
 * Smart Ingestion Extracted Data (Union Type)
 * Used by: smartIngestionService.ts
 */
export type ExtractedData =
    | { type: 'profile'; data: CareerProfile }
    | { type: 'skills'; data: MasterSkill[] }
    | { type: 'experience'; data: CareerEntry[] }
    | { type: 'achievements'; data: StructuredAchievement[] }
    | { type: 'ksc'; data: KSCResponse[] };
