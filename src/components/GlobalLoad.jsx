import React from 'react';
import { useSelector } from 'react-redux';
import LoadingOverlay from './LoadingOverlay';

export default function GlobalLoad() {
  const loading = useSelector((state) => state?.common?.loading);
  if (!loading) return null;
  return <LoadingOverlay />;
}
