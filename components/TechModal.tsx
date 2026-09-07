'use client';

import React from 'react';
import InterviewLauncherModal from './InterviewLauncherModal';

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (tech: string[], difficulty: string) => void;
}

export default function TechModal({ isOpen, onClose }: TechModalProps) {
  return (
    <InterviewLauncherModal
      isOpen={isOpen}
      onClose={onClose}
      initialType="technical"
    />
  );
}
