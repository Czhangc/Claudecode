import { useEffect, useState } from 'react';
import { db } from '../db/schema';
import { MibaoHead } from './illustrations/Mibao';

export function useAvatarUrl(blobId?: string) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!blobId) {
      setUrl(undefined);
      return;
    }
    let objectUrl: string | undefined;
    let cancelled = false;
    db.blobs.get(blobId).then((row) => {
      if (cancelled || !row) return;
      objectUrl = URL.createObjectURL(row.blob);
      setUrl(objectUrl);
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [blobId]);
  return url;
}

export function CatAvatar({ blobId, className = 'size-14' }: { blobId?: string; className?: string }) {
  const url = useAvatarUrl(blobId);
  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-paper shadow-soft ${className}`}>
      {url ? <img src={url} alt="" className="size-full object-cover" /> : <MibaoHead className="size-full" />}
    </span>
  );
}
