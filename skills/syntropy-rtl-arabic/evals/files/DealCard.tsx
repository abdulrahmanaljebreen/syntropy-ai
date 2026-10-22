// syntropy-lint-disable (check-rtl test fixture; violations are deliberate)
// Test fixture for check-rtl.mjs: a React + Tailwind card with deliberate RTL mistakes.
// Do not copy this code.
export function DealCard({ name, rate }: { name: string; rate: number }) {
  return (
    <div className="flex ml-4 pr-2 text-left rounded-l-lg border-l space-x-2">
      <span className="ms-2 pe-4 text-start">{name}</span>
      <span style={{ marginLeft: 8, textAlign: 'right', left: 0 }}>{rate.toFixed(1)}%</span>
      <span className="absolute right-0 md:-mr-2">الحد الأدنى ١٬٠٠٠ ر.س</span>
      <span className="gap-2 text-end">صافي العائد 18,333.00 ر.س</span>
    </div>
  );
}
