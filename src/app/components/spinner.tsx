export default function Spinner() {
  return (
    <div
      className='inline-block size-6 animate-spin rounded-full border-3 border-current border-t-transparent text-green-800'
      role='status'
      aria-label='loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
