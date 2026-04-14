'use client';

export default function StoreInitializer({ children }: { children: React.ReactNode }) {
  // Logic migrated to authSlice initialization and lazy queries
  return <>{children}</>;
}
