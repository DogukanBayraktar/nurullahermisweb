import Link from 'next/link';

export default function AdminNotice({
  title,
  message,
  actionHref,
  actionLabel,
}: {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm text-amber-900">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 leading-6 text-amber-800">{message}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
