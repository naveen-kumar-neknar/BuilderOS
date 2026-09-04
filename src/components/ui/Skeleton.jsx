import React from 'react';

export function Skeleton({ className = '', style = {} }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

export function CardSkeleton() {
  return (
    <div className="tech-card" style={{ height: 260 }}>
      <div className="tech-card-header">
        <Skeleton style={{ width: 44, height: 44, borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
          <Skeleton style={{ width: '60%', height: 18, marginBottom: 8 }} />
          <Skeleton style={{ width: '40%', height: 14 }} />
        </div>
      </div>
      <Skeleton style={{ width: '90%', height: 14, marginBottom: 6 }} />
      <Skeleton style={{ width: '75%', height: 14, marginBottom: 20 }} />
      <div className="tech-card-footer">
        <Skeleton style={{ width: 80, height: 24, borderRadius: 9999 }} />
        <Skeleton style={{ width: 100, height: 32, borderRadius: 6 }} />
      </div>
    </div>
  );
}

export default Skeleton;
